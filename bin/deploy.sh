#!/bin/bash

echo "Deploying to haxeflixel.com from branch $TRAVIS_BRANCH"

if  [[ "$TRAVIS_BRANCH" == "dev" ]] || [[ "$TRAVIS_BRANCH" == "master" ]] ;
then
  echo "Running rsync"
  rsync -e "ssh -oStrictHostKeyChecking=no -i $TRAVIS_BUILD_DIR/rrsync_haxeflixel \
  -p $DEPLOY_PORT" --delete -avr $TRAVIS_BUILD_DIR/out $DEPLOY_USER@$DEPLOY_HOST:$TRAVIS_BRANCH
fi
