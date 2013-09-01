```
title: "FlxCaveGenerator"
layout: demo
pageOrder: 1
thumb: "FlxCaveGenerator.png"
swf: "FlxCaveGenerator.swf"
SWFHeight: 480
SWFWidth: 640
```

A demo showing off the capabilites of [FlxCaveGenerator](https://github.com/HaxeFlixel/flixel-addons/blob/master/flixel/addons/tile/FlxCaveGenerator.hx).

Generating a cave for a FlxTilemap is really simple:

<pre class="brush:hx;" contenteditable="false">
var caveData:String = FlxCaveGenerator.generateCaveString(Width, Height, SmoothingIterations, WallRatio);
</pre>

The String generated can be used directly in FlxTilemap's loadMap() method.

You can use WASD or the arrow keys to move the little character around. :)