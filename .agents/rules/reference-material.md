# Local Reference Material

`read_ui/` contains read-only reference checkouts used to compare component behavior,
markup, motion, and styling while developing sarahUI. It is local tooling, not part of
the published library.

## Pinned sources

| Directory | Repository | Commit |
| --- | --- | --- |
| `read_ui/cojeev-ui` | `luv-jeri/cojeev-ui` | `374dc1c63157749052483b166d6fb0178bbd4249` |
| `read_ui/magicui` | `magicuidesign/magicui` | `52bc69354621e5cd7c9bc84a0e42b42f2d0c07b1` |
| `read_ui/ui` | `shadcn-ui/ui` | `a87a63b2ca25143d26c8bd0903e4e9bc77b3f824` |

## Rules

1. `read_ui/` is git-ignored. Never commit it, package it, or import from it at runtime.
2. Never reintroduce `read_ui/*` as a gitlink or submodule.
3. Treat reference code as licensed third-party material. Copy behavior, not source.
4. Keep `packages/ui` framework-neutral. Reference React/Next.js code is guidance only.
5. When a sarahUI component differs from its reference, fix the component template,
   styles, and tests in `packages/ui`; do not edit `read_ui/`.
6. Re-pin the table above when a reference checkout is refreshed.
