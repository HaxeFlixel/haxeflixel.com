const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const Sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const hljs = require('highlight.js');
const markdownAnchor = require('markdown-it-anchor');

module.exports = function(eleventyConfig) {

    eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownAnchor, {permalink: markdownAnchor.permalink.headerLink({ safariReaderFix: true })}));
    
    // Highlights code
    eleventyConfig.amendLibrary("md", mdLib => mdLib.set({highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="position-relative"><code class="hljs">' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 `</code><small class='highlight-language position-absolute top-0 end-0'>${lang.toUpperCase()}</small></pre>`;
        } catch (__) {}
      }
  
      return '<pre><code class="hljs">' + mdLib.utils.escapeHtml(str) + '</code></pre>';
    }
  
  }));

    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    
    eleventyConfig.addWatchTarget("./scss/");

    eleventyConfig.addPassthroughCopy({ "node_modules/highlight.js/styles/*.min.css": "styles/highlights" });
    eleventyConfig.addPassthroughCopy({ "static/": "/" });
    eleventyConfig.addPassthroughCopy({ "11ty-source/documentation/flixel-docs/documentation/images/": "/documentation/images" });

    eleventyConfig.ignores.add("**/README.md");
    eleventyConfig.ignores.add("**/LICENSE.md");

    // used to set the current active dropdown list item to active, depending on current page
    eleventyConfig.addShortcode("dropdownActive", function(dropdownItem) {
      let isActive = this.page.url.includes(`/${dropdownItem}/`);
      return isActive ? "active" : "";
    });

    eleventyConfig.addShortcode("image", async function(src, alt, width, height) {
      let resizedImage = await resizeImage(src, width, height, "cover");

      let metadata = await Image(resizedImage, { 
        formats: ["png"],
        outputDir: "out/img"
      });
  
      let imageAttributes = {
        alt,
        width: width,
        height: height,
        loading: "lazy",
        decoding: "async",
      };
  
      // You bet we throw an error on a missing alt (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes);
    });

    
    
    // gets folders for documentation collections, except for the images folder!
    let docPath = path.join(__dirname, "11ty-source/documentation/flixel-docs/documentation");
    let dirs = fs.readdirSync(docPath, { withFileTypes: true }).map(dirent => dirent.name).filter(dirent => dirent != "images");
    
    for (const dir in dirs)
    {
      const cleanDir = dirs[dir].replace(/^[^a-zA-Z]+/g, "");
      console.log("Clean DIR: ", cleanDir);
      eleventyConfig.addCollection(cleanDir, function(collection) {
        let cool = fs.readdirSync(path.join(docPath, dirs[dir]));
        // console.log("Dir: ", dirs[dir]);
        var collectionItem = collection.getFilteredByGlob(`**/flixel-docs/documentation/${dirs[dir]}/**`);
        // console.log("Collection item: ", collectionItem);
        collectionItem.map(item => item.data.tags.push(cleanDir));
        collectionItem.map(item => item.data.docGroup = cleanDir);
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
      // replace 11ty-source/documentation/flixel-docs/documentation/ with ""
      let replacedValue = value.replace(/11ty-source\/documentation\/flixel-docs\/documentation\//, "");
      return replacedValue;
    });

    // Return your Object options:
    return {
      dir: {
        layouts: "_layouts",
        input: "11ty-source",
        output: "out"
      }
    }
  };

async function resizeImage(src, width, height, mode) {
    return await Sharp(src)
        .resize({ width: width, height: height, fit: mode, options:{
          kernel: "nearest",
          fastShrinkOnLoad: false
        }})
        .toBuffer();
}
