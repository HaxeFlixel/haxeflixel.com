---
title: "FlxBunnyMark"
layout: demo
tags: ['homepage_demo']
pageOrder: 1
thumb: "FlxBunnyMark.png"
swf: "FlxBunnyMark.swf"
SWFHeight: 480
SWFWidth: 640
---

This is a HaxeFlixel port of the BunnyMark Benchmark. 

The initial BunnyMark was [created by Iain Lobb](http://blog.iainlobb.com/2010/11/display-list-vs-blitting-results.html) (code) and [Amanda Lobb](http://amandalobb.com/) (art), then ported to haxe-NME by [Joshua Granick](http://www.joshuagranick.com/blog/?p=508), then enhanced by [Philippe Elsass](https://github.com/elsassph/nme-bunnymark.), now ported to HaxeFlixel by [BeebleRox](https://github.com/Beeblerox), and improved by [impaler ](https://github.com/impaler)and [Gama11](https://github.com/Gama11).

Flash is limited to software rendering so there is a significant performance improvement when you use cpp targets. Cpp targets make use of drawTiles GPU Acceleration and on a desktop it can display 10 000's of bunnies with additional variations of alpha and scaling. On the flash target however, rendering with alpha and scaling means a severe performance decrease.