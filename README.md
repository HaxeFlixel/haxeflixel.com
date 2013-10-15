haxeflixel.com
==============

You can compile this website yourself with a local install of Docpad, pull requests are welcome.

1. [Install DocPad](http://docpad.org/docs/install)

2. Clone and run the server

	``` bash
	git clone https://github.com/HaxeFlixel/haxeflixel.com.git
	cd haxeflixel.com
	npm install
	docpad run
	```

3. [Open http://localhost:9778/](http://localhost:9778/)

4. Start hacking away by modifying the `src` directory.

* Note that the pygments syntax highlighter makes compiling very slow, you can disable it under plugins in the [docpad.coffee](https://github.com/HaxeFlixel/haxeflixel.com/blob/master/docpad.coffee#L241) file in root.
