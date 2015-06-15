#!/bin/sh
rm -rf out
docpad generate --env static
cp -r src/documents/documentation/documentation/images out/documentation