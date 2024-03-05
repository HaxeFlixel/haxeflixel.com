const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const Sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const hljs = require('eleventy-plugin-highlightjs');
const markdownAnchor = require('markdown-it-anchor');

module.exports = function(eleventyConfig) {

    eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownAnchor, {permalink: markdownAnchor.permalink.headerLink({ safariReaderFix: true })}));

    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(hljs);
    eleventyConfig.addWatchTarget("./scss/");

    eleventyConfig.addPassthroughCopy({ "node_modules/highlight.js/styles/*.css": "styles/highlights" });


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

    
    eleventyConfig.addPassthroughCopy({ "src/files/images": "images" });
    
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
