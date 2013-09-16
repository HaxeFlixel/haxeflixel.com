# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

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
				"/styles/bootstrap.css"
				"/styles/style.css"
				"/styles/site.css"
			]

			# Scripts
			scripts: [
				"//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
				"//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js",
				"/vendor/twitter-bootstrap-3/js/dropdown.js",
				"/vendor/twitter-bootstrap-3/js/transition.js",
				"/vendor/twitter-bootstrap-3/js/carousel.js",
				"/vendor/twitter-bootstrap-3/js/collapse.js"
			]

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

		demos: (database) ->
			database.findAllLive({layout:$has:'demo'}, [date:-1])

		homepage_demos: (database) ->
			database.findAllLive({tags:$has:'homepage_demo'}, [date:-1])

		getting_started: (database) ->
			query =
				write: true
				relativeOutDirPath: $startsWith: 'documentation/00_getting_started'
				body: $ne: ""
			sorting = [categoryDirectory:1, filename:1]

			database.findAllLive(query, sorting).on 'add', (document) ->
				a = document.attributes
				layout = 'doc'
				name = a.basename.replace(/^[\-0-9]+/,'')
				urls = ["/documentation/#{name}"]
				categoryName = 'getting_started'
				categoryTitle = 'Getting Started'
				githubEditUrl = "https://github.com/impaler/haxeflixel.com/edit/master/src/documents/"
				editUrl = githubEditUrl + a.relativePath
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
				relativeOutDirPath: $startsWith: 'documentation/01_community'
				body: $ne: ""
			sorting = [categoryDirectory:1, filename:1]

			database.findAllLive(query, sorting).on 'add', (document) ->
				a = document.attributes
				layout = 'doc'
				categoryName = 'community'
				categoryTitle = 'Community'
				name = a.basename.replace(/^[\-0-9]+/,'')
				urls = ["/documentation/#{name}"]
				githubEditUrl = "https://github.com/impaler/haxeflixel.com/edit/master/src/documents/"
				editUrl = githubEditUrl + a.relativePath
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
				relativeOutDirPath: $startsWith: 'documentation/02_handbook'
				body: $ne: ""
			sorting = [categoryDirectory:1, filename:1]

			database.findAllLive(query, sorting).on 'add', (document) ->
				a = document.attributes
				layout = 'doc'
				categoryName = 'handbook'
				categoryTitle = "Handbook"
				name = a.basename.replace(/^[\-0-9]+/,'')
				urls = ["/documentation/#{name}"]
				githubEditUrl = "https://github.com/impaler/haxeflixel.com/edit/master/src/documents/"
				editUrl = githubEditUrl + a.relativePath
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
				relativeOutDirPath: $startsWith: 'documentation/03_resources'
				body: $ne: ""
			sorting = [categoryDirectory:1, filename:1]

			database.findAllLive(query, sorting).on 'add', (document) ->
				a = document.attributes
				layout = 'doc'
				categoryName = 'resources'
				categoryTitle = 'Resources'
				name = a.basename.replace(/^[\-0-9]+/,'')
				urls = ["/documentation/#{name}"]
				githubEditUrl = "https://github.com/impaler/haxeflixel.com/edit/master/src/documents/"
				editUrl = githubEditUrl + a.relativePath
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
				name = a.basename.replace(/^[\-0-9]+/,'')
				urls = ["/documentation/#{name}"]
				githubEditUrl = "https://github.com/impaler/haxeflixel.com/edit/master/src/documents/"
				editUrl = githubEditUrl + a.relativePath
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

		#live reload is slow with this on
		pygments:
			enabled: false

}

# Export our DocPad Configuration
module.exports = docpadConfig