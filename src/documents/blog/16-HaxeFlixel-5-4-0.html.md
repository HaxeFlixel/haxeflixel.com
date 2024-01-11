```
title: "HaxeFlixel 5.4.0"
layout: blog-post
postDate: "October 2, 2023"
```

We've finally released Haxeflixel 5.4.0, our largest release in quite some time, arguably larger than the 5.0.0 release! This release focuses heavily on assets and animations, like the new FlxAsepriteUtil and the new Multi-Atlas system.

# What took so long?
We try to release new versions of HaxeFlixel around once a month, and have been, for the most part. This one took much longer, the previous version, 5.3.1, was released in early May, that's almost 5 months! The main reason is because we really wanted to get things right, The Aseprite utils, alone, add around 20+ new types and it's not good to release them prematurely, only to rename, reorganize or retool them in a later patch. This ended being a good call, since we did end up iterating on and organizing these utils, later.

Another reason the release was delayed was that George, our lead maintainer finally went on his honeymoon. He didn't feel like touching a computer while visiting his motherland for most of September, with views like this, I'm sure you wouldn't want to either!

<img src="/images/blog/16_release/split.jpg" width="100%" />

# Aseprite Utils
By far the biggest development of HaxeFlixel 5.4.0 is the various tools that utilize [Aseprite's](https://www.aseprite.org/) [atlas exporting](https://aseprite.com/docs/sprite-sheet/#texture-atlases) tools. For those unaware, Aseprite is a very popular animated sprite editor and pixel art tool, we can't recommend it enough for anyone using HaxeFlixel, especially for pixel-art games. The main goal of [FlxAsepriteUtil](https://api.haxeflixel.com/flixel/graphics/FlxAsepriteUtil.html) is to allow devs to define animation data using Aseprite's tags rather than in code.

<img src="/images/blog/16_release/export-sheet.png" width="100%" />

(Made using the [Animated Pixel Adventurer](https://rvros.itch.io/animated-pixel-hero) set by [rvros](https://rvros.itch.io/))

The resulting atlas can easily be applied to a sprite with the following code using the [addAseAtlasTagsByPrefix](https://api.haxeflixel.com/flixel/graphics/FlxAsepriteUtil.html#addAseAtlasTagsByPrefix) or [addAseAtlasTagsByIndex](https://api.haxeflixel.com/flixel/graphics/FlxAsepriteUtil.html#addAseAtlasTagsByIndex) to create an animation for every tag in your .aseprite file.
```haxe
hero = new FlxSprite(50, 50);
hero.loadAseAtlasAndTagsByPrefix("assets/images/adventurer.png", "assets/images/adventurer.json");
hero.animation.play("idle");
add(hero);
```

You can expect more Aseprite focus tools to come now that we've created handy [typedefs for Aseprite atlas metadata](https://github.com/HaxeFlixel/flixel/blob/master/flixel/graphics/atlas/AseAtlas.hx). One future plan is to use Aseprite's [slicing feature](https://www.aseprite.org/docs/slices/) to generate 9-slice data or per-frame hitboxes, but it's much easier for you to use this data to roll your own features, for example to see per-frame slice data on an atlas's labelled "attackRect":
```haxe
var atlasData:AseAtlas = Assets.getText(myAtlasJsonPath);
for (slice in atlasData.meta.slices)
{
    if (slice.name == "attackRect")
    {
        for (key in slice.keys)
        {
            // store per-frame slice data
            trace('frame: ${key.frame} bounds: ${key.bounds}');
        }
    }
}
```

We have immediate plans to utilize more Aseprite fields, such as the tags' "Repeat" and "Animation Direction" fields. You can expect those in the next release (**Update (5.4.1):** this change has been added!).

# Combining Multiple Atlases
This feature was specifically made with our Funkin' devs and modders in mind. As the demand for HD atlases with large amounts of animations increase, their atlas image size grows well beyond the limit that flixel can currently handle. By combining multiple atlases at runtime devs can better compartmentalize their animations, ultimately allowing FlxSprites to have more animations without having to switch graphics every time you change a sprite's animation. Splitting up animations also allows you to load them separately, for instance, if you only need certain animations on certain levels.

This project's art pipeline could really benefit from multi-atlas since each character is made from about a dozen different aseprite files, each with potentially dozens of frames.

<img src="/images/blog/16_release/snowman.png" width="100%" />
(Art by Adam V., you should [hire him](https://twitter.com/Koolboyman/status/1672366422767591424)!)

Here's an example of how to add atlases to another
```haxe
// create an atlas for each file
var idleAtlas = FlxAtlasFrames.fromAseprite('assets/images/snowman-idle.png', 'assets/images/snowman-idle.json');
var jumpAtlas = FlxAtlasFrames.fromAseprite('assets/images/snowman-jump.png', 'assets/images/snowman-jump.json');
var walkAtlas = FlxAtlasFrames.fromAseprite('assets/images/snowman-walk.png', 'assets/images/snowman-walk.json');
var blockAtlas = FlxAtlasFrames.fromAseprite('assets/images/snowman-block.png', 'assets/images/snowman-block.json');

// combine all the atlases by adding to the idle atlas
idleAtlas.addAtlas(jumpAtlas);
idleAtlas.addAtlas(walkAtlas);
idleAtlas.addAtlas(blockAtlas);

// create the FlxSprite
var snowman = new FlxSprite();
snowman.frames = idleAtlas;

// add all the anims
snowman.animation.addByPrefix("idle", "snowman-idle_anim");
snowman.animation.addByPrefix("jump", "snowman-jump_anim");
snowman.animation.addByPrefix("walk", "snowman-walk_anim");
snowman.animation.addByPrefix("block", "snowman-block_anim");

// add it to the state
add(snowman);
```

# Animation Time Scaling
We've added a [timeScale field to FlxAnimationController](https://api.haxeflixel.com/flixel/animation/FlxAnimationController.html#timeScale). This can be used to slow down or speed up animations. For instance, you can change a walk cycle's animation speed to match the sprite's changing movement speed, or you can easily implement a power up or skill that increases attack rate. Here's an example of 4 sprites using different timescale properties whenever the attack animation is played:

<video width="794" height="174" controls="">
  <source src="/images/blog/16_release/anim-time_scale.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

**Update (5.4.1):** We've also added the `timeScale` field to each individual animation, rather than just the animation controller.

# A List of Every Asset
Lastly, we've added the `allFiles` field to classes generated via [FlxAssets.buildFileReferences](https://api.haxeflixel.com/flixel/system/FlxAssets.html#buildFileReferences), AKA: `AssetPaths`. This is just an easy way to iterate or search a list of every asset included in this build. if you don't like the name `allFiles` you can specify a custom name in the `listField` arg of `buildFileReferences`.

<img src="/images/blog/16_release/all_files.png" width="100%" />

# What's Next?
- **More animation tools:** Our goal is to improve upon these tools before jumping on to another big project, so we'd love feedback and suggestions. As mentioned above we already have additions planned for `FlxAseAtlasUtils` and `FlxAnimation`.
- **Improving the Wiki:** We've added new pages to [the HaxeFlixel wiki on Github](https://github.com/HaxeFlixel/flixel/wiki). These are still a work in progress, but once they are fleshed out we'll develop a way to automatically publish them on [haxeflixel.com](https://haxeflixel.com). Some notable pages are:
    - [External Tools](https://github.com/HaxeFlixel/flixel/wiki/External-Tools): This will list all the various tools being developed for HaxeFlixel, unofficially.
    - [Contribution Guide](https://github.com/HaxeFlixel/flixel/wiki/Contribution-Guide): To help people unfamiliar with contributing to open-source software, Git, or Github.
    - [Accessible Contributions](https://github.com/HaxeFlixel/flixel/wiki/Accessible-Contributions): A list of bugs, issues and feature requests that newcomers could easily implement for HaxeFlixel. Mainly things like adding snippets and demos, which are always great to have more of.
- **Flixel 6.0.0:** We still have some minor versions planned to release before the next major version, but we are currently getting all [our ducks in a row](https://github.com/HaxeFlixel/flixel/milestone/13) for it, nonetheless.
- **[Flixel rendering overhaul](https://github.com/HaxeFlixel/flixel/issues/2915):** We're looking for talented devs to revive the important effort of upgrading HaxeFlixel's rendering capabilities. **This is paid work!**
