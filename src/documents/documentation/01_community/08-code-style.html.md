```
title: "Code Style"
```

//todo



HaxeFlixel is following most of the key style found in the original Flixel library. Over the most recent HaxeFlixel releases a large amount of the codebase has been modified to follow these style choices.

----

####Functions

Capitalized letters for function parameters:

``` haxe
function translate( Words:String, Fish:BableFish ):Void
```

Instead of:

``` haxe
function translate( words:String, fish:BableFish ):Void
```

#####Simplify the function names:

```
function shootEnemy(Target:Enemy, Bullet:BulletType):Void
```

Easier to read than:

```
function shootAtASpecificEnemyWithABulletTypeOf(Target:Enemy, Bullet:BulletType):Void
```

----

####Curley Braces

Use line breaks in methods, operators etc where possible:

``` haxe
function createAwesome( Boring:Stuff, Creative:Things ):Void
{
	//code
}
```

Instead of:

``` haxe
function createAwesome( Boring:Stuff, Creative:Things ):Void {
	//code
}
```

If the logic is simple enough it is acceptable to ommit using them completely:

``` haxe
function createAwesome():Bool
	return _surprize;
```

----

####Local variables

Use an underscore for private local variables:

``` haxe
private var _awesome:Awesome;
```

----

####Strictly Type ambiguous variables

The Haxe compiler does not require you to declare the Type of a variable in some contexts however doing so improves the readability of the code:

``` haxe
var mystery:Answer = createAnAnswer();

//This is unnecessary
var name:String = "Merlin";
var number:Int = 32;

//This is ok
var name = "Merlin";
var number = 32;
```