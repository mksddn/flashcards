#!/usr/bin/env sh

git switch main
git checkout --orphan temp_branch
git add -A
git commit -am "the first commit"
git branch -D gh-pages
git push origin --delete gh-pages
git branch -m gh-pages

# остановить публикацию при ошибках
set -e

# сборка
gulp build


# git init
git add dist
git commit -m 'add dist subtree and deploy'

git subtree push --prefix dist origin gh-pages
# git push origin `git subtree split --prefix dist main`:gh-pages --force

git switch -f main

# cd -