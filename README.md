![](https://raw.github.com/HaxeFlixel/haxeflixel.com/master/src/files/images/flixel-logos/haxeflixel.com.png)

[flixel](https://github.com/HaxeFlixel/flixel) | [addons](https://github.com/HaxeFlixel/flixel-addons) 
| [ui](https://github.com/HaxeFlixel/flixel-ui) | [demos](https://github.com/HaxeFlixel/flixel-demos) 
| [tools](https://github.com/HaxeFlixel/flixel-tools) | [templates](https://github.com/HaxeFlixel/flixel-templates) 
| [docs](https://github.com/HaxeFlixel/flixel-docs) | [haxeflixel.com](https://github.com/HaxeFlixel/haxeflixel.com)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/HaxeFlixel/haxeflixel.com/trend.png)](https://bitdeli.com/HaxeFlixel "Bitdeli Badge")

##About

This is the source of [haxeflixel.com](http://haxeflixel.com/). It is made with a Node.js static site generator called 
[DocPad](http://docpad.org/).
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
    
    The website uses [docpad-plugin-thumbnails](https://github.com/rantecki/docpad-plugin-thumbnails)
    
    - This requires [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/) 
    installed.

3. [Open http://localhost:9778/](http://localhost:9778/)

4. Start hacking away by modifying the `src` directory, the live reload plugin will compile the site as you save 
the files you modify.

##Contributing

If you want to contribute and improve our website please work on a 
[fork](https://github.com/HaxeFlixel/haxeflixel.com/fork) or feature branch. Only working and tested changes will 
be merged into master. Use the [issue system](https://github.com/HaxeFlixel/haxeflixel.com/issues) for developer 
support and approval on your changes.


###How to add Documentation

Documentation is pulled automatically from the [flixel-docs](https://github.com/HaxeFlixel/flixel-docs) repository, 
please review the readme there for more info on updating the haxeflixel.com/documentation pages.

###How to add a demo

1. Create a `.html.md` file in 
[`/src/documents/demos`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/demos) 
following this example:

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
`source` points to the subdirectory of [flixel-demos](https://github.com/HaxeFlixel/flixel-demos) 
that contains the demo. 

2. Add a screenshot of the demo named `Demo-Name.png` to 
[`/src/files/demos/images`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/images).

3. Add the actual swf file of the demo named `Demo-Name.swf` to 
[`/src/files/demos/swf`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/swf). 
Should be compiled with `FLX_NO_DEBUG` (to show the flixel splash screen) and in release mode if possible!

###How to add a Showcase game

1. Create a `.md` file in 
[`/src/documents/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/showcase) 
following this example:

    ```
        layout: showcase
        title: "BOSSES FOREVER 2.BRO"
        flash: http://www.bossesforever.com/
        windows: http://www.bossesforever.com/
        ouya: https://www.ouya.tv/game/BOSSES-FOREVER-2BRO/
        mac: http://www.bossesforever.com/
        website: http://www.bossesforever.com/
    ```
    
    Note that by adding a URL to one of the supported targets, the icon will automatically become coloured on the 
    [showcase page](http://haxeflixel.com/showcase) and link to that URL.

2. Add a screenshot of the showcase using the same title used in the `*.md` file, e.g. `BOSSES FOREVER 2.BRO.png` 
to [`/src/files/showcase/images`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/showcase/images). 
They are resized and cropped to 500x260, so it's best to use the same ratio.

Showcases that are not officially released yet are only accepted in special cases.

----

##Compile the live site

haxeflixel.com is being hosted from a [static build of docpad](http://docpad.org/docs/deploy). To update the site
run the `compile.sh` or `compile.bat` which uses `docpad generate --env static`.

Note that although both the `run` and `compile` scripts update the `out` folder they are different commands and 
`run` will not create everything the server needs.
