# #!/bin/sh

# rsync -e "ssh -i $HOME/.ssh/rrsync_haxeflixel" -av digialocean: docs/


# rsync -avz --rsh="ssh -i ~/.ssh/rrsync_haxeflixel -p 776"  \
# ~/Downloads/sync rrsync_haxeflixel@107.170.39.41:/home/rrsync_haxeflixel/docs --progress


# ssh rrsync_haxeflixel@107.170.39.41 -i ~/.ssh/rrsync_haxeflixel -p 776

rsync -e "ssh -i $HOME/.ssh/rrsync_haxeflixel -p 776" -av -r --delete-after --quiet /home/omni/projects/haxeflixel/haxeflixel.com/bin rrsync_haxeflixel@107.170.39.41:travis-test

# # rsync -avz --rsh="ssh -i ~/.ssh/omni -p 776"  \
# # "/home/omni/projects/haxeflixel/haxeflixel.com/out" omni@107.170.39.41:/var/www/haxeflixel/haxeflixel.com-builds/preview --progress


# #    root         /var/www/haxeflixel/haxeflixel.com-builds/live;
# #    error_page  404  /var/www/haxeflixel/haxeflixel.com-builds/live/404.html;

# #    root         /var/www/haxeflixel/haxeflixel.com/out;
# #    error_page  404  /var/www/haxeflixel/haxeflixel.com/out/404.html;


# #cp -r /var/www/haxeflixel/haxeflixel.com-builds/preview /var/www/haxeflixel/haxeflixel.com-builds/live