```
title: "Pathfinding"
layout: demo
width: 600
height: 400
source: "Features/Pathfinding"
targets: ['flash', 'html5']
```

A port and improvement of the [Pathfinding Demo](https://code.google.com/p/mightiesthero-flash-game-dev-tips/source/browse/FlxPathFinding/src/PlayState.as) by&nbsp;[Bengsiswanto Hendrawan](http://mightiesthero.blogspot.de/)&nbsp;&nbsp;featured on&nbsp;[flixel.org/features](http://flixel.org/features.html).

Pathfinding just means figuring out how to (or if you can) get from A to B. FlxTilemap has a new function FlxTilemap.findPath() which returns a FlxPath object, which is just a collection of "nodes", or FlxPoint objects. Think of it as a list of (X,Y) coordinates in space, going from the starting location to the ending location. Once you have a valid path, you can pass that data to any FlxPath, along with the object it should follow. That function tells the object to start following the path, and you can specify the speed, direction (backward, yoyo, etc), and even tell the object to only follow the path horizontally (handy for objects with gravity applied). These flags mean that you can use paths for more than just character AI - they're also useful for elevators, moving platforms, and looping background animations.&nbsp;
