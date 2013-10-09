```
title: "Upgrade Guide"
```

//todo


##HaxeFlixel 3.x

HaxeFlixel 3.x is an evolution of the original Flixel api and while most of the API is very similar and quickly learnt, it requires some renames and modifications to update your code. 

In an effort to help with this process there is a find and replace convert command included with the Flixel Tools. You can see what it replaces here.



## FrontEnds and the FlxG refactor

Frontends in HaxeFlixel 3.x are a new structure to the core of Flixel and which tackles the often criticized bloated collection of static methods in FlxG.

Frontends are accessed in `FlxG` in a similar fasion to what Flixel devs are used to however careful thought has been given to organise them into logical shortcuts.
These frontend shortcuts separate the code of `FlxG` to let it be easier to maintain, access and explore.

For example in HaxeFlixel 2.x to add a `FlxCamera` you would use `FlxG.addCamera(camera:FlxCamera);`, this `addCamera` method has been moved into a `camera` frontend with all the other `camera` related shortcuts.
So the code in HaxeFlixel 3.x to add a `FlxCamera` is now `FlxG.cameras.add(camera:FlxCamera)`.




________

//todo format the lists from FlxTools code


    /**
		 * FlxG refactor / frontEnds
		 */

		add(		"FlxG.getLibraryName()",	"FlxG.libraryName");

		add(		"FlxG.DEBUGGER_STANDARD",	"FlxDebugger.STANDARD",				"system.debug.FlxDebugger");
		add(		"FlxG.DEBUGGER_MICRO",		"FlxDebugger.MICRO",				"system.debug.FlxDebugger");
		add(		"FlxG.DEBUGGER_BIG",		"FlxDebugger.BIG",					"system.debug.FlxDebugger");
		add(		"FlxG.DEBUGGER_TOP",		"FlxDebugger.TOP",					"system.debug.FlxDebugger");
		add(		"FlxG.DEBUGGER_LEFT",		"FlxDebugger.LEFT",					"system.debug.FlxDebugger");
		add(		"FlxG.DEBUGGER_RIGHT",		"FlxDebugger.RIGHT",				"system.debug.FlxDebugger");

		addFunction("FlxG.random",				"FlxRandom.float",					"util.FlxRandom");
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


##Package Structure

##Core Assets

##Interactive Console
