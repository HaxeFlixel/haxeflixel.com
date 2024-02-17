---
title: "Tilesheet rendering"
layout: blog-post
postDate: "July 31, 2014"
---

Hi, [gamedevsam](https://github.com/gamedevsam) here, I'm a developer and evangelist of HaxeFlixel.

The following blog post was written by [Beeblerox](https://github.com/Beeblerox) (the original creator of HaxeFlixel) and was originally posted on his blog as a two part article ([part 1](http://beeblerox.tumblr.com/post/87678385538/tilesheet-rendering-part-1) and [part 2](http://beeblerox.tumblr.com/post/87778663958/tilesheet-rendering-part-2-some-details-about-flixel)). In it, he goes into detail on how HaxeFlixel's rendering system is built on top of OpenFL's Tilesheet API.

----------


I want to tell you about tilesheet rendering in flixel, which is used on native targets by default (since some of you might me intereseted in it).

But let’s start from Tilesheet API and how you work with it (Feel free to skip this part if you know it already).

Tilesheet class allows you to draw multiple regions of image in one drawcall reasonably fast. These regions can be transformed (rotated, scaled, skewed) and tinted, plus they can have several blend modes (the most usefull is addition mode, which can be used for effects like fire and smoke).

Let’s assume that you have some image you want to draw - “assets/tiles.png”.

We are starting from instantiation of Tilesheet object:

```
tilesheet = new Tilesheet(Assets.getBitmap(“assets/tiles.png”));
```

Then we should define region of image (or tile) we want to draw. This is achieved with addTileRect() method, which takes 2 arguments:

- the first one is a Rectangle object - it is actual region of image to draw

- and the second one is a Pont object, which define “center” point of a tile. Added tile will be rotated around this point, if we apply rotation transformation to it. This point should be inside of a tile (or it will be bounded), so if you add tile with the size 32x32 pixels and the center at (50; 16), then actual center point will be at (32; 16).

Center point argument is optional, and if you omit it then tile will be rotated around it’s middle point.

```
// adding tiles to the tilesheet
tileID1 = tilesheet.addTileRect(newRectangle(0, 0, 32, 32), new Point(16, 16));
tileID2 = tilesheet.addTileRect(newRectangle(32, 0, 32, 32), new Point(16, 16));
```

Then we should have some Graphics object to draw our tiles on.

```
sprite = new Sprite();
Lib.current.stage.addChild(sprite);
graphicsToUse = sprite.graphics;
```

To draw the tiles on screen we need three things:

1) Graphics to draw then on

2) Draw flag which tells to the program what tile transformations we want to use on our tiles in this drawcall.

The simplest case is no transformation (we just draw rectangular region of image on specified position):

```
drawFlag = 0;
```

You can add tinting:

```
drawFlag |= Tilesheet.TILE_RGB;
```

We can add TILE_ALPHA flag to be able to change tile’s alpha:

```
drawFlag |= Tilesheet.TILE_ALPHA;
```

There are also ```TILE_ROTATION``` and ```TILE_SCALE``` (for uniform tile scaling) constants for “simple” transformations of a tile. But if you want to achieve some more complex transformation (like non-uniform scaling or skewing) then you have ```TILE_TRANS_2x2``` constant.

And finally there are ```TILE_BLEND_ADD``` constant for addition blending and ```TILE_SMOOTH``` for smoothing scaled up graphics.

3) We also need actual information about tile’s type, position and transformation. The second argument of drawTiles() method - data array - is responsible for it.

The amount of data for each tile depends on drawFlags value:

- if drawFlags is 0, then you should specify only tile’s position and id:

```
data = [x1, y1, tileID1, x2, y2, tileID2];
```

- if you’re using uniform scale and rotation then data array will look like this:

```
data = [x1, y1, tileID1, scale1, angle1, x2, y1, tileID2, scale2, angle2];
```

- if you’re adding tinting and alpha:

```
data = [x1, y1, tileID1, scale1, angle1, red1, green1, blue1, alpha1,  x2, y1, tileID2, scale2, angle2, red2, green2, blue2, alpha2];
```

where red, green, blue and alpha are values between 0 and 1 (result color of each pixel will be product of these coefficients and original pixel colors).

- and the most complex case is when you’re using ```TILE_TRANS_2x2```:

```
data = [x, y, tileID1, a, b, c, d, red, green, blue, alpha];
```

where (a, b, c, d) are the transfromation matrix coefficients. You can get their values in two ways:

a) by using Matrix class. For example, if you want to have non-uniform scale and rotation for your tile, then you can get it this way:

```
matrix.identity();
matrix.scale(scaleX, scaleY);
matrix.rotate(angle);
data = [x, y, tileID1, matrix.a, matrix.b, matrix.c, matrix.d, red, green, blue, alpha];
```

b) or manually if you want to make some optimizations. That’s why drawing methods in flixels are so bloated - i just wanted to except some redundant calculations from it.

So finally you can draw your tiles on the screen:

```
tilesheet.drawTiles(graphicsToUse, data, false, drawFlags);
```


----------


If you want to see some working example, then i recommend you to look at Tiles sample project in nme library: [https://github.com/haxenme/nme/tree/master/samples/20-Tiles](https://github.com/haxenme/nme/tree/master/samples/20-Tiles)


----------


Now when we know everything we need about Tilesheet class, it’s time to talk about flixel renderer a bit.

As you remember we need Graphics object to render our tiles. FlxCamera objects contain flashSprite:Sprite variable inside which we have canvas:Sprite which graphics we use for rendering on the camera. We need canvas spite to be nested inside flashSprite for easy camera rotations. So if you don’t plan to implement such feature then you might use just one sprite without nesting.

We also need data to render and render flags, which reflect what types of transformations (like rotation and tinting) apply to rendered tiles. This information is gathered every render cycle: we iterate through each sprite we have in our game. But to keep drawCalls as low as possible we need some sort of batching, which tries to draw everything with the same graphics in one draw call, and when we change graphics it breaks the batch and starts another. This functionality is split between FlxCamera. FlxSprite class and subclasses and DrawStackItem helper class.

DrawStackItem objects store information about current batch: Tilesheet object to use for rendering, draw data array, information about draw flags (do we need to tint our tiles in the batch, or use blending), and the link to next DrawStackItem object (DrawStackItems are organized into linked list). Each camera have _headOfDrawStack variable which is head of DrawStackItems linked list.

FlxSprite draw() method does the following:

- it gets DrawStackItem object to use from current FlxCamera. The result of this operation depends on sprite’s graphics, color and blend mode. So if one of these factors isn’t equal to the properties of current DrawStackItem, then current DrawStackItem will be “finalized” (breaks current batch) and new/empty DrawStackItem will be returned to sprite.

- sprite will add info about itself in current DrawStackItem (positio, tileID, transformation matrix coefficients, tinting and alpha).

After we iterate through all sprites in our game state, game engine start actual render process.

It iterate through each camera, clear graphics of cameras, fill them with background color (with graphics.drawRect() method), and then each camera iterate through its list of DrawStackItems. This iteration stage takes DrawStackItem’s tilesheet, draw data, draw flag and render it with drawTiles() method on camera’s canvas.graphics.

That is how tilesheet rendering works in flixel. Feel free to ask me questions about it.

----------

You can reach Beeblerox on Twitter [@teormech](https://twitter.com/teormech).