---
title: "CollisionAndGrouping"
layout: demo
width: 400
height: 300
source: "Features/CollisionAndGrouping"
---

A port of the [Collision and Grouping demo](https://github.com/TestSubject06/CollisionsDemo) by [Zachary Tarvit](https://twitter.com/TestSubject06) featured on [flixel.org/features](http://flixel.org/features.html).

Game objects in Flixel are can be stored in FlxGroups. Groups can be added to the game state to help automate and organize updating, drawing, collisions, camera control, scroll amounts, and more. When you want to avoid calling resource-intensive functions like FlxG.collide() more than a few times in each game loop, you can use nested groups as a way to simplify those calls. For example, let's say your game objects are divided into three different groups: Apples, Pears, and Bananas. And you want to see if the fruit have landed on the ground yet. You might be tempted to call FlxG.collide() three times: FlxG.collide(Apples, ground); FlxG.collide(Pears,ground); and so on. However, you can create a fourth group, called simply Fruit, and add each of the other groups to it. Then you can just call FlxG.collide(Fruit, ground); and you should see your performance improve notably.
