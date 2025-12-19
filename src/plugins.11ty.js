module.exports = (data) => `${JSON.stringify(data.plugins, null, 2)}\n`;

module.exports.data = {
  permalink: "plugins.json",
  eleventyExcludeFromCollections: true,
};
