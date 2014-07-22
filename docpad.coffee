# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

  # =================================
  # Ignore the api docs from the flixel-docs repo

  ignorePaths: [
    __dirname + '/src/documents/documentation/api'
  ]

  #docpad-image-thumbnail plugin has not been updated.

  skipUnsupportedPlugins: true

  # =================================
  # Template Data
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

  templateData:

    # Specify some site properties
    site:
      # The production url of our website
      url: "http://haxeflixel.com"

      # The default title of our website
      title: "HaxeFlixel 2D Game Framework"

      name: "HaxeFlixel"

      # The website description (for SEO)
      description: """
        HaxeFlixel is a 2D Game framework that lets you create cross-platform games easier with free, open source technology!
        """

      # The website keywords (for SEO) separated by commas
      keywords: """
        gamedev, game development, cross-platform, haxe, flixel
        """

      # Styles
      styles: [
        "/styles/bootstrap.css",
        "/styles/style.css",
        "/styles/site.css",
        "/styles/monokai-sublime.css"
      ]

      # Scripts
      scripts: [
        "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js",
        "/vendor/twitter-bootstrap-3/js/dropdown.js",
        "/vendor/twitter-bootstrap-3/js/transition.js",
        "/vendor/twitter-bootstrap-3/js/collapse.js"
      ]

      services:
        googleAnalytics: 'UA-35511281-1'

    # -----------------------------
    # Helper Functions

    # Get the prepared site/document title
    # Often we would like to specify particular formatting to our page's title
    # we can apply that formatting here
    getPreparedTitle: ->
      # if we have a document title, then we should use that and suffix the site's title onto it
      if @document.title
        "#{@document.title} | #{@site.title}"
      # if our document does not have it's own title, then we should just use the site's title
      else
        @site.title

    getDocumentMenuTitle:(title) ->
      if title.length > 28
        return "#{title.substring(0,20)} ..."
      else
        return title

    getShowcaseActive:(status) ->
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

    getThumbCustom:(test) ->
      url = "/images/demos/"
      path = "#{url}#{test} "

    getPagerNext:(collection) ->
      docsCollection = @getCollection(collection)
      for item,index in docsCollection.models
        if item.id is @document.id
          break
      return docsCollection.models[index+1]

    getPagerPrevious:(collection) ->
      docsCollection = @getCollection(collection)
      for item,index in docsCollection.models
        if item.id is @document.id
          break
      return docsCollection.models[index-1]

    getFirst:(collection) ->
      docsCollection = @getCollection(collection)
      return docsCollection.models[0]

    getLast:(collection) ->
      docsCollection = @getCollection(collection)
      return docsCollection.models[docsCollection.length-1]

  # =================================
  # Collections
  # These are special collections that our website makes available to us

  collections:

    blog: (database) ->
      database.findAllLive({layout:$has:'blog-post'}, [date:-1]).on 'add', (document) ->
        a = document.attributes
        contentPreview = a.content.substring(0,150)
        contentPreview = contentPreview + " ..."
        document.setMetaDefaults({
          contentPreview
        })

    demos: (database) ->
      database.findAllLive({layout:$has:'demo'}, [date:-1])

    showcase: (database) ->
      database.findAllLive({layout:$has:'showcase'}, [date:-1])

    homepage_demos: (database) ->
      database.findAllLive({tags:$has:'homepage_demo'}, [date:-1])

    getting_started: (database) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: '00_getting_started'
        body: $ne: ""
      sorting = [categoryDirectory:1, filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        categoryName = 'getting_started'
        categoryTitle = 'Getting Started'
        githubEditUrl = 'https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/00_getting_started/'
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          categoryTitle
          editUrl
        }).addUrl(urls)

    community: (database) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: '01_community'
        body: $ne: ""
      sorting = [categoryDirectory:1, filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        categoryName = 'community'
        categoryTitle = 'Community'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = 'https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/01_community/'
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          editUrl
          categoryName
          categoryTitle
        }).addUrl(urls)

    handbook: (database) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: '02_handbook'
        body: $ne: ""
      sorting = [categoryDirectory:1, filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        categoryName = 'handbook'
        categoryTitle = "Handbook"
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = 'https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/02_handbook/'
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          categoryTitle
          editUrl
        }).addUrl(urls)

    resources: (database) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: '03_resources'
        body: $ne: ""
      sorting = [categoryDirectory:1, filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        categoryName = 'resources'
        categoryTitle = 'Resources'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = "https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/03_resources/"
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          categoryTitle
          editUrl
        }).addUrl(urls)

    tutorials: (database) ->
      query =
        write: true
        relativeOutDirPath: $endsWith: '04_tutorials'
        body: $ne: ""
      sorting = [categoryDirectory:1, filename:1]

      database.findAllLive(query, sorting).on 'add', (document) ->
        a = document.attributes
        layout = 'doc'
        categoryName = 'tutorials'
        categoryTitle = 'Tutorials'
        urls = ['/documentation/' + a.basename.replace(/^[\-0-9]+/,'')]
        githubEditUrl = "https://github.com/HaxeFlixel/flixel-docs/blob/master/documentation/04_tutorials/"
        editUrl = githubEditUrl + a.basename + '.html.md'
        document.setMetaDefaults({
          layout
          url: urls[0]
          categoryName
          categoryTitle
          editUrl
        }).addUrl(urls)

    rootDocuments: (database) ->
      query =
        write: true
        relativeOutDirPath: $startsWith: 'documentation'
        body: $ne: ""
        rootDoc: true
      sorting = [categoryDirectory:1, relativeDirPath:1]

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

}

# Export our DocPad Configuration
module.exports = docpadConfig