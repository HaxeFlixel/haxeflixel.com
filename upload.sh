# #!/bin/sh

rsync -e "ssh -i $HOME/.ssh/rrsync_haxeflixel -p 776" -av -r --delete-after --quiet /home/omni/projects/haxeflixel/haxeflixel.com/bin rrsync_haxeflixel@107.170.39.41:travis-test
