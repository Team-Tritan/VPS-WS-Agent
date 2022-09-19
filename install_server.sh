#!/bin/bash
sudo apt-get upgrade -y
sudo apt install docker docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
sudo docker-compose up -d
sudo docker-compose kill agent
sudo docker-compose kill web

