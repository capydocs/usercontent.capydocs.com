const fs = require("node:fs");
const path = require("node:path");

function loadPlugins() {
  const pluginsDir = path.resolve(__dirname, "../../plugins");
  if (!fs.existsSync(pluginsDir)) {
    return [];
  }

  return fs
    .readdirSync(pluginsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const manifestPath = path.join(pluginsDir, entry.name, "plugin.json");
      if (!fs.existsSync(manifestPath)) {
        return null;
      }

      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
        const entryFile = manifest.entry || "index.html";
        const publicDir = path.posix.join("plugins", entry.name);

        return {
          id: manifest.id || entry.name,
          name: manifest.name || entry.name,
          description: manifest.description || "",
          entry: entryFile,
          entryUrl: `/${path.posix.join(publicDir, entryFile)}`,
          assetsUrl: `/${publicDir}`,
          manifestUrl: `/${path.posix.join(publicDir, "plugin.json")}`,
          zipUrl: `/${path.posix.join("plugins", `${entry.name}.zip`)}`,
        };
      } catch (error) {
        console.warn(`Could not parse ${manifestPath}: ${error.message}`);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = () => loadPlugins();
