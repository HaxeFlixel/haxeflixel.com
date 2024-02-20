const { EleventyRenderPlugin } = require("@11ty/eleventy");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);

    // Return your Object options:
    return {
      dir: {
        layouts: "_layouts",
        input: "11ty-source",
        output: "out"
      }
    }
  };