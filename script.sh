#!/bin/bash

while IFS= read -r line; do 
  echo $line;
  rm -rf node_modules/$line;
  ./install-script.sh;
done < list;
