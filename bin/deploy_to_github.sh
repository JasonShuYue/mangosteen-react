#!/usr/bin/env bash
rm -rf dist
yarn build
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:JasonShuYue/mangosteen-react.git
git push -f origin master:master
cd -