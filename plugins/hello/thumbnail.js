// Keywords: sample plugin thumbnail, excalidraw preview label
const decoder = new TextDecoder();

export function thumbnail(content) {
  let label = 'Hello';
  try {
    const raw = decoder.decode(content);
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.elements) && parsed.elements.length > 0) {
      label = `${parsed.elements.length} elements`;
    } else if (parsed?.appState?.name) {
      label = parsed.appState.name;
    }
  } catch {
    label = `${content?.length ?? 0} bytes`;
  }

  return /* html */ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect x="2" y="2" width="116" height="116" rx="12" fill="#18181b" stroke="#6366f1" stroke-width="3" />
      <text x="10" y="35" font-family="monospace" font-size="14" fill="#a5b4fc">.hello</text>
      <text x="10" y="70" font-family="monospace" font-size="12" fill="#e0e7ff">${label}</text>
    </svg>
  `;
}
