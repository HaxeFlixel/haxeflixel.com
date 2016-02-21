```
title: "MouseEventManager"
layout: demo
source: "Input/MouseEventManager"
```

**MouseEventManager** allows FlxSprites to listen to mouse events like MouseDown, MouseUp, MouseOver and MouseOut.

To activate it, simply add sprites to the manager and implement the event callbacks:

```haxe
import flixel.plugin.MouseEventManager;

MouseEventManager.add(new FlxSprite(), onMouseDown, onMouseUp, onMouseOver, onMouseOut); 

function onMouseDown(sprite:FlxSprite) {}
function onMouseUp(sprite:FlxSprite) {}
function onMouseOver(sprite:FlxSprite) {}
function onMouseOut(sprite:FlxSprite) {}
```

Enjoy!