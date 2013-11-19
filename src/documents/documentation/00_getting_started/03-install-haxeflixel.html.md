```
title: "Install HaxeFlixel"
```

Installing HaxeFlixel is made simple through Haxe's own package manager [Haxelib](http://lib.haxe.org/).

Using [Haxelib](http://haxe.org/doc/haxelib/using_haxelib) will easily let you install and update to the latest stable version of HaxeFlixel.

### Install the Stable Version

You can install the stable version from haxelib from the following command.

``` bash
haxelib install flixel
```


### Development version

Developers maybe interested in installing bleeding edge code on the development git branch, see [instructions here](/documentation/install-development-flixel).

----

<img src="http://haxeflixel.com/images/install-flixel.jpg" style="width:100%;" />

You will notice that haxelib automatically downloads HaxeFlixel for you:

<img src="http://haxeflixel.com/images/flixel-downloading.jpg" style="width:100%;" />

Haxelib will notice the dependency of openfl and may prompt you to install it if you have not installed it yet:

<img src="http://haxeflixel.com/images/flixel-installed.jpg" style="width:100%;" />

----

The latest release version of HaxeFlixel is now on your system you can now start compiling flash and neko out of the box.
To compile to Desktop and Mobile targets you have to make sure you have run the `openfl setup` commands in the previous step.