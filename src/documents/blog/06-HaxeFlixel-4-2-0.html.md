```
title: "HaxeFlixel 4.2.0"
layout: blog-post
postDate: 10-11-2016
```

We've just released HaxeFlixel 4.2.0! There are a lot of small additions and improvements, like exposing the [`length`](http://api.haxeflixel.com/flixel/system/FlxSound.html?#length) of `FlxSound` objects or allowing you to configure their [`endTime`](http://api.haxeflixel.com/flixel/system/FlxSound.html?#endTime).

Apart from that, we also fixed a lot of bugs and took care of some old annoyances, like not being able to control which tweens or timers are paused when entering a substate (see [#1934](https://github.com/HaxeFlixel/flixel/pull/1934) for a detailed explanation + usage example). This is also one of the improvements that caused [some minor breaking changes](http://haxeflixel.com/documentation/upgrade-guide-4-0-0/).

The debugger overlay became [even more powerful](https://github.com/HaxeFlixel/flixel/pull/1862) (and can now be opened with `F2`):

![](http://haxeflixel.com/images/blog/debuggerInteraction.gif)

You can find the full changelog [here](https://github.com/HaxeFlixel/flixel/blob/4.2.0/CHANGELOG.md).

Thanks to everybody who contributed to this release in any way!

#### What happened to OpenFL 4 support?

Don't worry, it's still coming! There are two reasons why it's not a part of 4.2.0:

- It's simply [not quite finished yet](https://github.com/HaxeFlixel/flixel/pull/1940) - we didn't want to delay the release of 4.2.0.
- We wanted to have another really stable release before making such major changes to the rendering system.

We're aiming to have support for OpenFL 4 starting with the next minor release (4.3.0).