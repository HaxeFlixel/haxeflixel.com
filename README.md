[![](https://raw.github.com/HaxeFlixel/haxeflixel.com/master/src/files/images/flixel-logos/haxeflixel.com.png)](https://haxeflixel.com)

[flixel](https://github.com/HaxeFlixel/flixel) | [addons](https://github.com/HaxeFlixel/flixel-addons)
| [ui](https://github.com/HaxeFlixel/flixel-ui) | [demos](https://github.com/HaxeFlixel/flixel-demos)
| [tools](https://github.com/HaxeFlixel/flixel-tools) | [templates](https://github.com/HaxeFlixel/flixel-templates)
| [docs](https://github.com/HaxeFlixel/flixel-docs) | [haxeflixel.com](https://github.com/HaxeFlixel/haxeflixel.com)

[![CI](https://img.shields.io/github/actions/workflow/status/HaxeFlixel/haxeflixel.com/main.yml?branch=master&logo=github)](https://github.com/HaxeFlixel/haxeflixel.com/actions?query=workflow%3ACI)

## About

This is the source of [haxeflixel.com](https://haxeflixel.com/). It was orgiginally made with [DocPad](https://docpad.bevry.me/), but it's in a transition to [11ty](https://www.11ty.dev/).

You can compile this website yourself with an install of DocPad, pull requests are welcome.

1. [Install DocPad](https://docpad.bevry.me/start/install)

2. Clone and run the server

   ```bash
   git clone https://github.com/HaxeFlixel/haxeflixel.com.git
   cd haxeflixel.com
   ```

   To install dependencies and build the site, run the following commands:

   ```bash
   npm install
   npm run start
   ```

3. [Open http://localhost:8080/](http://localhost:8080/)

See [Contributing Code](#contributing-code) for more development information.

<!-- 4. Start hacking away by modifying the `src` directory, the live reload plugin will compile the site as you save
the files you modify. -->

## Contributing documentation (demos and showcases)

If you want to contribute and improve our website please work on a
[fork](https://github.com/HaxeFlixel/haxeflixel.com/fork) or feature branch. Only working and tested changes will
be merged into master. Use the [issue system](https://github.com/HaxeFlixel/haxeflixel.com/issues) for developer
support and approval on your changes.

### How to add Documentation

Documentation for `/documentation` pulled automatically from the [flixel-docs](https://github.com/HaxeFlixel/flixel-docs) repository (via [scripts/install-flixel-docs-repo.js](scripts/install-flixel-docs-repo.js)).
Please review the readme in the [flixel-docs repo](https://github.com/HaxeFlixel/flixel-docs#readme) for more info on updating the haxeflixel.com/documentation pages.

### How to add a demo

1.  Create a `.md` file in
    [`/11ty-source/demos`](https://github.com/HaxeFlixel/haxeflixel.com/tree/deev/11ty-source/demos)
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

### How to add a Showcase game

1. Create a `.md` file in
   [`/11ty-source/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/dev/11ty-source/showcase)
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
    date: "2022-02-01"
    ---

    Dates should use YYYY-MM-DD

    Note that by adding a URL to one of the supported targets, the icon will automatically become coloured on the
    [showcase page](https://haxeflixel.com/showcase) and link to that URL.
```

2. Add a screenshot of the showcase using the same title used in the `*.md` file, e.g. `Go! Go! PogoGirl.png`
   to [`/src/files/images/showcase`](https://github.com/HaxeFlixel/haxeflixel.com/tree/master/src/files/images/showcase).
   They are resized and cropped to 500x260, so it's best to use the same ratio.

Showcases that are not officially released yet are only accepted in special cases. The same is true for games from game jams.

## Contributing code

Along with installing and running commands normally (see [About](#about)), there are other useful commands / workflows.

Everything you need should be installed with `npm install`. Using VSCode you can also install the [recommended extensions](.vscode/extensions.jsonc) for automatic formatting (on file save). However all workflows should be entirely usable via CLI.

### `npm run start`

Running `npm run start` will start up the eleventy site and the sass .scss, and will reload on changes.

### `npm test`

Running `npm test` will run formatting and linting tests for the project. You can simply run `npm test` if you want to run all tests (`test:js`, `test:liquid` and`test:prettier`).

However you can alternatively run each test individually.

- `npm run test:js` will test javascript via [standard](https://standardjs.com/). To automatically fix all, you can run `npm run `npm run fix:js`

- `npm run test:liquid` will test if the site builds via [`eleventy --dryrun`](https://www.11ty.dev/docs/usage/#dryrun-to-do-a-little-testing).

- `npm run test:prettier` will test general styling consistency using [prettier](https://prettier.io/). You can run `npm run fix:prettier` as an easy way to fix inconsistencies.
