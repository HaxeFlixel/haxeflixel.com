```
title: "Blog Posts are Back"
layout: blog-post
postDate: "June 1, 2023"
```

Hello everyone! George, here, gladly announceing the return of the HaxeFlixel blog after a long hiatus. While there have been many ongoing changes to the HaxeFlixel framework, we've sadly neglected to broadcast those changes on the website. Let's take this time to get everybody up to speed with all we've done these last 3 years.

# What's New?
Since [the last release blog post](https://haxeflixel.com/blog/12-HaxeFlixel-4-4-0/), we have released 24 new versions of HaxeFlixel! There's too many changes to go over in just one blog post, so if you're far behind, be sure to look at [the changelog](https://github.com/HaxeFlixel/flixel/blob/dev/CHANGELOG.md) for details on every release. I do want to go over some big milestones from these past few years.

## Flixel 5.0.0
HaxeFlixel's first major release in over 6 years! Be sure to check out the [Migration Guide](https://github.com/HaxeFlixel/flixel/wiki/Flixel-5.0.0-Migration-guide) for more info on the bigger changes as well as info on how to upgrade your old projects from version 4. Here's a brief list of the changes ([the changelog](https://github.com/HaxeFlixel/flixel/blob/dev/CHANGELOG.md#500-alpha-november-19-2022) has them all, of course)

### FlxPoint absorbed FlxVector
Most people never knew we had a FlxVector class with a bunch of incredibly handy math operations, so we moved them all into FlxPoint.

### Collision Improvements
One small tweaks to preserve momentum and a new feature that let's objects ride other non-immovable objects.
<video width="320" height="240" controls>
  <source src="images/blog/15_blogs_back/platforming.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
The dirty minds following us on [Twitter](https://twitter.com/HaxeFlixel/status/1600844100923961344) got really excited about this.

### Pathfinding Overhaul
Create custom pathfinders.

<img src="/images/blog/15_blogs_back/pathfinding.png" width="100%" />

### AssetPaths and FlxSave Overhaul
Hard to express with pictures, but AssetPaths is actually usuable now! And FlxSave allows you to use custom directory locations

## Who's George?
It's about time I formally introduced myself. My name is George Kurelic and I've been the lead maintainer of HaxeFlixel since around January 2022. I've used Flixel since the flash days, but I've only started making contributions to HaxeFlixel in late 2018. While I have enourmous shoes to fill, I'm very passionate about open source software, and gamedev, and I have a lot of plans for the framework. You can usually find me in [the #flixel channel of the Haxe Discord server](https://discordapp.com/invite/rqEBAgF)

# What's next?
Get used to seeing more blog posts if you wanna see what's cookin, but here's what is currently planned

[Flixel 5.4.0](https://github.com/HaxeFlixel/flixel/milestone/14) is mostly finished, which is planned to have the abilty to combine altases from separate images, which should make it easier for FNF mods with huge hd character assets.

We haven't decided which of these features we'll put in 6.0.0, but many large changes are planned, such as:
 - [Animation Frame Events](https://github.com/HaxeFlixel/flixel/issues/2816)
 - [Expanding Collider Shapes](https://github.com/HaxeFlixel/flixel/issues/2716)
 - [Take a function in FlxG.switchState](https://github.com/HaxeFlixel/flixel/issues/2541)
 - [Expanding FlxBitmapText](https://github.com/HaxeFlixel/flixel/issues/2717)
 - [Record Gamepad and Touch Events in FlxReplay](https://github.com/HaxeFlixel/flixel/issues/2828)
 - [Improving FlxBitmapText](https://github.com/HaxeFlixel/flixel/issues/2717)