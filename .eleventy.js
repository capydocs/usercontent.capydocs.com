module.exports = function (eleventyConfig) {
  // Expose raw theme folders so the manifest URLs keep working.
  eleventyConfig.addPassthroughCopy({ themes: "themes" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ static: "static" });
  eleventyConfig.addWatchTarget("themes");

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
