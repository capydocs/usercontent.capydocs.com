const fs = require("node:fs");
const path = require("node:path");

function loadThemes() {
  const themesDir = path.resolve(__dirname, "../../themes");
  if (!fs.existsSync(themesDir)) {
    return [];
  }

  return fs
    .readdirSync(themesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const manifestPath = path.join(themesDir, entry.name, "theme.json");
      if (!fs.existsSync(manifestPath)) {
        return null;
      }

      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
        const cssFile = manifest.css || "theme.css";
        const publicDir = path.posix.join("themes", entry.name);

        return {
          id: manifest.id || entry.name,
          name: manifest.name || entry.name,
          description: manifest.description || "",
          base: manifest.base || "light",
          css: cssFile,
          cssUrl: `/${path.posix.join(publicDir, cssFile)}`,
          assetsUrl: `/${publicDir}`,
        };
      } catch (error) {
        console.warn(`Could not parse ${manifestPath}: ${error.message}`);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = () => loadThemes();

