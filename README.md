# Capydocs User Content

Static repository that exposes Capydocs public themes and plugins.  
The site is generated with [Eleventy](https://www.11ty.dev/) and ready to deploy on Cloudflare Pages.

## What's included?

- `index.html`: visual gallery for every plugin stored under `plugins/` and every theme stored under `themes/`.
- `plugins.json`: machine-friendly endpoint exposing each plugin's `plugin.json` metadata.
- `themes.json`: machine-friendly endpoint exposing each folder's `theme.json` metadata.
- Direct passthrough of the `plugins/` and `themes/` directories so consumers can fetch the assets untouched.
- Post-build ZIP archives for every plugin and theme under `/plugins/<name>.zip` and `/themes/<name>.zip`.

## Local development

```bash
npm install
npm run dev # starts a dev server with live reload
```

The data is sourced from the `plugins/` and `themes/` folders. Each plugin subdirectory must include a valid `plugin.json`
following the format described in `plugins/README.md`. Each theme subdirectory must include a valid `theme.json` following
the format described in `themes/README.md`.

## Production build

```bash
npm run build
```

Artifacts are emitted to `_site/`.

## Cloudflare Pages

1. Create a new project that points to this repository.
2. Configure:
   - **Framework preset:** `None`.
   - **Build command:** `npm run build`.
   - **Build output directory:** `_site`.
3. Optional: set the `NODE_VERSION` environment variable (for example `20`).

Cloudflare detects `CNAME` and the `themes/` folder via Eleventy passthrough, so every push to `main` will ship a ready-to-use site.
