---
title: "FlxAsyncLoop"
layout: demo
source: "Other/FlxAsyncLoop"
targets: "html5"
---
Demonstration for the `FlxAsyncLoop` class, created by [SeiferTim](http://tims-world.com/) (Tim I Hely).
This utility allows you to setup a loop in a way that still allows `update()` and `draw()` to be called so you can show progress bars or whatever, instead of the game freezing and locking up until the loop has completed.
This demo will generate 5000 random little squares, showing a progress bar as it does so.