```
title: "SplitScreen"
layout: demo
width: 400
height: 300
source: "Flixel%20Features/SplitScreen"
```

A port and improvement of the [Split Screen demo](https://github.com/phmongeau/SplitScreen) by [Philippe Mongeau](https://twitter.com/phmongeau) featured on [flixel.org/features](http://flixel.org/features.html).

One of the new features in Flixel is the introduction of a flexible and powerful camera class called (unsurprisingly) FlxCamera. By default, a new Flixel game project starts with one camera that is the same size as the Flash Player window, which can be referenced at FlxG.camera. You can replace that camera or add additional cameras to create effects like "split screen" views, or "picture in picture" style displays, or even mini-maps. 

Each camera is an independent display object, with its own zoom, color tint, rotation, and scaling values. Finally, each game object maintains its own camera list, so you can easily instruct certain objects to only display on certain cameras. Adventurous game makers can also check out the more complex Mode source code for more ways to use cameras in-game.