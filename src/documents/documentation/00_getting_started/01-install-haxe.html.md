```
title: "Install Haxe"
```

The Haxe Toolkit is available from [haxe.org](http://haxe.org/download) for Windows, Linux and Mac.

[Download the Haxe Installer](http://haxe.org/download)

Here is what the installer will look like on Mac and Windows:

<img src="http://haxeflixel.com/images/install-haxe-osx.png" style="width:100%;" />

<img src="http://haxeflixel.com/images/install-haxe-windows.png" style="width:100%;" />

### Test Haxe

For a simple test to see if Haxe is now working on your system, open a new terminal window and type:

``` bash
haxe
```

You should see the following:

<img src="http://haxeflixel.com/images/haxe-mac.png" style="width:100%;" />

<img src="http://haxeflixel.com/images/haxe-windows.png" style="width:100%;" />

## Haxelib

When you install Haxe you also get Haxe's own package manager and utility called [HaxeLib](http://lib.haxe.org/).

Please make sure you are running the latest version with the self update command:

``` bash
haxelib selfupdate

// Notice the prompt tells you to now run:
haxe upgrade.hxml
```

You can see more of how to use [Haxelib here](http://haxe.org/doc/haxelib/using_haxelib) and browse community Haxe libraries on the [official site](http://lib.haxe.org/).


## Upgrading haxelib

If you're upgrading from a haxe 2.10 install, you need to uninstall haxe as well as remove the haxelib folders, in windows you will find them in ```(C:\MotionTwin\...)```.