#!/bin/bash
git reset --hard
git pull
npm i
npm run build
pm2 restart PersonalPage
