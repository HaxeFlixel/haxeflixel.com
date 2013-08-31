```
title: "Install OpenFL"
```

Installing OpenFL is best done through Haxe's own package manager utility called Haxelib. Every Haxe installation will have a working version installed. Using Haxelib is simple and OpenFL can be installed through the following commands.

```
haxelib install openfl
```

You will notice the output of the command line explaining the progress of the installation.

The next step is to use the setup command of OpenFL by the following command:

```
haxelib run openfl setup
```

## Setup

Some targets are self-sufficient, but others require additional tools before they can be used

    openfl setup windows
    openfl setup android
    openfl setup blackberry

There is no "setup" command for Emscripten right now. You can follow the install instructions for Emscripten at https://github.com/kripken/emscripten/wiki/Tutorial

## Samples

You can see the available samples:

    openfl create

Then you can create a copy of a sample, like this:

    openfl create DisplayingABitmap

Then you can build and run:

    openfl test DisplayingABitmap flash

_(You can also skip the project path if you change to the same directory)_

These are some of the targets that are available:

    openfl test windows
    openfl test windows -neko
    openfl test mac
    openfl test mac -neko
    openfl test linux
    openfl test linux -neko
    openfl test ios
    openfl test ios -simulator
    openfl test android
    openfl test blackberry
    openfl test blackberry -simulator
    openfl test flash
    (beta) openfl test emscripten
    openfl test html5

When you are ready to begin your own project, this can help:

    openfl create project NameOfYourProject

## Help

You can learn more about available commands using:

    openfl help

For more help, contact [@singmajesty](http://www.twitter.com/singmajesty) on Twitter.