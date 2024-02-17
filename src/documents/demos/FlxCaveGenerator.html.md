---
title: "FlxCaveGenerator"
layout: demo
source: "Platformers/FlxCaveGenerator"
targets: ['flash', 'html5']
---

A demo showing off the capabilites of [FlxCaveGenerator](https://github.com/HaxeFlixel/flixel-addons/blob/master/flixel/addons/tile/FlxCaveGenerator.hx).

Generating a cave for a FlxTilemap is really simple:

```haxe
var caveData:String = FlxCaveGenerator.generateCaveString(Width, Height, SmoothingIterations, WallRatio);
```

The String generated can be used directly in FlxTilemap's `loadMap()` method.

You can use WASD or the arrow keys to move the little character around. :)