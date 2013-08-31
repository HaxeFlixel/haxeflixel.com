```
title: "HaxeFlixel 3.x"
```

//todo

 

HaxeFlixel has always been a project to improve on what Flixel is and bring new life to the code where Adam Atomic has left it in Actionscript 3. By choosing OpenFL and Haxe we have given new opportunities to Flixel projects and with HaxeFlixel 3.0 we have also evolved the Flixel API itself.

The strongest criticism we have seen for Flixel has been a description of the codebase as "bloated" and it lack of documentation. Each of these criticisms has been taken on board and we are happy to share we have significant progress on each.


#### What happened to HaxeFlixel 2.0?

With the API changes we believe it only makes sense to avoid confusion for legacy Flixel 2.55 users no to expect the same API for the latest release of HaxeFlixel. Instead 3.0 is an evolution of the original Flixel api with a focus on logic names and structure that makes more sense to the end user a more sensible package structure which should make it more easier to maintain.





#### So what has changed, is Flixel still bloated?

Flixel has always a large collection of useful code to build many game types quickly and easily without reinventing the wheel each time. In this sense Flixel will always be a large codebase, however we believe Flixel is now more organized and logical. Let us explain why.




### Our new main Github repositories


#### Flixel Addons

#### Flixel Templates

#### Flixel Demos









 

However big the changes which there are many, it is still easy for existing Flixel users to learn and adopt. With our users in mind we have a project to assist you in updating old code. This tool is mostly a simple Find and Replace script that will ..............




#### HaxeFlixel documentation

Documentation is an ever going process as a project continues to evolve and people start using the code in new interesting ways. This website now includes a solid start on documentation for beginners in the wiki section. These pages are open for the community to edit and add their own pages to. Our Snippets are now part of this wiki and we encourage people to continue adding and improving the to this resource.



### Upgrade Guide

Please review our upgrade guide for detailed steps on updating your HaxeFlixel 2.x projects.


### Whats next for Flixel?

Github issues, experimentation, html5?








 

#### Namechanges

Link to flixel-tools script

link to flixel-tools find and replace

#### Flixel system Assets are now in core

Remember that folder of Flixel assets in ./assets/data/* well you dont need that in your projects anymore. Using the OpenFL include.xml option for projects we now have all the core assets with the core code of Flixel. This lets us update the assets easier and lets your projects be less cluttered. Also the filesize of our flixel-demos repository was reduced :)

What happened to 'haxelib run flixel new' ?

This command has served us well however we have decided to remove it from core to enable a more flexible command line utility in flixel-tools. 

................

 

 


.................