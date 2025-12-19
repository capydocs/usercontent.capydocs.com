# Sample themes

Copy any folder from here into `appLocalDataDir/themes/<theme-id>` (create the folder if it does not exist) and restart the theme picker so Capydocs can load it as a custom option.

## Anatomy of a theme

- Each theme lives in its own folder named after the `theme.json` `id`. When copied, match the folder name with the ID so reloads stay predictable.
- `theme.json` is a small manifest with `id`, `name`, `version`, `css` (relative path to the stylesheet) and optional `description` plus `base` (`"light"` or `"dark"`). The Settings ▸ Appearance menu uses that metadata for labels and for deciding whether light or dark tokens should be the fallback.
- `theme.css` runs as-is inside the desktop/web app, so regular selectors and CSS variables work without `:global(...)` prefixes. Use CSS variables defined in `src/app.scss` (`--bg`, `--fg`, `--card`, etc.) to keep consistency with built-in themes.
- Changes are hot-reloaded: save the file and switch away/back to the theme in Settings to re-inject the CSS.

## Included samples

- `dark-red`: a crimson-tinted dark theme showing how to recolor the global palette plus a few widgets (cards, nav bar, Kanban columns) using CSS variables only.

Feel free to duplicate these folders and iterate on them. Keep the folder names alphanumeric/dash and avoid dots or spaces so the watcher can detect them properly.
