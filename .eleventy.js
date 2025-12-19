const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const archiver = require("archiver");

async function createThemeZips() {
  const themesDir = path.join(__dirname, "themes");
  const siteThemesDir = path.join(__dirname, "_site", "themes");
  const entries = await fsPromises.readdir(themesDir, { withFileTypes: true });
  const themeDirectories = entries.filter((entry) => entry.isDirectory());

  if (themeDirectories.length === 0) {
    return;
  }

  await fsPromises.mkdir(siteThemesDir, { recursive: true });

  for (const dir of themeDirectories) {
    const sourceDir = path.join(themesDir, dir.name);
    const zipPath = path.join(siteThemesDir, `${dir.name}.zip`);
    await zipTheme(sourceDir, zipPath, dir.name);
  }
}

function zipTheme(sourceDir, destinationPath, rootFolderName) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destinationPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    const handleError = (error) => reject(error);

    output.on("close", resolve);
    output.on("error", handleError);
    archive.on("error", handleError);

    archive.pipe(output);
    archive.directory(sourceDir, rootFolderName);
    archive.finalize();
  });
}

module.exports = function (eleventyConfig) {
  // Expose raw theme folders so the manifest URLs keep working.
  eleventyConfig.addPassthroughCopy({ themes: "themes" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ static: "static" });
  eleventyConfig.addWatchTarget("themes");

  eleventyConfig.on("eleventy.after", async () => {
    await createThemeZips();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "11ty.js"],
  };
};
