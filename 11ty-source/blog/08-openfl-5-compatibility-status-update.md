---
title: "OpenFL 5 compatibility status update"
layout: blog-post
postDate: "May 13, 2017"
---

Hey, Beeblerox here!

As you may know, HaxeFlixel is currently stuck with outdated versions of OpenFL and Lime due to some rendering incompatibilities, and updating it has turned out to be more work than expected. I want to give you a quick status update regarding my work towards making Flixel compatible with the latest versions of OpenFL again.

**Note:** I've switched to working on a new branch and closed the [previous pull request](https://github.com/HaxeFlixel/flixel/pull/2032). You can follow my progress in the new pull request [here](https://github.com/HaxeFlixel/flixel/pull/2068).

### FlxMaterial

I've added a `FlxMaterial` class (see [here](https://github.com/Beeblerox/flixel/blob/939a61d8f5b5e952324cdc5b80a1de3f13952956/flixel/graphics/FlxMaterial.hx)). Currently, it's just a single render-pass material with multiple textures support. This enables more complex effects like 2D-lighting (by using normal maps generated with tools like [SpriteIlluminator](https://www.codeandweb.com/spriteilluminator)). I've updated the [flixelighting lib](https://github.com/Pixelbear/flixelighting) by [Pixelbear](https://github.com/Pixelbear) to make it work with the new material system on my fork [here](https://github.com/Beeblerox/flixelighting/tree/FlxMaterial/lighting).

Here is an example of how it can be used right now:

```haxe
// create regular sprite
shadedWall = new FlxSprite(100, 200, "assets/rock.png");
add(shadedWall);
// create custom lighting material and apply to our sprite
lightMaterial = new FlxLightingMaterial();
teapot.material = lightMaterial;
// tune light material properties
lightMaterial.setAmbient(FlxColor.YELLOW, 0.2);
// add light source
light = new FlxLight(0, 0, 0.3);
light.lightColor = FlxColor.WHITE;
add(light);
lightMaterial.addLight(light);
// and create normal map and apply it to our material
var normalMap:FlxNormalMap = new FlxNormalMap(0, 0, "assets/rock_n.png");
lightMaterial.addNormalMap(normalMap);
```

And here is the result:

![](/images/blog/openfl5/lighting.jpg)

Now a few more details about sprite materials.

Each sprite, tilemap, etc. now has a `material:FlxMaterial` property. A material stores information about an object's blend mode, smoothing, shader to use, data for the shader (values of shader uniforms) and an array of textures to use. So when you do `sprite.blend = BlendMode.ADD;`, in reality you change the blend mode _of its material_.

By default, objects have materials without shaders (shader is `null`), which means that the renderer will use default shader and batch this object. If you do set a material's shader property, then the material will create a data object (`openfl.display.ShaderData`) to store info about shader uniforms which you could set later. Say your shader has a `uFill` uniform after setting `material.shader = myCustomShader`, you can set the value of this uniform like this:

```haxe
material.data.uFill.value = [0.5];
```

Setting a material's shader you will break the batch, but if several sprites share the same material, then they will be batched together again.

The material class also has a `batchable:Bool` property which is `true` by default. This means that the renderer will try to batch objects with this material. But in case you have many sprites with different materials and you want them _not_ to be batched (to minimize the amount of data which will be reuploaded to the GPU), you could set it to `false` to force this behavior (`sprite.material.batchable = false;`).

### Multipass

For more complex effects which require multi-pass rendering, I've added `FlxRenderTarget` which extends the `FlxSprite` class. Basically it's the same as a `FlxSprite`, but you can render other sprites to its texture through underlying OpenGL calls (not with BitmapData's `draw()` method). I took the idea from [Phaser's RenderPass object](https://github.com/photonstorm/phaser/blob/master/v3/src/gameobjects/renderpass/RenderPass.js), which has a very simple API. Here is a usage example for it:

```haxe
// create render target with the size of 256 by 512 pixels
var renderTexture:FlxRenderTarget = new FlxRenderTarget(256, 512);
// specify camera which will be used for calculation of drawable sprites positions on this render texture.
renderTexture.renderCamera = FlxG.camera;
add(renderTexture);
// set object's renderTarget, so it will be rendered only on its texture and won't appear on any camera.
teapot.renderTarget = renderTexture;
// set render pass shader.
renderTexture.shader = myCustomShader;
```

### Camera buffers

Since the first iteration of the new renderer I've changed a lot of things. The biggest of them is the way objects are rendered to the camera and to the screen. Now, each camera has its own render texture to which all object are rendered, and then this texture is rendered to the screen.

![](/images/blog/openfl5/cameraBuffers.jpg)

This way of rendering helps minimize the number of array iterations, and also made it much easier for other features to be implemented (such as the `FlxRenderTarget` class).

### Debug rendering

I was disappointed by the performance of `drawDebug` rendering on native targets, so I've redone it and now it uses OpenGL instead of OpenFL's `Graphics` API.

![](/images/blog/openfl5/drawDebug.jpg)

### drawTriangles()

Last weekend I was busy with rewriting the `FlxStrip` and `FlxTrianglesData` classes. They are responsible for rendering complex meshes having hundreds of vertices.
As you may know, `FlxStrip` is a subclass of `FlxSprite`. It's only purpose was to call the `drawTriangles()` method with `vertices`, `uvs`, `indices` and `colors` arguments specified by the user. Now, it's become much more flexible and easier to use for prototyping. 
Each `FlxStrip` object has a `data:FlxTrianglesData` property which stores information about added vertices. In addition to getters and setters for `vertices`, `indices`, etc., it now has utility methods for adding a single vertex and a single triangle:

```haxe
var data:FlxTrianglesData = mySprite.data;
// set vertices info in old way
data.vertices = Vector.ofArray([0.0, 0.0, 100.0, 0.0, 0.0, 100.0]);
data.colors = Vector.ofArray([FlxColor.RED, FlxColor.GREEN, FlxColor.BLUE]);
data.indices = Vector.ofArray([0, 1, 2]);
// and you can add it new way
data.start();
data.addVertex(200, 300, 0, 0, FlxColor.RED);
data.addVertex(300, 300, 0, 0, FlxColor.GREEN);
data.addVertex(200, 400, 0, 0, FlxColor.BLUE);
data.addTriangle(0, 1, 2);

// plus you can change data of individual vertex 
data.setVertex(0, newX, newY, 0.0, 0.0, newColor);
```

This new API allows to minimize the iterations through inner data arrays which will be uploaded to GPU, which should result in a noticeable performance improvement.
I also borrowed HaxePunk's code for GPU-accelerated rendering of graphics primitives ([`Draw` class](https://github.com/MattTuttle/HaxePunk/blob/draw-hardware/haxepunk/utils/Draw.hx)) and adapted it to Flixel, so there is new `FlxDraw` class for rendering lines, rectangle, circles, polygons and curves.

![](/images/blog/openfl5/drawTriangles.png)

### Next steps

Next, I'll start updating the flixel-addons classes and demos. Meanwhile, I'd be happy about any feedback you have for me - please post it in the [OpenFL 5 compatibility pull request](https://github.com/HaxeFlixel/flixel/pull/2068)!