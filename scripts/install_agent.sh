#!/bin/bash
sudo apt-get upgrade -y
sudo apt install docker docker-compose -y 
sudo systemctl enable docker
sudo systemctl start docker
cd ..
sudo docker-compose up -d
sudo docker-compose kill server
sudo docker-compose kill web