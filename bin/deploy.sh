#!/bin/bash

if  [[ "$TRAVIS_BRANCH" == "dev" ]] || [[ "$TRAVIS_BRANCH" == "master" ]] ;
then
  rsync -e "ssh -oStrictHostKeyChecking=no -i $TRAVIS_BUILD_DIR/rrsync_haxeflixel \
  -p $DEPLOY_PORT" -avr $TRAVIS_BUILD_DIR/out $DEPLOY_USER@$DEPLOY_HOST:$TRAVIS_BRANCH
fi
