const { EleventyRenderPlugin } = require("@11ty/eleventy");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);

    // used to set the current active dropdown list item to active, depending on current page
    eleventyConfig.addShortcode("dropdownActive", function(dropdownItem) {
      
      let isActive = this.page.url.includes(`/${dropdownItem}/`);
      return isActive ? "active" : "";
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