# Sample plugins

Copy any folder from here into `appLocalDataDir/plugins` to enable the plugin.

- Each plugin lives in its own folder named after the extension it handles. For example, copy `hello` to `appLocalDataDir/plugins/hello` to handle `.hello` files.
- Every plugin must include a `plugin.json` manifest and an `index.html` entry file.
- Templates for the **New file** menu live inside each plugin under `<extension>/file-templates` and can include JSON or binary files.
- The iframe receives `capydocs-ext:*` messages for init, file changes, and removal, and can request reads/writes/close using `capydocs-ext:request`.
- Optional `thumbnail.js` modules can export a `thumbnail(Uint8Array)` function (it can be async and return a Promise) that returns an SVG string or encoded image bytes so capydocs can display custom previews per extension. For example:

```js
// Likely executing in a web worker or a html page
export async function thumbnail(content /* Uint8Array */) {
  const text = new TextDecoder().decode(content);

  // Properly escape HTML characters to prevent XSS
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  // returning string, or Uint8Array
  return `<svg xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="30">${escapedText}</text>
</svg>`;
}
```

These samples are minimal and run entirely offline so they are safe to tweak and extend.
