#!/bin/bash
cd  ..
docker-compose kill 
docker system prune -a 
git pull
docker-compose up -d
echo "Started ALL services, make sure to kill the ones you don't need on this node. "