---
title: "RPGInterface"
layout: demo
width: 800
height: 600
source: "UserInterface/RPGInterface"
targets: "html5"
---

This is a simple demonstration of the flixel-ui engine in a fictional RPG.

It demonstrates how you can create flixel-ui's from xml layout files, and is also integrated with the [firetongue](https://github.com/larsiusprime/firetongue) localization library. Not only does this do automatic text replacements, but it also lets you specify UI tweaks for each locale. This example uses both English and Norwegian.

The Norwegian text on certain buttons is too long and would wrap in an ugly way without adjustment, so there are several tweaks to extend button widths if the current locale is Norwegian.

flixel-ui has many common UI widgets available, including:

- Buttons (both normal and toggle-able)
- Checkboxes
- Radio button groups
- 9-slice chrome, in both scaling and tiling varieties
- Tabbed menus (which can contain other flixel-ui widgets)