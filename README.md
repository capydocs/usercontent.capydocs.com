# Capydocs User Content

Static repository that exposes Capydocs public themes and plugins.  
The site is generated with [Eleventy](https://www.11ty.dev/) and ready to deploy on Cloudflare Pages.

## What's included?

- `index.html`: visual gallery of every theme stored under `themes/`.
- `themes.json`: machine-friendly endpoint exposing each folder's `theme.json` metadata.
- Direct passthrough of the `themes/` directory so consumers can fetch the assets untouched.

## Local development

```bash
npm install
npm run dev # starts a dev server with live reload
```

The data is sourced from the `themes/` folder. Each subdirectory must include a valid `theme.json` following the format described in `themes/README.md`.

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
