![](https://raw.github.com/HaxeFlixel/haxeflixel.com/master/src/files/images/flixel-logos/haxeflixel.com.png)

[flixel](https://github.com/HaxeFlixel/flixel) | [addons](https://github.com/HaxeFlixel/flixel-addons) | [ui](https://github.com/HaxeFlixel/flixel-ui) | [demos](https://github.com/HaxeFlixel/flixel-demos) | [tools](https://github.com/HaxeFlixel/flixel-tools) | [templates](https://github.com/HaxeFlixel/flixel-templates) | [docs](https://github.com/HaxeFlixel/flixel-docs) | [haxeflixel.com](https://github.com/HaxeFlixel/haxeflixel.com)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/HaxeFlixel/haxeflixel.com/trend.png)](https://bitdeli.com/HaxeFlixel "Bitdeli Badge")

##About

This is the source of [haxeflixel.com](http://haxeflixel.com/). It is made with a Node.js static site generator called [DocPad](http://docpad.org/).
You can compile this website yourself with a local install of DocPad, pull requests are welcome.

1. [Install DocPad](http://docpad.org/docs/install)

2. Clone and run the server

	``` bash
	git clone https://github.com/HaxeFlixel/haxeflixel.com.git
	cd haxeflixel.com
	```
	To install dependencies and run docpad, run the following commands:
	
	```batch
	npm install
	docpad run
	```
	Or if you are a windows user:
	
	...run `install.bat`, then `run.bat`

3. [Open http://localhost:9778/](http://localhost:9778/)

4. Start hacking away by modifying the `src` directory, the live reload plugin will compile the site as you save the files you modify.

##Contributing

If you want to contribute and improve our website please work on a [fork](https://github.com/HaxeFlixel/haxeflixel.com/fork) or feature branch. Only working and tested changes will be merged into master. Use the [issue system](https://github.com/HaxeFlixel/haxeflixel.com/issues) for developer support and approval on your changes.


### How to add Documentation

Documentation is being pulled periodically from the [flixel-docs](https://github.com/HaxeFlixel/flixel-docs) repository, please review the readme there for more info on updating the haxeflixel.com/documentation pages.

### How to add a demo

1. Create a `.html.md` file in [`/src/documents/demos`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/demos) following this example:

	```
		```
		title: "Demo-Name"
		layout: demo
		pageOrder: 1
		SWFHeight: 480
		SWFWidth: 640
		source: "flixel-demos-subdirectory/Demo-Name"
		```	
		Here goes the actual description of the demo in  GitHub-Flavored-Markdown:
		* What the demo displays
		* Who created it
		* What the controls are
		* etc
			
		HTML is still allowed and can be used for more advanced descriptions.
		
	```
`source` points to the subdirectory of [flixel-demos](https://github.com/HaxeFlixel/flixel-demos) that contains the demo. 

2. Add a screenshot of the demo named `Demo-Name.png` to [`/src/files/demos/images`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/images).

3. Add the actual swf file of the demo named `Demo-Name.swf` to [`/src/files/demos/swf`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/swf). Should be compiled with `FLX_NO_DEBUG` (to show the flixel splash screen) and in release mode if possible!

### How to a Showcase Item

1. Create a `.md` file in [`/src/documents/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/showcase) following this example:

	```
		```
		layout: "showcase"
		title: "BOSSES FOREVER 2.BRO"
		flash: true
		windows: true
		ouya: true
		mac: true
		website: "http://www.bossesforever.com/"
		```
	```
	Note that by setting a target to true on one of the supported targets, the icon will automatically become coloured on the [showcase page](http://haxeflixel.com/showcase).

2. Add a screenshot of the showcase using the same title used in the `*.md` file, e.g. `BOSSES FOREVER 2.BRO.png` to [`/src/files/showcase/images`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/showcase/images). They are resized and cropped to 500x260, so it's best to use the same ratio.

Showcases that are not officially released yet are only accepted in special cases.
