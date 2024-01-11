let shell = require("shelljs");
const{ execSync } = require('child_process');


console.log("Installing flixel-docs...");
console.log("Current folder: " + shell.pwd().stdout);

if (!shell.which("git")) {
	shell.echo("Sorry, this script requires git");
	shell.exit(1);
}

let path = "./content/documentation/flixel-docs";

if (shell.test("-e", path  + "/.git")) {
	console.log("Updating flixel-docs...");
	shell.cd(path);
	execSync("git fetch --all");
    
	let pullstdout = execSync("git pull");
    console.log(pullstdout.toString());
} else {
	console.log("Cloning flixel-docs...");
	execSync("git clone --depth 1 --no-single-branch https://github.com/haxeflixel/flixel-docs " + path);
}
