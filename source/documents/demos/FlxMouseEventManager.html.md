```
title: "FlxMouseEventManager"
layout: demo
source: "Input/FlxMouseEventManager"
targets: ['flash', 'html5']
```

`FlxMouseEventManager` allows `FlxSprite`s to listen to mouse events like `MouseDown`, `MouseUp`, `MouseOver` and `MouseOut`.

To activate it, simply add sprites to the manager and implement the event callbacks:

```haxe
import flixel.input.mouse.FlxMouseEventManager;

var sprite = new FlxSprite();
FlxMouseEventManager.add(sprite, onMouseDown, onMouseUp, onMouseOver, onMouseOut); 

function onMouseDown(sprite:FlxSprite) {}
function onMouseUp(sprite:FlxSprite) {}
function onMouseOver(sprite:FlxSprite) {}
function onMouseOut(sprite:FlxSprite) {}
```