import haxe.io.Path;
import sys.io.File;
import sys.FileSystem;

using StringTools;

function main() {
	function loop(dir) {
		var files = FileSystem.readDirectory(dir);
		for (file in files) {
			var path = Path.join([dir, file]);
			if (FileSystem.isDirectory(path)) {
				loop(path);
			}
			if (Path.extension(file) != "html") {
				continue;
			}
			if (File.getContent(path).contains("This page has moved. You will be automatically redirected to its new location.")) {
				FileSystem.deleteFile(path);
			}
		}
	}
	loop("out");
}
