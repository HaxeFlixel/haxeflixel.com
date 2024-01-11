---
title: "HaxeFlixel 4.1.0"
layout: blog-post
date: 2016-07-10
---

HaxeFlixel 4.1.0 has just been released to Haxelib (as well as new versions of flixel-addons, ui and demos)! The [full changelog](https://github.com/HaxeFlixel/flixel/blob/4.1.0/CHANGELOG.md) contains a long list of minor improvements and bugfixes.

Unlike previous minor releases, this release is intended to be used as a **drop-in-replacement - there are no significant breaking changes**. If you do encounter any issues, please let us know.

The most exciting addition is probably the ability use GLSL shaders on single sprites and tilemaps (only supported with OpenFL Next and on native targets however). You can test this feature by compiling the `FlxBunnyMark` demo to Cpp or Neko with `-Dnext`:

![](http://haxeflixel.com/images/blog/shadedBunnies.gif)

#### Why Flixel is currently incompatible with OpenFL 4

New major versions of OpenFL and Lime have been released yesterday. Installing Flixel 4.1.0 will also install OpenFL 3.6.1 and Lime 2.9.1 because we have locked it to these versions (although _older_ versions still work).

This was necessary because this major release of OpenFL includes breaking changes that make it non-trivial for Flixel to support:

* the `drawTiles` API has been removed - this is the API used by Flixel for rendering on native targets. There is a replacement API called `Tilemap`, but it doesn't support all features Flixel needs / `drawTiles` did.
* OpenFL Legacy has been removed - not as much of a problem, Flixel has been compatible with OpenFL Next for a while (although still defaulting to Legacy).

Flixel will definitely be compatible with OpenFL 4 in the future, but this will take some time.