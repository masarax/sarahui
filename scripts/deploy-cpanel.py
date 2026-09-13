"""Upload the built documentation through explicit FTPS (or configured FTP).

Only local build files are uploaded. Existing remote files are never swept or
deleted. Each file is uploaded under a temporary name before replacement.
"""
from __future__ import annotations
import argparse
from dataclasses import dataclass
import ftplib
import os
from pathlib import Path, PurePosixPath
import re
import ssl
import sys
import uuid

@dataclass(frozen=True)
class Config:
    host: str
    username: str
    password: str
    directory: str
    protocol: str = "ftps"
    port: int = 21

    @classmethod
    def from_env(cls, env):
        names = ["CPANEL_FTP_HOST", "CPANEL_FTP_USERNAME", "CPANEL_FTP_PASSWORD", "CPANEL_FTP_PATH"]
        missing = [name for name in names if not env.get(name)]
        if missing:
            raise ValueError("Missing configuration: " + ", ".join(missing))
        host = env[names[0]].strip()
        if "://" in host or "/" in host or any(c.isspace() for c in host):
            raise ValueError("CPANEL_FTP_HOST must be a hostname, without a URL scheme or path.")
        directory = env[names[3]]
        validate_directory(directory)
        protocol = env.get("CPANEL_FTP_PROTOCOL", "ftps").lower()
        if protocol not in ("ftp", "ftps"):
            raise ValueError("CPANEL_FTP_PROTOCOL must be ftp or ftps.")
        port = int(env.get("CPANEL_FTP_PORT", "21"))
        if not 1 <= port <= 65535:
            raise ValueError("Invalid FTP port.")
        return cls(host, env[names[1]], env[names[2]], directory, protocol, port)

def validate_directory(directory):
    if not directory or "\\" in directory or any(ord(c) < 32 or ord(c) == 127 for c in directory):
        raise ValueError("Provide a valid FTP directory.")
    if ".." in directory.split("/"):
        raise ValueError("Parent traversal is not allowed in the FTP directory.")

def build_files(root):
    root = Path(root).resolve()
    if not (root / "index.html").is_file():
        raise ValueError("Build the documentation first: npm run build")
    files = []
    for file in root.rglob("*"):
        if file.is_symlink():
            raise ValueError("Symbolic links cannot be deployed.")
        if not file.is_file():
            continue
        relative = file.relative_to(root).as_posix()
        if not re.fullmatch(r"[A-Za-z0-9_./-]+", relative):
            raise ValueError("Unsupported deployment filename.")
        if any(part.startswith(".") for part in file.relative_to(root).parts) and relative != ".htaccess":
            raise ValueError("Unexpected hidden file in the build.")
        files.append((relative, file))
    # References and assets arrive before the new document becomes available.
    return sorted(files, key=lambda item: (item[0] == "index.html", item[0]))

def enter_directory(ftp, directory):
    validate_directory(directory)
    if directory.startswith("/"):
        ftp.cwd("/")
    for part in PurePosixPath(directory).parts:
        if part in ("/", "."):
            continue
        try:
            ftp.cwd(part)
        except ftplib.error_perm as error:
            if not str(error).startswith("550"):
                raise
            ftp.mkd(part)
            ftp.cwd(part)

def upload_file(ftp, source, name):
    temporary = ".sarahui-upload-" + uuid.uuid4().hex
    try:
        with source.open("rb") as stream:
            ftp.storbinary("STOR " + temporary, stream, blocksize=65536)
        ftp.rename(temporary, name)
    except Exception:
        # Remove only this upload's temporary file, never a site's existing file.
        try:
            ftp.delete(temporary)
        except ftplib.all_errors:
            pass
        raise

def deploy(config, files):
    ftp = ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=60) if config.protocol == "ftps" else ftplib.FTP(timeout=60)
    try:
        ftp.connect(config.host, config.port)
        ftp.login(config.username, config.password)
        if config.protocol == "ftps":
            ftp.prot_p()
        ftp.set_pasv(True)
        enter_directory(ftp, config.directory)
        destination = ftp.pwd()
        for relative, source in files:
            ftp.cwd(destination)
            parent = PurePosixPath(relative).parent.as_posix()
            if parent != ".":
                enter_directory(ftp, parent)
            upload_file(ftp, source, PurePosixPath(relative).name)
            print("Uploaded " + relative)
    finally:
        try:
            ftp.quit()
        except ftplib.all_errors:
            ftp.close()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default="dist")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    files = build_files(args.source)
    if args.dry_run:
        print("Build contains " + str(len(files)) + " deployable files; index.html uploads last.")
        return
    deploy(Config.from_env(os.environ), files)
    print("cPanel deployment complete: " + str(len(files)) + " files.")
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
            summary.write("## cPanel deployment complete\n\nUploaded " + str(len(files)) + " static files. The document was uploaded last. No remote cleanup was performed.\n")

if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        print("Deployment failed (" + type(error).__name__ + "). Check FTP access, the target path, network and the server TLS certificate.", file=sys.stderr)
        sys.exit(1)
