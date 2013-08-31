```
title: "Desktop Targets"
```
//todo




The desktop targets of HaxeFlixel run on all mainstream operating systems, OSX, Windows and Linux. They are all compiled to C++ through the Hxcpp library and are rendered through interfacing with the [Simple DirectMedia Layer.](http://libsdl.org) The code for this part of the library is developed through [NME ](https://github.com/haxenme/NME)which provides dll libs that openfl interfaces with.

The biggest advantage of desktop targets compared to web and mobile is the power of desktop CPU and GPU processors. More complex scenes, physics and number of objects rendered can give a larger creative freedom in the games you create.

Rendering in HaxeFlixel is done through the drawTiles api where OpenGL textures are used through the GPU to render Flixel sprites. The code used natively outperforms runtimes such as the Flash Player and Adobe Air in most circumstances substantially.