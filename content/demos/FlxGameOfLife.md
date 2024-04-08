---
title: "FlxGameOfLife"
layout: demo
source: "Other/FlxGameOfLife"
targets: "html5"
---

This is a demonstration of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) recreated in HaxeFlixel.

Every 'step' in the simulation, every cell in the grid is checked, and the following rules are applied to the next generation:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
1. Any live cell with two or three live neighbors lives on to the next generation.
1. Any live cell with more than three live neighbors dies, as if by overpopulation.
1. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
