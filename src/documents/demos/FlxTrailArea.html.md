```
title: "FlxTrailArea"
layout: demo
pageOrder: 1
SWFHeight: 480
SWFWidth: 640
source: "Effects/FlxTrailArea"
tags: ['homepage_demo']
```

This demo shows the effects that can be accomplished with [`FlxTrailArea`](https://github.com/HaxeFlixel/flixel/blob/dev/flixel/effects/FlxTrailArea.hx). 
For every `FlxSprite` that is added to the area, a trail effect will be rendered on the area. It's more efficient than a regular `FlxTrail` due to the fact that it only uses a single bitmap.