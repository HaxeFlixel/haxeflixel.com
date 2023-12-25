const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const PostCSSPlugin = require("eleventy-plugin-postcss");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(PostCSSPlugin);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


    // eleventyConfig.addPassthroughCopy({"src/files/images": "images"});
    eleventyConfig.addPassthroughCopy({"./public/": "/"});
    eleventyConfig.addWatchTarget("./out/css/bundle.css");


    eleventyConfig.addLayoutAlias('blog-post', 'layouts/blog/post.html');

    return {
        dir: {
            input: "content",
            output: "out",
            includes: "../_includes"
        }
    };
}