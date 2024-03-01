const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const Sharp = require('sharp');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);

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

    /**
     * Will filter to add subcategories to the docs, based on folder structure
     */
    eleventyConfig.addFilter("docsSubcategories", function (value) {
      console.log(value);
      // Gets the current filename and it's parent folder via regex

      return value;
    });

    eleventyConfig.addFilter("docsRegexp", function (value) {
      let replacedValue = value.replace(/^[\d\-]+/, "");
      replacedValue = replacedValue.replace(/\.html$/, "");
  
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
