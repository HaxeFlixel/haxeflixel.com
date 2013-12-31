haxeflixel.com
==============

You can compile this website yourself with a local install of Docpad, pull requests are welcome.

1. [Install DocPad](http://docpad.org/docs/install)

2. Clone and run the server

	``` bash
	git clone https://github.com/HaxeFlixel/haxeflixel.com.git
	cd haxeflixel.com
	```
	Now, you either...
	* ...run `install.bat`, then `run.bat`
	* ...run the following commands manually:
	
		```batch
		npm install
		docpad run
		```

3. [Open http://localhost:9778/](http://localhost:9778/)

4. Start hacking away by modifying the `src` directory, the live reload plugin will compile the site as you save the files you modify.

###How to add a demo

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
3. Add the actual swf file of the demo named `Demo-Name.swf` to [`/src/files/demos/swf`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/swf).
	
