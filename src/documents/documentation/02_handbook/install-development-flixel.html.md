```
title: "Install development Flixel"
```

For some of the sample projects contained in the flixel-demo repository, such as the breakout demo,&nbsp; one will need to use the latest flixel snapshot from git.&nbsp; In this short tutorial I will detail the steps needed to correctly install the latest flixel with haxelib.

**Prerequisites**

You must have completed the following Getting Started tutorials:

1.  [Installing Haxe](http://www.haxeflixel.com/wiki/installing-haxe)
2.  [Installing OpenFl](http://www.haxeflixel.com/wiki/installing-openfl)

HaxeLib lets you have multiple versions of a library like Flixel installed at a time.
If you want to remove the one you have currently installed type:

```
haxelib remove flixel
```

You can see the versions of Flixel and other HaxeLib packages like OpenFL with the following command:

```
haxelib list
```

**Update haxelib**

In some cases, your haxelib is not up-to-date. This can cause problems when trying to download the latest flixel snapshot from git. In order to update haxelib, please type in the following command into your console

```
haxelib selfupdate
```

![console screen of haxelib selfupdate](http://s18.postimg.org/r86v2iw3d/haxelib_selfupdate_1.png)

You should be prompted to run the update.hxml. Just type in the command as it's on the screen

```
haxe update.hxml
```

**Install flixel from git**

Now you are ready to obtain the newest version. Please input the following command into your console

```
haxelib git flixel https://github.com/HaxeFlixel/flixel
```

**Testing your new flixel with the breakout demo**

Everything is setup and just giddy to run those juicy 3.0 demos :) Let's not make 'em wait! Grab the flixel-demo repository and navigate to 'Demos/flixel-demos/Arcade Classics/Breakout'. Start the game by writing

```
openfl test neko
```

or

```
openfl test flash
```

**Need more help?**

If there are any unanswered questions (such as how to checkout the flixel-demos), please feel free to write a comment!