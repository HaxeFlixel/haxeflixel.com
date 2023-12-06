const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(PostCSSPlugin);

    // eleventyConfig.addPassthroughCopy({"src/files/images": "images"});
    eleventyConfig.addPassthroughCopy({"bundle.out.css": "bundle.css"});
    eleventyConfig.addPassthroughCopy("_includes");
    eleventyConfig.addPassthroughCopy({"_includes/images": "images"});

    eleventyConfig.setUseGitIgnore(false);
    return {
        dir: {
            input: "index.md",
            output: "out",
            includes: "_includes",
            layouts: "layouts"
        }
    }
}