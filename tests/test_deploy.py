import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import Mock

spec = importlib.util.spec_from_file_location("cpanel", Path(__file__).parents[1] / "scripts/deploy-cpanel.py")
cpanel = importlib.util.module_from_spec(spec)
sys.modules["cpanel"] = cpanel
spec.loader.exec_module(cpanel)

class DeploymentTests(unittest.TestCase):
    def test_directory_rejects_traversal_and_protocol_injection(self):
        for path in ("../public_html", "/site/../other", "site\nDELE index.html", "site\\other", ""):
            with self.assertRaises(ValueError):
                cpanel.validate_directory(path)
        for path in ("/", "./", "/public_html/sarahui/", "public_html/ui"):
            cpanel.validate_directory(path)

    def test_ftps_is_default_and_secrets_are_required(self):
        with self.assertRaisesRegex(ValueError, "CPANEL_FTP_HOST"):
            cpanel.Config.from_env({})
        env = dict(CPANEL_FTP_HOST="ftp.example.com", CPANEL_FTP_USERNAME="ui@example.com", CPANEL_FTP_PASSWORD="example", CPANEL_FTP_PATH="/public_html/ui/")
        self.assertEqual(cpanel.Config.from_env(env).protocol, "ftps")
        with self.assertRaises(ValueError):
            cpanel.Config.from_env({**env, "CPANEL_FTP_PROTOCOL": "sftp"})

    def test_index_uploads_after_assets_and_htaccess_is_included(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ("index.html", "app.js", ".htaccess"):
                (root / name).write_text("example")
            files = cpanel.build_files(root)
            self.assertEqual(files[-1][0], "index.html")
            self.assertIn(".htaccess", [name for name, _ in files])

    def test_hidden_files_and_symlinks_cannot_leak(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "index.html").write_text("example")
            (root / ".env").write_text("test")
            with self.assertRaises(ValueError):
                cpanel.build_files(root)
            (root / ".env").unlink()
            (root / "link.js").symlink_to(root / "index.html")
            with self.assertRaises(ValueError):
                cpanel.build_files(root)

    def test_interrupted_upload_preserves_existing_remote_file(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / "index.html"
            source.write_text("new document")
            ftp = Mock()
            ftp.storbinary.side_effect = OSError("connection interrupted")
            with self.assertRaises(OSError):
                cpanel.upload_file(ftp, source, "index.html")
            ftp.rename.assert_not_called()
            temporary = ftp.delete.call_args.args[0]
            self.assertTrue(temporary.startswith(".sarahui-upload-"))
            self.assertNotEqual(temporary, "index.html")
