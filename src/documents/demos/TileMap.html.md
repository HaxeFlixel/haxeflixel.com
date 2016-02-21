```
title: "Tilemap"
layout: demo
width: 400
height: 300
source: "Flixel%20Features/Tilemap"
```

A port and improvement of the [Tilemap demo](https://github.com/LordTim/FlxTilemap-Demo) by [Tim Plummer](https://twitter.com/lordtim) featured on [flixel.org/features](http://flixel.org/features.html).

Flixel's FlxTilemap class was inspired by old video games, in which the environment was constructed using a grid of square "tiles". Each grid cell gets a number, or index, which refers to a particular square graphic. That tile graphic is then placed at the appropriate grid number. Tilemaps have many advantages: it is easy to figure out what tiles should be drawn on screen, what tiles an object overlaps, and what special properties each tile might have. Flixel also includes some built-in algorithms for automatically placing wall tiles and floor tiles based on a simple binary (1s and 0s) array of tile data. It is a simple system with a lot of flexibility, which makes it perfect for rapid prototyping.