---
title: "Replay"
layout: demo
width: 400
height: 300
source: "Features/Replay"
---

A port of the [Replay demo](https://github.com/guoboism/Flixel_Replay_DEMO/) by [Guoboism](https://github.com/guoboism)&nbsp;featured on&nbsp;[flixel.org/features](http://flixel.org/features.html)..

Replays are a powerful new feature in Flixel. Replays are essentially a list of what keyboard keys were pressed, and what mouse inputs were given, during a specific time frame. Because Flixel is largely deterministic, we can use that information to recreate a gameplay session that someone else recorded, as long as we have the same SWF. Replays can be used for debugging, arcade-style "attract modes" or in-game demos, and even for cutscenes. Replays can be manipulated using the "VCR" panel on the debugger overlay, or directly through functions like FlxG.vcr.loadReplay(), FlxG.vcr.startRecording(), and FlxG.vcr.reloadReplay(). Adventurous game makers can also check out the more complex Mode source code to see an example of loading a replay from a file to create an "attract mode".&nbsp;
