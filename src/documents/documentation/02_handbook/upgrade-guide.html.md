```
title: "Upgrade Guide"
```

##HaxeFlixel 3.0

HaxeFlixel 3.0 is an evolution of the original Flixel api and while most of the API is very similar and quickly learnt, it requires some renames and modifications to update your code. 

In an effort to help with this process there is a find and replace convert command included with the Flixel Tools. You can see what it replaces here.

## Solving upgrade issues

### FlxSprite errors

### FlxG.keys errors

## FrontEnds and the FlxG refactor

Frontends in HaxeFlixel 3.x are a new structure to the core of Flixel and which tackles the often criticized bloated collection of static methods in FlxG.

Frontends are accessed in `FlxG.fontend` in a similar fasion to what Flixel devs are used to. Careful thought has been given to organise them into logical shortcuts. This way the api will be easier browse, remember and maintain.

For example in HaxeFlixel 2.x to add a `FlxCamera` you would use `FlxG.addCamera(camera:FlxCamera);`, this `addCamera` method has been moved into a `camera` frontend with all the other `camera` related shortcuts.
So the code in HaxeFlixel 3.x to add a `FlxCamera` is now `FlxG.cameras.add(camera:FlxCamera)`.

The Flixel FrontEnds are as follows:

* FlxG.inputs
* FlxG.console
* FlxG.log
* FlxG.bmpLog
* FlxG.watch
* FlxG.debugger	 
* FlxG.vcr
* FlxG.bitmap	 
* FlxG.cameras
* FlxG.plugins
* FlxG.sound

More detail on the FrontEnds can be read on the [FrontEnd docs page](/documentation/flxg-frontends).

## Package Structure

Goodbye org package, HaxeFlixel now has no `org` package. This was a decision the core developers agreed upon making the package structure more simple and focused on the HaxeFlixel project.

## Core Assets

HaxeFlixel has system Assets for its debugger buttons, system sounds etc these assets were previously stored in every project in the assets/data folder. HaxeFlixel 3.x uses the OpenFL include.xml in core HaxeFlixel to omit the need to include them in every project. 

So you dont need to have system assets anymore, everything in your project's `./assets/*` folder should only be the assets you create.

## New Debugger and Interactive Console

HaxeFlixel 3.x includes a powerful console and improved debugger. The new debugger system by default redirects the core `trace()` command to the log. Alternativley you can use `FlxG.log.add()` , `FlxG.watch.add()`, `FlxG.log.warn` and more.

### FlxG Changes

| HaxeFlixel 2.x                          | HaxeFlixel 3.x                             |
| --------------------------------------- | ------------------------------------------ |
| FlxG.getLibraryName()                   | FlxG.libraryName                           |
| FlxG.DEBUGGER_STANDARD				  | FlxDebugger.STANDARD   				       |
| FlxG.DEBUGGER_MICRO					  | FlxDebugger.MICRO	   				       |
| FlxG.DEBUGGER_BIG					      | FlxDebugger.BIG		   			 		   |
| FlxG.DEBUGGER_TOP					      | FlxDebugger.TOP		    			   	   |
| FlxG.DEBUGGER_LEFT					  | FlxDebugger.LEFT		                   |
| FlxG.DEBUGGER_RIGHT					  | FlxDebugger.RIGHT                          |
| FlxG.random					          | FlxRandom.float                            |

________

//todo format the lists from FlxTools code

		addFunction("",				"",					"util.FlxRandom");
		addFunction("FlxG.shuffle",				"FlxArrayUtil.shuffle",				"util.FlxRandom");
		addFunction("FlxG.getRandom",			"FlxArrayUtil.getRandom",			"util.FlxRandom");
		addFunction("FlxG.globalSeed",			"FlxRandom.globalSeed",				"util.FlxRandom");

		addFunction("FlxG.tween",				"FlxTween.multiVar",				"tweens.FlxTween");

		addFunction("FlxG.resetInput",			"FlxG.inputs.reset");

		add(		"FlxG.RED",					"FlxColor.RED",						"util.FlxColor");
		add(		"FlxG.GREEN",				"FlxColor.GREEN",					"util.FlxColor");
		add(		"FlxG.BLUE",				"FlxColor.BLUE",					"util.FlxColor");
		add(		"FlxG.PINK",				"FlxColor.PINK",					"util.FlxColor");
		add(		"FlxG.WHITE",				"FlxColor.WHITE",					"util.FlxColor");
		add(		"FlxG.BLACK",				"FlxColor.BLACK",					"util.FlxColor" );
		add(		"FlxG.TRANSPARENT",			"FlxColor.TRANSPARENT",				"util.FlxColor");

		add(		"FlxG.DEG",					"FlxAngle.TO_DEG",					"util.FlxAngle");
		add(		"FlxG.RAD",					"FlxAngle.TO_RAD",					"util.FlxAngle");

		add(		"FlxG.flashGfx",			"FlxSpriteUtil.flashGfx",			"util.FlxSpriteUtil");
		add(		"FlxG.flashGfxSprite",		"FlxSpriteUtil.flashGfxSprite",		"util.FlxSpriteUtil");

		add(		"FlxG.levels",				"Reg.levels");
		add(		"FlxG.level",				"Reg.level");
		add(		"FlxG.scores",				"Reg.scores");
		add(		"FlxG.score",				"Reg.score");
		add(		"FlxG.saves",				"Reg.saves");
		add(		"FlxG.save",				"Reg.save");

		// CameraFrontEnd
		addFunction("FlxG.addCamera",			"FlxG.cameras.add");
		addFunction("FlxG.useBufferLocking",	"FlxG.cameras.useBufferLocking");
		addFunction("FlxG.lockCameras",			"FlxG.cameras.lock");
		addFunction("FlxG.renderCameras",		"FlxG.cameras.render");
		addFunction("FlxG.unlockCameras",		"FlxG.cameras.unlock");
		addFunction("FlxG.addCamera",			"FlxG.cameras.add");
		addFunction("FlxG.removeCamera",		"FlxG.cameras.remove");
		addFunction("FlxG.resetCameras",		"FlxG.cameras.reset");
		addFunction("FlxG.shake",				"FlxG.cameras.shake");

		// A hacky solution to avoid breaking FlxG.flashFramerate
		addFunction("FlxG.flashFramerate",		"tempFlashFramerate");
		addFunction("FlxG.flash",				"FlxG.cameras.flash");
		addFunction("tempFlashFramerate",		"FlxG.flashFramerate");

		addFunction("FlxG.fade",				"FlxG.cameras.fade");
		add(		"FlxG.bgColor",				"FlxG.cameras.bgColor");

		// add("FlxG.cameras", "FlxG.cameras.list");
		// Causes problems in other contexts like;
		// FlxG.cameras.list.add(camera);

		// DebuggerFrontEnd
		addFunction("FlxG.setDebuggerLayout",	"FlxG.debugger.setLayout");
		addFunction("FlxG.resetDebuggerLayout",	"FlxG.debugger.resetLayout");

		add(		"FlxG.visualDebug",			"FlxG.debugger.visualDebug");
		add(		"FlxG.toggleKeys",			"FlxG.debugger.toggleKeys");

		// LogFrontEnd
		addFunction("FlxG.log",					"trace");

		addFunction("FlxG.warn",				"FlxG.log.warn");
		addFunction("FlxG.error",				"FlxG.log.error");
		addFunction("FlxG.notice",				"FlxG.log.notice");
		addFunction("FlxG.advancedLog",			"FlxG.log.advanced");
		addFunction("FlxG.clearLog",			"FlxG.log.clear");

		// WatchFrontEnd
		addFunction("FlxG.watch",				"FlxG.watch.add");
		addFunction("FlxG.unwatch",				"FlxG.watch.remove");

		// SoundFrontEnd
		addFunction("FlxG.play",				"FlxG.sound.play");
		addFunction("FlxG.playMusic",			"FlxG.sound.playMusic");
		addFunction("FlxG.loadSound",			"FlxG.sound.load");
		addFunction("FlxG.addSound",			"FlxG.sound.add");
		addFunction("FlxG.stream",				"FlxG.sound.stream");
		addFunction("FlxG.destroySounds",		"FlxG.sound.destroySounds");
		addFunction("FlxG.updateSounds",		"FlxG.sound.updateSounds");
		addFunction("FlxG.pauseSounds",			"FlxG.sound.pauseSounds");
		addFunction("FlxG.resumeSounds",		"FlxG.sound.resumeSounds");

		add(		"FlxG.music",				"FlxG.sound.music");
		add(		"FlxG.sounds",				"FlxG.sound.list");
		add(		"FlxG.mute",				"FlxG.sound.muted");
		add(		"FlxG.volume",				"FlxG.sound.volume");
		add(		"FlxG.volumeHandler",		"FlxG.sound.volumeHandler");
		add(		"FlxG.keyVolumeUp",			"FlxG.sound.keyVolumeUp");
		add(		"FlxG.keyVolumeDown",		"FlxG.sound.keyVolumeDown");
		add(		"FlxG.keyMute",				"FlxG.sound.keyMute");

		// PluginFrontEnd
		addFunction("FlxG.addPlugin",			"FlxG.plugins.add");
		addFunction("FlxG.getPlugin",			"FlxG.plugins.get");
		addFunction("FlxG.removePlugin",		"FlxG.plugins.remove");
		addFunction("FlxG.removePluginType",	"FlxG.plugins.removeType");
		addFunction("FlxG.updatePlugins",		"FlxG.plugins.update");
		addFunction("FlxG.drawPlugins",			"FlxG.plugins.draw");

		add(		"FlxG.plugins",				"FlxG.plugins.list");

		// VCRFrontEnd
		addFunction("FlxG.loadReplay",			"FlxG.vcr.loadReplay");
		addFunction("FlxG.reloadReplay",		"FlxG.vcr.reloadReplay");
		addFunction("FlxG.stopReplay",			"FlxG.vcr.stopReplay");
		addFunction("FlxG.recordReplay",		"FlxG.vcr.startRecording");
		addFunction("FlxG.stopRecording",		"FlxG.vcr.stopRecording");

		// BitmapFrontEnd
		addFunction("FlxG.checkBitmapCache",	"FlxG.bitmap.checkCache");
		addFunction("FlxG.createBitmap",		"FlxG.bitmap.create");
		addFunction("FlxG.addBitmap",			"FlxG.bitmap.add");
		addFunction("FlxG.getCacheKeyFor",		"FlxG.bitmap.getCacheKeyFor");
		addFunction("FlxG.getUniqueBitmapKey",	"FlxG.bitmap.getUniqueKey");
		addFunction("FlxG.removeBitmap",		"FlxG.bitmap.remove");
		addFunction("FlxG.clearBitmapCache",	"FlxG.bitmap.clearCache");
		addFunction("FlxG.clearAssetsCache",	"FlxG.bitmap.clearAssetsCache");
