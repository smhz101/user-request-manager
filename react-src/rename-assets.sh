#!/bin/bash

# Navigate to the build directory
cd build/static/css

# Rename the CSS files
for file in *.css; do
    mv "$file" "main.css"
done

cd ../js

# Rename the JS files
for file in main*.js; do
    mv "$file" "main.js"
done
