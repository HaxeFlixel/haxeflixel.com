import { RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";
import Sharp from "sharp";
import fs from "fs";
import path from "path";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import markdownAnchor from "markdown-it-anchor";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";


const __dirname = path.resolve();


export default function (eleventyConfig) {
	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	eleventyConfig.setLibrary("md", markdownIt(options));

	eleventyConfig.amendLibrary("md", (mdLib) =>
		mdLib.use(markdownAnchor, {
			permalink: markdownAnchor.permalink.headerLink({ safariReaderFix: true }),
		}),
	);
	// Highlights code
	eleventyConfig.amendLibrary("md", (mdLib) =>
		mdLib.set({
			highlight: function (str, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return (
							'<pre class="position-relative"><code class="hljs">' +
							hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
							`</code><small class='highlight-language position-absolute top-0 end-0'>${lang.toUpperCase()}</small></pre>`
						);
					} catch (__) {}
				}

				return '<pre><code class="hljs">' + mdLib.utils.escapeHtml(str) + "</code></pre>";
			},
		}),
	);

	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(HtmlBasePlugin);

	eleventyConfig.addWatchTarget("./scss/");

	eleventyConfig.addPassthroughCopy({
		"node_modules/highlight.js/styles/*.min.css": "styles/highlights",
	});
	eleventyConfig.addPassthroughCopy({ "content/_static/": "/" });
	eleventyConfig.addPassthroughCopy({
		"content/documentation/flixel-docs/documentation/images/": "/documentation/images",
	});

	eleventyConfig.ignores.add("**/README.md");
	eleventyConfig.ignores.add("**/LICENSE.md");

	// used to set the current active dropdown list item to active, depending on current page
	eleventyConfig.addShortcode("dropdownActive", function (dropdownItem) {
		let isActive = this.page.url.includes(`/${dropdownItem}/`);
		return isActive ? "active" : "";
	});

	// shortcode to calculate readtime
	eleventyConfig.addShortcode("readtime", function (content) {
		let words = content.split(" ").length;
		let minutes = Math.ceil(words / 265);
		return minutes;
	});

	eleventyConfig.addShortcode("image", async function (src, alt, width, height, classes = "") {
		let resizedImage = await resizeImage(src, width, height, "cover");

		let metadata = await Image(resizedImage, {
			formats: ["png"],
			outputDir: "out/img",
			sharpPngOptions: { progressive: true}
		});

		let imageAttributes = {
			alt,
			width: width,
			height: height,
			loading: "lazy",
			decoding: "async",
			class: classes,
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blogpost", // iterate over `collections.posts`
			limit: 0,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "HaxeFlixel Blog",
			subtitle: "News and writings from the HaxeFlixel maintainers",
			base: "https://haxeflixel.com/",
			author: {
				name: "HaxeFlixel Team",
				email: "", // Optional
			}
		}
	});

	// gets folders for documentation collections, except for the images folder!
	let docPath = path.join(__dirname, "content/documentation/flixel-docs/documentation");
	let dirs = fs
		.readdirSync(docPath, { withFileTypes: true })
		.map((dirent) => dirent.name)
		.filter((dirent) => dirent != "images");

	for (const dir in dirs) {
		const cleanDir = dirs[dir].replace(/^[^a-zA-Z]+/g, "");
		console.log("Clean DIR: ", cleanDir);
		eleventyConfig.addCollection(cleanDir, function (collection) {
			let cool = fs.readdirSync(path.join(docPath, dirs[dir]));
			// console.log("Dir: ", dirs[dir]);
			var collectionItem = collection.getFilteredByGlob(
				`**/flixel-docs/documentation/${dirs[dir]}/**`,
			);
			// console.log("Collection item: ", collectionItem);
			collectionItem.map((item) => item.data.tags.push(cleanDir));
			collectionItem.map((item) => (item.data.docGroup = cleanDir));
			// collectionItem.map(item => console.log(item.data));
			// collectionItem.data.push(cleanDir);
			return collectionItem;
		});
	}

	eleventyConfig.addFilter("docsRegexp", function (value) {
		let replacedValue = value.replace(/^[\d\-]+/, "");
		replacedValue = replacedValue.replace(/\.html$/, "");
		// console.log(replacedValue);
		return replacedValue;
	});

	eleventyConfig.addFilter("getApiPath", function (value) {
		// replace content/documentation/flixel-docs/documentation/ with ""
		let replacedValue = value.replace(/content\/documentation\/flixel-docs\/documentation\//, "");
		return replacedValue;
	});

	// Return your Object options:
	return {
		dir: {
			layouts: "_layouts",
			input: "content",
			output: "out",
		},
	};
};

async function resizeImage(src, width, height, mode) {
	return await Sharp(src)
		.resize({
			width: width,
			height: height,
			fit: mode,
		})
		.toBuffer();
}
