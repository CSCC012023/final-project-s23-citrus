#!/bin/bash

if git diff --quiet --cached -- citrus/app/api
then
    echo "No changes to API docs needed"
    exit 0
elif git diff --quiet --cached -- doc/api
then
    echo "API docs not updated even though API code has been. Regenerating..."
    apidoc -i citrus/app/api -o doc/api
    exit 1
else
    echo "API docs have been updated. Please commit them."
    exit 0
fi
