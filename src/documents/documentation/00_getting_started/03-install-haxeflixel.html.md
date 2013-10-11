```
title: "Install HaxeFlixel"
```

Installing HaxeFlixel is made simple through Haxe's package manager Haxelib.
Using [Haxelib](http://haxe.org/doc/haxelib/using_haxelib) will let you install the latest stable version of HaxeFlixel.

### Development version

Developers maybe interested in installing bleeding edge code on the development git branch, see [instructions here](/documentation/install-development-flixel).
We caution use of this branch as it may not have the same amount of testing as the stable version.

### Install the Stable Version

You can install the stable version from haxelib from the following command.

```
haxelib install flixel
```

----

![](/images/install-flixel.jpg)

You will notice that haxelib automatically downloads HaxeFlixel for you:

![](/images/flixel-downloading.jpg)

Haxelib will notice the dependency of openfl and may prompt you to install it if you have not installed it yet:

![](/images/flixel-installed.jpg)


----

The latest release version of HaxeFlixel is now on your system you can now start compiling flash and neko out of the box.
To compile to Desktop and Mobile targets you have to make sure you have run the `openfl setup` commands in the previous step.