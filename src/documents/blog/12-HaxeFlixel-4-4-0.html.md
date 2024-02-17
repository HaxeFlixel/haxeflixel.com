---
title: "HaxeFlixel 4.4.0"
layout: blog-post
postDate: "May 4, 2018"
---

HaxeFlixel 4.4.0 is now available on Haxelib, adding **support for OpenFL 8** and Lime 6.3.0! [Breaking changes](/documentation/upgrade-guide-4-0-0/) are mostly limited to blend modes and a slightly different shader syntax. Additionally, 4.4.0 is still fully-backwards-compatible with OpenFL 3.6.1 legacy or next, so even if you don't plan on upgrading to OpenFL 8 just yet, don't let that stop you from taking advantage of the [other fixes and improvements in the 4.4.0 release](https://github.com/HaxeFlixel/flixel/blob/4.4.0/CHANGELOG.md).

OpenFL ~~5~~ ~~6~~ ~~7~~ 8 support has been long-awaited. OpenFL 3.6.1 is still working fine for many people, so why be excited about this? Well, there's many reasons:

- HTML5 support in OpenFL 8 is vastly improved. WebGL is now the default renderer, which also means - GLSL shaders by default:

  <br/>
  <iframe class="html5-demo" src="/demos/html5/Filters" width="640" height="480"></iframe>
  <br/>

  Check out the [demos page](/demos), we've updated all of them with OpenFL 8 builds so you can see the improvements in action.
- We can now take advantage of all the fixes and improvements that happened between OpenFL 3.6.1 and OpenFL 8 - this has already meant that tens of old issues could be closed across the issue trackers of Flixel repositories.
- OpenFL 3.6.1 will eventually stop working with latest Haxe - there's already some minor compiler errors with the latest Haxe development branch. A similar issue exists in the Android world, with Ant being switched out for Gradle as the build tool. Latest HXCPP was also causing some trouble.
- Latest OpenFL enables HaxeFlixel to use the HashLink target in the future, [once support for it is implemented in Lime](https://github.com/openfl/lime/milestone/18). If you haven't heard about [HashLink](https://hashlink.haxe.org/), it's a new Haxe target and VM that's Neko's spiritual successor, but *much* faster. It has amazing features such as [source-level debugging](https://marketplace.visualstudio.com/items?itemName=HaxeFoundation.haxe-hl) and native C compilation.

Since these reasons have surely managed to excite you as much as us, what else do you need to know about OpenFL 8? Here's a few things:

- The Neko target *will* be considerably slower in OpenFL 8. This is because more of OpenFL is written in Haxe now, whereas there was a large native / C++ component in 3.6.1 / legacy. Until HashLink support becomes a reality, you may want to consider retiring Neko as your "fast-to-compile"- / default test target in favor of HTML5. With WebGL, it is now very close to HXCPP builds when it comes to rendering.
- There are some [known remaining issues](https://github.com/HaxeFlixel/flixel/issues/2143) that will be worked out in future OpenFL and Flixel releases. If you find any more, please let us know!
- OpenFL 8 and HaxeFlixel 4.4.0 is best used with Visual Studio Code and the Lime extension. We have a [comprehensive guide](/documentation/visual-studio-code/) to help you with setting it up and how you can debug the HTML5 and Flash targets.
- The easiest way to update is to run `haxelib upgrade`. Alternatively, you can run `haxelib update` manually on the different libraries.

Finally, a huge thanks goes to [Joshua Granick](https://twitter.com/singmajesty), the maintainer of OpenFL. He invested *a lot* of time to make sure that this transition can happen smoothly. The [fairly short diff](https://github.com/HaxeFlixel/flixel/pull/2136/files) of the pull request on the Flixel end of things doesn't begin to do all the behind-the-scenes improvements and bugfixes that happened in OpenFL and Lime justice!

That's all for now. If you have any more questions, [get in touch with the community](https://haxeflixel.com/documentation/community/). Keep on making awesome games!

  *\- The HaxeFlixel team*

P.S. Don't forget to check out the [livestream of the Haxe US summit](https://summit.haxe.org/us/2018/#stream) that is going on right now!