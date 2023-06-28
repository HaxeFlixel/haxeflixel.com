```
title: "FlxMouseEvent"
layout: demo
source: "Input/FlxMouseEventManager"
targets: ['flash', 'html5']
```

[FlxMouseEvent](https://api.haxeflixel.com/flixel/input/mouse/FlxMouseEvent.html) allows `FlxSprite`s to listen to mouse events like `MouseDown`, `MouseUp`, `MouseOver` and `MouseOut`.

To activate it, simply add sprites and implement the event callbacks:

```haxe
import flixel.input.mouse.FlxMouseEvent;

var sprite = new FlxSprite();
FlxMouseEvent.add(sprite, onMouseDown, onMouseUp, onMouseOver, onMouseOut); 

function onMouseDown(sprite:FlxSprite) {}
function onMouseUp(sprite:FlxSprite) {}
function onMouseOver(sprite:FlxSprite) {}
function onMouseOut(sprite:FlxSprite) {}
```