```
title: "Mouse Event Manager"
layout: demo
tags: ['homepage_demo']
pageOrder: 1
thumb: "MouseEventManager.png"
swf: "MouseEventManager.swf"
SWFHeight: 480
SWFWidth: 640
```

**MouseEventManager** allows FlxSprites to listen to mouse events like MouseDown, MouseUp, MouseOver and MouseOut.

To activate it, simply add sprites to the manager and implement the event callbacks:

	import flixel.plugin.MouseEventManager;

	MouseEventManager.addSprite(new FlxSprite(), onMouseDown, onMouseUp, onMouseOver, onMouseOut); 

	function onMouseDown(sprite:FlxSprite) {}
	function onMouseUp(sprite:FlxSprite) {}
	function onMouseOver(sprite:FlxSprite) {}
	function onMouseOut(sprite:FlxSprite) {}

Enjoy!