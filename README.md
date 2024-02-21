[![](https://raw.github.com/HaxeFlixel/haxeflixel.com/master/src/files/images/flixel-logos/haxeflixel.com.png)](https://haxeflixel.com)

[flixel](https://github.com/HaxeFlixel/flixel) | [addons](https://github.com/HaxeFlixel/flixel-addons) 
| [ui](https://github.com/HaxeFlixel/flixel-ui) | [demos](https://github.com/HaxeFlixel/flixel-demos) 
| [tools](https://github.com/HaxeFlixel/flixel-tools) | [templates](https://github.com/HaxeFlixel/flixel-templates) 
| [docs](https://github.com/HaxeFlixel/flixel-docs) | [haxeflixel.com](https://github.com/HaxeFlixel/haxeflixel.com)

[![CI](https://img.shields.io/github/actions/workflow/status/HaxeFlixel/haxeflixel.com/main.yml?branch=master&logo=github)](https://github.com/HaxeFlixel/haxeflixel.com/actions?query=workflow%3ACI)

## About

This is the source of [haxeflixel.com](https://haxeflixel.com/). It was orgiginally made with a Node.js static site generator called 
[DocPad](https://docpad.bevry.me/), but it's in a transition to [11ty](https://www.11ty.dev/)
You can compile this website yourself with a local install of DocPad, pull requests are welcome.

1. [Install DocPad](https://docpad.bevry.me/start/install)

2. Clone and run the server

    ``` bash
    git clone https://github.com/HaxeFlixel/haxeflixel.com.git
    cd haxeflixel.com
    ```
    To install dependencies and run docpad, run the following commands:
    
    ```batch
    npm install
    npm run start
    ```
    Or if you are a windows user:
    
    ...run `install.bat`, then `run.bat`
    
    The website uses [docpad-plugin-thumbnails](https://github.com/rantecki/docpad-plugin-thumbnails)
    
    - This requires [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/) 
    installed.

3. [Open http://localhost:9778/](http://localhost:9778/)

<!-- 4. Start hacking away by modifying the `src` directory, the live reload plugin will compile the site as you save 
the files you modify. -->

## Contributing

If you want to contribute and improve our website please work on a 
[fork](https://github.com/HaxeFlixel/haxeflixel.com/fork) or feature branch. Only working and tested changes will 
be merged into master. Use the [issue system](https://github.com/HaxeFlixel/haxeflixel.com/issues) for developer 
support and approval on your changes.


### How to add Documentation

Documentation is pulled automatically from the [flixel-docs](https://github.com/HaxeFlixel/flixel-docs) repository, 
please review the readme there for more info on updating the haxeflixel.com/documentation pages.

### How to add a demo

1. Create a `.html.md` file in 
[`/src/documents/demos`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/demos) 
following this example:

    ```
        ---
        title: "Demo-Name"
        layout: demo
        width: 800
        height: 500
        source: "flixel-demos-subdirectory/Demo-Name"
        ---
        Here goes the actual description of the demo in  GitHub-Flavored-Markdown:
        * What the demo displays
        * Who created it
        * What the controls are
        * etc
            
        HTML is still allowed and can be used for more advanced descriptions.
        
    ```
`source` points to the subdirectory of [flixel-demos](https://github.com/HaxeFlixel/flixel-demos) 
that contains the demo.

`width` and `height` default to 640 and 480 and should be omitted in that case.

2. Add a screenshot of the demo named `Demo-Name.png` to 
[`/src/files/demos/images`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/images).

3. Add the actual swf file of the demo named `Demo-Name.swf` to 
[`/src/files/demos/swf`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/demos/swf). 
Should be compiled with `FLX_NO_DEBUG` (to show the flixel splash screen) and in release mode if possible!

### How to add a Showcase game

1. Create a `.md` file in 
[`/src/documents/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/documents/showcase) 
following this example:
```
    ---
    layout: showcase
    title: "Go! Go! PogoGirl"
    itch: https://ohsat-andrej.itch.io/go-go-pogogirl
    website: https://www.ohsat.com/game/go-go-pogogirl/
    steam: https://store.steampowered.com/app/1681010/Go_Go_PogoGirl/
    switch: https://www.nintendo.com/store/products/go-go-pogogirl-switch/
    ps4: https://store.playstation.com/en-us/product/UP0891-PPSA10169_00-GOGOPOGOGIRLRATG
    xbox: https://www.microsoft.com/store/productid/9P10H7L6QCCJ
    date: "2-1-2022"
    ---
    
    Note that `date` is currently unused but will eventually be used to sort, dates should use US format of month-day-20XX
    
    Note that by adding a URL to one of the supported targets, the icon will automatically become coloured on the 
    [showcase page](https://haxeflixel.com/showcase) and link to that URL.
```
2. Add a screenshot of the showcase using the same title used in the `*.md` file, e.g. `Go! Go! PogoGirl.png` 
to [`/src/files/images/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/images/showcase). 
They are resized and cropped to 500x260, so it's best to use the same ratio.

Showcases that are not officially released yet are only accepted in special cases. The same is true for games from game jams.

----

## Compile the live site

haxeflixel.com is being hosted from a [static build of docpad](https://docpad.bevry.me/start/deploy). To update the site
run the `compile.sh` or `compile.bat` which uses `docpad generate --env static`.

Note that although both the `run` and `compile` scripts update the `out` folder they are different commands and 
`run` will not create everything the server needs.
