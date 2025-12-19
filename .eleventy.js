const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const archiver = require("archiver");

async function createZipsFor(directoryName) {
  const sourceRoot = path.join(__dirname, directoryName);

  if (!fs.existsSync(sourceRoot)) {
    return;
  }

  const entries = await fsPromises.readdir(sourceRoot, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory());

  if (folders.length === 0) {
    return;
  }

  const targetRoot = path.join(__dirname, "_site", directoryName);
  await fsPromises.mkdir(targetRoot, { recursive: true });

  for (const folder of folders) {
    const sourceDir = path.join(sourceRoot, folder.name);
    const zipPath = path.join(targetRoot, `${folder.name}.zip`);
    await zipDirectory(sourceDir, zipPath, folder.name);
  }
}

function zipDirectory(sourceDir, destinationPath, rootFolderName) {
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
  // Expose raw assets so the manifest URLs keep working.
  eleventyConfig.addPassthroughCopy({ themes: "themes" });
  eleventyConfig.addPassthroughCopy({ plugins: "plugins" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ static: "static" });
  eleventyConfig.addWatchTarget("themes");
  eleventyConfig.addWatchTarget("plugins");

  eleventyConfig.on("eleventy.after", async () => {
    await Promise.all([createZipsFor("themes"), createZipsFor("plugins")]);
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
