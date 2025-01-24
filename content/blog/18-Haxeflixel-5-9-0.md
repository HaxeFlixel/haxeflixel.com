---
title: "HaxeFlixel 5.9.0"
layout: blog-post
postDate: "TBD"
---

After 8 long months since 5.8.0, I'm happy to announce the largest flixel release since I've taken over as lead. We don't like to go that far without releases, but new things just kept piling on. To name a few, we have:
- A new FlxInputText to replace the old Flixel-UI.
- `FlxG.assets`, for customization to Flixel's asset management (hot-reloading!).
- Major additions to tilemaps, for both collision, iteration and general ease-of-use.
- [Much much more](https://github.com/HaxeFlixel/flixel/blob/dev/CHANGELOG.md#590-december-12-2024) that we can't possibly cover, here.

## When will Flixel 6 be released?

The next release will be version 6.0.0, unless for some reason an urgent patch is needed for 5.9.0. For the current list of changes in Flixel 6, look [here](https://github.com/HaxeFlixel/flixel/blob/release6/CHANGELOG.md). Many devs are using 6.0.0 already, and you can too! Just run:
```
haxelib git flixel https://github.com/HaxeFlixel/flixel.git release6
```
If you have been compiling with `no-deprecation-warnings` in your project's build command, now is the time to fix all of those, otherwise your project will not compile in Flixel 6. I also recommend using a haxe version of 4.3 or higher, which allows Flixel to suppress various internal deprecation warnings that were left in for backwards compatibility. If you have any issues with any of this don't hesitate to let me know, either in github or the Haxe discord's Flixel channel.

## New and improved FlxInputText

Special thanks to [Starmapo](https://github.com/Starmapo) for completely redoing `FlxInputText` from the ground up! New features include:
- Multiple characters can now be selected at once, either through holding and dragging the mouse or holding the shift key while moving the selection cursor.
  - Double pressing on the text field will select the closest word at that position.
  - You can select all of the text with Ctrl+A.
  - The currently selected text can be copied or cut with Ctrl+C and Ctrl+X respectively.
  - `selectionBeginIndex` and `selectionEndIndex` variables added so you can get the span of the current selection.
  - `selectionColor` and `selectedTextColor` variables can be changed to set the selection background and the selected text's color respectively. The custom format for the selected text can be disabled with `useSelectedTextFormat`.
  - You can set the selection directly with `setSelection()` and replace the currently selected text with `replaceSelectedText()`.
- Multiline is now properly supported, with an added `multiline` variable to dictate whether new lines can be created by the user.
- The text field can now be scrolled by using the mouse wheel, and is automatically scrolled whenever moving the selection cursor to a character that is out of view.
  - The scroll can be modified with the `scrollH` and `scrollV` variables. `bottomScrollV`, `maxScrollH` and `maxScrollV` have also been added as helper read-only variables.
  - `mouseWheelEnabled` dictates whether or not the text field can be scrolled with the mouse wheel, by default set to true.
- The selection cursor can now be moved to the start/end of the current line (Home/End or Ctrl+Up/Down) or to the previous/next word (Ctrl+Left/Right).
- The `background` variable can now be changed to toggle the background on/off.
- `selectable` and `editable` variables to dictate whether the text field can be selected/edited.
- Enums have been added for `forceCase`, `filterMode` and the callback's action types.
  - The callback is now also dispatched for when the text field is scrolled in some way (SCROLL_ACTION).
- Other Flixel keybinds will be paused while an input text is active (e.g. volume keys and debugger toggle key).
- The window's text input rect is now set accordingly so the text field isn't blocked by any keyboard overlays.
- Touches are now supported.

Check out these features in the new [FlxInputText Demo](https://haxeflixel.com/demos/FlxInputText/)

With the addition of `InputTextFrontEnd`, which controls the text input events used to power `FlxInputText`, creating other text inputs will be much easier, expect a `FlxBitmapInputText`, soon!

## AssetFrontEnd
If you're sick of doing `sprite.loadGraphic(Paths.image("hero"))`, well, you're in luck! FlxG.assets, is the new customizable interface that takes string asset paths and gives the desired assets. by setting the following dynamic method:
```hx
public dynamic function getAssetUnsafe(id:String, type:FlxAssetType, useCache = true):Null<Any>
```

Here are just a few neat uses for this:

### Simplifying asset paths
The above example that loads the hero sprite can be simplified to `sprite.loadGraphic("hero")`, like so:
```hx
// Edit the simplified id before passing it to the old method
function path(id:String, type:FlxAssetType)
{
  // for flixel assets, just pass them to the old method
  if (StringTools.startsWith(id, "flixel/") || StringTools.contains(id, ':'))
    return id;
  
  return switch type
  {
    case BINARY: 'assets/data/$id'; // expects extension already'
    case TEXT  : 'assets/data/$id.json';
    case IMAGE : 'assets/images/$id.png';
    case SOUND : 'assets/sounds/$id.ogg';
    case FONT  : 'assets/font/$id.ttf';
  };
}

final assets = FlxG.assets;

// Save the old methods, call them with the full path
final oldExists = assets.exists;
assets.exists = (id, ?type)->oldExists(path(id, type ?? BINARY), type);

final oldIsLocal = assets.isLocal;
assets.isLocal = (id, ?type, cache = true)->oldIsLocal(path(id, type ?? BINARY), type, cache);

final oldGet = assets.getAssetUnsafe;
assets.getAssetUnsafe = (id, type, cache = true)->oldGet(path(id, type), type, cache);
```

### Hot-Reloading
Sick of building the game just to see some asset change in the game? Simply add the Folling flag to your build command, and the compiled game will look at the source assets whenever it's run:
```
-DFLX_CUSTOM_ASSETS_DIRECTORY="assets"
```
Not only will this save time on dev builds in projects with many assets, but you can modify assets and see them in your game without recompiling.

### Automatically append sound file extensions
Define flag `-DFLX_DEFAULT_SOUND_EXT="ogg"` to allow sound asset ids to omit the extension. Useful when targeting multiple platforms that use different sound files. Can also use the flag to determine the desired sound extension, setting the flags value to "mp3" "wav" or "ogg" will use that extension. The default extension can be read via `FlxG.assets.defaultSoundExtension`

## Collision, Tilemaps and Tiles, Oh my!
Plenty of improvements, features and helpers have been added. Let's go over a few

### FlxTiles
- New dynamic `overlapsObject` method in FlxTile, can be extended or set to allow custom overlap detection for tiles whose hit shape is smaller than the tileGrid
- New `onCollide` signal, dispatched when overlaps  are checked for collision reasons
- Improved debug drawing

### FlxTilemaps
- Tons of new helpers: `getMapIndex`, `getRow`, `getColumn`, `getTileIndex`, `getTileData`, `tileExists`, `setTileIndex`, `getColumnAt`, `getRowAt`, `columnExists`, `rowExists`, `getColumnPos`, `getRowPos`, `getColumnPosAt`, `getRowPosAt`, `getTilePos`, `getTilePosAt`, `getAllTilePos`, `forEachMapIndex`, `getMapIndexAt`, `tileExistsAt`, `columnExistsAt`, `rowExistsAt`, `getTileIndexAt`, `getTileDataAt` and `setTileIndexAt`
- Overloaded various existing helpers to allow easier usage
- New `forEachOverlappingTile` method in FlxTilemap, to retrieve every tile that is overlapping the given object
- Added new `isOverlappingTile` method, allows you to check all tiles overlapping an object
- Added new `objectOverlapsTiles` to replace the now deprecated `overlapsWithCallbacks`
  - Eschews `flipCallbackParams` arg, allowing better typing of both callback params
  - Adds `isCollision` flag to control whether the Tiles' collision callbacks are fired and allows for processing non-solid tiles
- Added `FlxTypedTilemap<T:FlxTile>` for easier extension, with custom tile types

We also broke apart Flixel's collision tools into smaller parts that can be used to customize the collision of any FlxObject.

### Misc shout outs
- `FlxSave`: Allow custom handling of parsing errors ([#3286](https://github.com/HaxeFlixel/flixel/pull/3286))
- Gamepads: Add `acceptMode` and "mapped inputs" ([#3276](https://github.com/HaxeFlixel/flixel/pull/3276)) ([#3280](https://github.com/HaxeFlixel/flixel/pull/3280))
  - Add `ACCEPT` and `CANCEL` input IDs that conditionally map to either `A` or `B` depending on `FlxG.gamepads.acceptMode`
  - Add `gamepad.getMappedInput` to get an anum value of every possible gamepad input from various devices, i.e. `PS4(PS4ID.X)`
- `FlxStrip`: Add support for blendmodes ([#3213](https://github.com/HaxeFlixel/flixel/pull/3213))
- `FlxBasePath`: A simpler FlxPath without all the BS([#3153](https://github.com/HaxeFlixel/flixel/pull/3153))
- Various FlxDebugger improvements

For more updates, follow HaxeFlixel on [BlueSky](https://bsky.app/profile/haxeflixel.bsky.social) or check us out on [Github](https://github.com/HaxeFlixel/flixel) and [Discord](https://discordapp.com/invite/rqEBAgF)!