module.exports = (data) => `${JSON.stringify(data.themes, null, 2)}\n`;

module.exports.data = {
  permalink: "themes.json",
  eleventyExcludeFromCollections: true,
};

