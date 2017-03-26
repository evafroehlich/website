#!/usr/bin/env bash
set -e
JEKYLL_ENV=production bundle exec jekyll build
rsync -avz --delete -e ssh _site/ eva256@schedar.uberspace.de:/home/eva256/www/eva-ernst.me
