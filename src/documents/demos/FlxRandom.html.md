```
title: "FlxRandom"
layout: demo
source: "Performance/FlxRandom"
```

This is simply a collection of functions to test the updated FlxRandom class in HaxeFlixel.

The buttons on the right side of the display can be used to run a series of tests relating to each function of FlxRandom. Most of the tests will run the same function many times for benchmarking purposes. Others will compare the new class to the previous FlxRandom (which is stored in the source folder as OldFlxRandom), the new FlxRandom without inline, or pure Math.random().

Some tests may take some time to run, please be patient. Note that the 15-second script timeout has been overridden and set to 60 seconds.