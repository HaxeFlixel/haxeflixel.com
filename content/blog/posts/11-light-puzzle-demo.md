---
title: "FlxLightPuzzle Demo"
layout: blog-post
date: 2018-03-28
---

We have a new demo made by yours truly [Nick](https://twitter.com/MSGhero16): a puzzle game of reflecting light and combining colors. Featuring...

### FlxLightPuzzle Demo

<img src="/images/blog/11_light/flp_logo_594x382.png" width="100%" />

In addition to being a [fully playable game](https://www.newgrounds.com/portal/view/705467), the FlxLightPuzzle Demo heavily features the [FlxVector class](https://api.haxeflixel.com/flixel/math/FlxVector.html). Vector math is a nightmare, and I was actually surprised to see how much of it FlxVector handles for you.

The source code is [here](https://github.com/HaxeFlixel/flixel-demos/tree/master/Arcade/FlxLightPuzzle), which you're free to look at and edit to make your own version of the game. Maybe you add more levels, real graphics, or more obstacles that the player has to solve around. I'll leave that to you.

### Development and design decisions

I think color-based mechanics and reflection-based mechanics are super cool, and that's about all the backstory there is. The graphics are simple shapes ([FlxSpriteUtil](https://api.haxeflixel.com/flixel/util/FlxSpriteUtil.html)) to avoid any fuss about art, and the [music](https://www.newgrounds.com/audio/listen/755011) is a random find that I happened to enjoy (used with permission, of course).

<img src="/images/blog/11_light/flp_menu.png" width="100%" />

You'll quickly notice that you can play the game in RBY, RGB, or CMY color spaces. I couldn't really decide whether RBY+orange/green/purple or RGB+yellow/cyan/magenta would be better to play in. On one hand, you have the "normal" primary colors that everyone is used to; on the other, there are the "correct" primary colors for light. So I added both, and CMY for anyone in the printing business playing the game.

<img src="/images/blog/11_light/flp_level4.png" width="100%" />

On the third level, you learn that you can mix primary colors to hit secondary targets. On the fourth (my favorite), you learn that secondary colors can't hit primary targets. It wasn't always like that! I asked a number of people who said that it lessened the challenge if, say, green light could hit yellow targets. When that mechanic was changed, I thought that made level four impossible to solve. It was pure coincidence that it resulted in clever level design.

Iterating to improve is a big part of level design. I've played through each level dozens of times now, fiddling with numbers and colors until I got to a pretty good result. The first and last levels haven't changed since day one — and you'll see why when you play through — but the middle eight have been through a lot. I still have fun every time I play, even if I can (almost) play through the whole thing without any do-overs. I call that a success.

### The code

You are free to do whatever you want to the code under the MIT license. There are a number of things to learn from, such as vector math, object pooling, subtle tweening effects, physics and optics, and level data files. I added way more comments than I normally do to describe some of that. If you want to keep it simple, though, editing the levels or adding new ones is your best bet. There are a lot of places the code can go, and I limited the scope of the demo so that you could be creative with a solid foundation.

So, go be creative! Don't forget to check out the other demos as well. There is plenty to learn from. I'll be back soon with a look at a [UI library](https://github.com/haxeui/haxeui-flixel) that recently got Flixel support.

Stay tuned.
