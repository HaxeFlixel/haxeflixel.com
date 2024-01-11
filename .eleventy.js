const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const PostCSSPlugin = require("eleventy-plugin-postcss");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const markdownItTasklist = require("markdown-it-task-lists");
const date = require('date-and-time');


module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(PostCSSPlugin);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	// eleventyConfig.addPassthroughCopy({"src/files/images": "images"});
	eleventyConfig.addPassthroughCopy({ "./public/": "/" });
	eleventyConfig.addPassthroughCopy({ "./content/documentation/flixel-docs/documentation/images/": "/documentation/images/" });
	eleventyConfig.addWatchTarget("./out/css/bundle.css");

	eleventyConfig.addFilter("toDateString", (dateObj) => {
		let now = new Date(dateObj);

		return date.format(now, 'MMMM D, YYYY');
	  });

	eleventyConfig.addLayoutAlias("blog-post", "layouts/blog/post.html");

	let options = {
		html: true,
		breaks: true,
		linkify: false,
	};

	eleventyConfig.setLibrary("md", markdownIt(options));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItTasklist));

	eleventyConfig.ignores.add("content/documentation/flixel-docs/api/");
	eleventyConfig.addFilter("docsRegexp", function (value) {
		let replacedValue = value.replace(/^[\d\-]+/, "");
		replacedValue = replacedValue.replace(/\.html$/, "");

		return replacedValue;
	});

	return {
		dir: {
			input: "content",
			output: "out",
			includes: "../_includes",
		},
	};
};
