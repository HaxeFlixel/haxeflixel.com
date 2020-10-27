/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// For the blog preview page parse the markdown with github flavour.
const removeMd          = require('remove-markdown');
const backers           = require('./source/files/backers.json');

const demoBaseUrl = 'https://demos.haxeflixel.com/html5/';

// The DocPad Configuration File
// It is simply a CoffeeScript Object which is parsed by CSON
var docpadConfig = {

  // Ignore the api docs from the flixel-docs repo
  ignorePaths: [
    __dirname + '/src/documents/documentation/api'
  ],

  // Template Data
  // These are variables that will be accessible via our templates
  // To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
  templateData: {
    site: {
      url: "https://haxeflixel.com",
      title: "HaxeFlixel 2D Game Engine",
      name: "HaxeFlixel",
      // The website description (for SEO)
      description: `\
HaxeFlixel is a 2D Game Engine that lets you create cross-platform games easier with free, open source technology!\
`,
      // The website keywords (for SEO) separated by commas
      keywords: `\
gamedev, game development, cross-platform, haxe, flixel\
`,
      styles: [
        "/styles/style.css"
      ],
      scripts: [
        "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js",
        "/vendor/twitter-bootstrap-3/js/dropdown.js",
        "/vendor/twitter-bootstrap-3/js/transition.js",
        "/vendor/twitter-bootstrap-3/js/collapse.js"
      ],
      services: {
        googleAnalytics: 'UA-35511281-1',
        disqus: 'haxeflixel'
      }
    },

    // -----------------------------
    // Helper Functions

    // Used in the fundraiser page for the indiegogo backer list
    getBackers() {
      return backers;
    },

    // Get the prepared site/document title
    // Often we would like to specify particular formatting to our page's title
    // we can apply that formatting here
    getPreparedTitle() {
      // if we have a document title, then we should use that and suffix the site's title onto it
      if (this.document.title) {
        return `${this.document.title} | ${this.site.title}`;
      // if our document does not have its own title, then we should just use the site's title
      } else {
        return this.site.title;
      }
    },

    getShowcaseActive(status) {
      if (status) {
        return 'showcases-target-actives';
      } else {
        return 'showcases-target';
      }
    },

    // Get the prepared site/document description
    getPreparedDescription() {
      // if we have a document description, then we should use that, otherwise use the site's description
      return this.document.description || this.site.description;
    },

    // Get the prepared site/document keywords
    getPreparedKeywords() {
      // Merge the document keywords with the site keywords
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    },

    getDemoTarget(document) {
      if ((document.targets != null) && Array.from(document.targets).includes('html5') && Array.from(document.targets).includes('flash')) {
        return {html5: demoBaseUrl + document.title, flash: true};
      } else if ((document.targets != null) && Array.from(document.targets).includes('html5')) {
        return {html5: demoBaseUrl + document.title};
      } else { return {flash: true}; }
    },

    getPagerNext(collection) {
      let index;
      const docsCollection = this.getCollection(collection);
      for (index = 0; index < docsCollection.models.length; index++) {
        const item = docsCollection.models[index];
        if (item.id === this.document.id) {
          break;
        }
      }
      return docsCollection.models[index+1];
    },

    getPagerPrevious(collection) {
      let index;
      const docsCollection = this.getCollection(collection);
      for (index = 0; index < docsCollection.models.length; index++) {
        const item = docsCollection.models[index];
        if (item.id === this.document.id) {
          break;
        }
      }
      return docsCollection.models[index-1];
    },

    getFirst(collection) {
      const docsCollection = this.getCollection(collection);
      return docsCollection.models[0];
    },

    getLast(collection) {
      const docsCollection = this.getCollection(collection);
      return docsCollection.models[docsCollection.length-1];
    },

    getDocCollection(database, dir, categoryName, categoryTitle) {
      const query = {
        write: true,
        relativeOutDirPath: { $endsWith: dir
      },
        body: { $ne: ""
      }
      };
      const sorting = [{filename:1}];

      return database.findAllLive(query, sorting).on('add', function(document) {
        const a = document.attributes;
        const layout = 'doc';
        const urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')];
        const githubEditUrl = 'https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/' + dir + '/';
        const editUrl = githubEditUrl + a.basename + '.html.md';
        return document.setMetaDefaults({
          layout,
          url: urls[0],
          categoryName,
          categoryTitle,
          editUrl
        }).addUrl(urls);
      });
    }
  },

  // =================================

  collections: {

    blog(database) {
      return database.findAllLive({layout:{$has:['blog-post', 'fundraiser-layout']}}, [{filename:-1}]).on('add', function(document) {
        const a = document.attributes;
        if (a.layout !== "fundraiser-layout") {
          const contentPreview = removeMd(a.content).substring(0,150) + " ...";
          return document.setMetaDefaults({
            contentPreview
          });
        }
      });
    },

    demos(database) {
      return database.findAllLive({layout:{$has:'demo'}}, [{title:1}]).on('add', document => document.setMetaDefaults({
        width: 640,
        height: 480
      }));
    },

    showcase(database) {
      return database.findAllLive({layout:{$has:'showcase'}}, [{title:1}]);
    },

    homepage_demos(database) {
      return database.findAllLive({tags:{$has:'homepage_demo'}}, [{title:1}]);
    },

    getting_started(database) {
      return docpadConfig.templateData.getDocCollection(database, '00_getting_started', 'getting_started', 'Getting Started');
    },

    tutorial(database) {
      return docpadConfig.templateData.getDocCollection(database, '01_tutorial', 'tutorial', 'Tutorial');
    },

    handbook(database) {
      return docpadConfig.templateData.getDocCollection(database, '02_handbook', 'handbook', 'Handbook');
    },

    resources(database) {
      return docpadConfig.templateData.getDocCollection(database, '03_resources', 'resources', 'Resources');
    },

    community(database) {
      return docpadConfig.templateData.getDocCollection(database, '04_community', 'community', 'Community');
    },

    rootDocuments(database) {
      const query = {
        write: true,
        relativeOutDirPath: { $startsWith: 'documentation'
      },
        body: { $ne: ""
      },
        rootDoc: true
      };
      const sorting = [{relativeOutDirPath:1}];

      return database.findAllLive(query, sorting).on('add', function(document) {
        const a = document.attributes;
        const layout = 'doc';
        const categoryName = 'resources';
        const urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')];
        const githubEditUrl = "https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/";
        const editUrl = githubEditUrl + a.basename;
        return document.setMetaDefaults({
          layout,
          url: urls[0],
          categoryName,
          editUrl
        }).addUrl(urls);
      });
    }
  },

  // =================================
  // Plugins

  plugins: {
    cleanurls: {
      enabled: true
    },

    markedOptions: {
      gfm: true
    },

    thumbnails: {
      imageMagick: true
    },

    repocloner: {
      repos: [
        {
          name: 'HaxeFlixelDocumentation',
          path: 'src/documents/documentation',
          url: 'https://github.com/HaxeFlixel/flixel-docs.git'
        }
      ]
    }
  }
};

// Export our DocPad Configuration
module.exports = docpadConfig;