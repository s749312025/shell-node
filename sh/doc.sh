#!/bin/sh

cd /data/project/trafficDoc
git pull
yarn build

echo "结束于：`date '+%Y-%m-%d %H:%M:%S'`"