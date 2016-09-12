# For the blog preview page parse the markdown with github flavour.
marked            = require 'marked'
backers           = require './src/files/backers.json'
markedOptions =
  pedantic: false
  gfm: true
  sanitize: false
  highlight: null
marked.setOptions(markedOptions);

demoBaseUrl = 'http://demos.haxeflixel.com/'

# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

  # Ignore the api docs from the flixel-docs repo
  ignorePaths: [
    __dirname + '/src/documents/documentation/api'
  ]

  # Template Data
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
  templateData:
    site:
      url: "http://haxeflixel.com"
      title: "HaxeFlixel 2D Game Engine"
      name: "HaxeFlixel"
      # The website description (for SEO)
      description: """
        HaxeFlixel is a 2D Game Engine that lets you create cross-platform games easier with free, open source technology!
        """
      # The website keywords (for SEO) separated by commas
      keywords: """
        gamedev, game development, cross-platform, haxe, flixel
        """
      styles: [
        "/styles/style.css"
      ]
      scripts: [
        "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js",
        "/vendor/twitter-bootstrap-3/js/dropdown.js",
        "/vendor/twitter-bootstrap-3/js/transition.js",
        "/vendor/twitter-bootstrap-3/js/collapse.js"
      ]
      services:
        googleAnalytics: 'UA-35511281-1'
        disqus: 'haxeflixel'

    # -----------------------------
    # Helper Functions

    # Used in the fundraiser page for the indiegogo backer list
    getBackers: ->
      backers

    # Get the prepared site/document title
    # Often we would like to specify particular formatting to our page's title
    # we can apply that formatting here
    getPreparedTitle: ->
      # if we have a document title, then we should use that and suffix the site's title onto it
      if @document.title
        "#{@document.title} | #{@site.title}"
      # if our document does not have its own title, then we should just use the site's title
      else
        @site.title

    getShowcaseActive: (status) ->
      if status
        return 'showcases-target-actives'
      else
        return 'showcases-target'

    # Get the prepared site/document description
    getPreparedDescription: ->
      # if we have a document description, then we should use that, otherwise use the site's description
      @document.description or @site.description

    # Get the prepared site/document keywords
    getPreparedKeywords: ->
      # Merge the document keywords with the site keywords
      @site.keywords.concat(@document.keywords or []).join(', ')

    getDemoTarget: (document) ->
      if document.targets? and 'html5' in document.targets and 'flash' in document.targets
        return {html5: demoBaseUrl + document.title, flash: true}
      else if document.targets? and 'html5' in document.targets
        return {html5: demoBaseUrl + document.title}
      else return {flash: true}

    getPagerNext: (collection) ->
      docsCollection = @getCollection(collection)
      for item,index in docsCollection.models
        if item.id is @document.id
          break
      return docsCollection.models[index+1]

    getPagerPrevious: (collection) ->
      docsCollection = @getCollection(collection)
      for item,index in docsCollection.models
        if item.id is @document.id
          break
      return docsCollection.models[index-1]

    getFirst: (collection) ->
      docsCollection = @getCollection(collection)
      return docsCollection.models[0]

    getLast: (collection) ->
      docsCollection = @getCollection(collection)
      return docsCollection.models[docsCollection.length-1]

    getDocCollection: (database, dir, categoryName, categoryTitle) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: dir
        body: $ne: ""
      sorting = [filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = 'https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/' + dir + '/'
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          categoryTitle
          editUrl
        }).addUrl(urls)

  # =================================

  collections:

    blog: (database) ->
      database.findAllLive({layout:$has:['blog-post', 'fundraiser-layout']}, [filename:-1]).on 'add', (document) ->
        a = document.attributes
        if a.layout != "fundraiser-layout"
          contentPreview = marked(a.content.substring(0,150) + " ...")
          document.setMetaDefaults({
            contentPreview
          })
        a.postDate = "posted : " + a.postDate

    demos: (database) ->
      database.findAllLive({layout:$has:'demo'}, [title:1]).on 'add', (document) ->
        document.setMetaDefaults({
          width: 640
          height: 480
        })

    showcase: (database) ->
      database.findAllLive({layout:$has:'showcase'}, [title:1])

    homepage_demos: (database) ->
      database.findAllLive({tags:$has:'homepage_demo'}, [title:1])

    getting_started: (database) ->
      docpadConfig.templateData.getDocCollection(database, '00_getting_started', 'getting_started', 'Getting Started')

    tutorial: (database) ->
      docpadConfig.templateData.getDocCollection(database, '01_tutorial', 'tutorial', 'Tutorial')

    handbook: (database) ->
      docpadConfig.templateData.getDocCollection(database, '02_handbook', 'handbook', 'Handbook')

    resources: (database) ->
      docpadConfig.templateData.getDocCollection(database, '03_resources', 'resources', 'Resources')

    community: (database) ->
      docpadConfig.templateData.getDocCollection(database, '04_community', 'community', 'Community')

    rootDocuments: (database) ->
      query =
        write: true
        relativeOutDirPath: $startsWith: 'documentation'
        body: $ne: ""
        rootDoc: true
      sorting = [relativeOutDirPath:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        categoryName = 'resources'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = "https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/"
        editUrl = githubEditUrl + a.basename
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          editUrl
        }).addUrl(urls)

  # =================================
  # Plugins

  plugins:
    cleanurls:
      enabled: true

    markedOptions:
      gfm: true

    highlightjs:
      aliases:
        haxe: 'actionscript'

    thumbnails:
      imageMagick: true

    repocloner:
      repos: [
        name: 'HaxeFlixelDocumentation'
        path: 'src/documents/documentation'
        url: 'https://github.com/HaxeFlixel/flixel-docs.git'
      ]
}

# Export our DocPad Configuration
module.exports = docpadConfig