# For the blog preview page parse the markdown with github flavour.
removeMd          = require 'remove-markdown'


# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

  # Ignore the api docs from the flixel-docs repo
  ignorePaths: [
    __dirname + '/src/documents/documentation/api',
    __dirname + '/src/documents/styles',
    __dirname + '/src/files/vendor',
  ]

  # Template Data
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
  templateData:
    site:
      url: "https://haxeflixel.com"
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
        "/vendor/highlightjs/styles/an-old-hope.min.css"
      ]
      scripts: [
        "/vendor/highlightjs/highlight.min.js"
      ]
      services:
        googleAnalytics: 'UA-35511281-1'
        disqus: 'haxeflixel'

    # -----------------------------
    # Helper Functions

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


    # Get the prepared site/document description
    getPreparedDescription: ->
      # if we have a document description, then we should use that, otherwise use the site's description
      @document.description or @site.description

    # Get the prepared site/document keywords
    getPreparedKeywords: ->
      # Merge the document keywords with the site keywords
      @site.keywords.concat(@document.keywords or []).join(', ')


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
}

# Export our DocPad Configuration
module.exports = docpadConfig
