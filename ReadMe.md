# VPS Info Agent

The purpose of this project is to grab data from pc's and send it to the server which stores it in MongoDB and is sorted by hostnames. (soonTM) will display on a site probably as a uptime page for vps'.

Currently grabs the following data from client: time, hostname, ip, platform, uptime, memory_free, total_memory.

Install scripts are located in ./scripts, they will literally automate the entire docker installation process as well as starting services in docker.

# Startup:

## **Agent**

**Run in dev:**

- npm run dev-agent

**Run in prod:**

- docker-compose up agent
  OR
- npm run agent (have pm2 installed globally\*)

## **Server**

**Run in dev:**

- npm run dev-server

**Run in prod:**

- docker-compose up server
  OR
- npm run server (have pm2 installed globally\*)

## **Web Companion**

**Run in dev:**

- npm run dev-web

**Run in prod:**

- docker-compose up web
  OR
- npm run web (have pm2 installed globally\*)

# Contributing

Feel free to do any changes or submit any PR's :p

# License

No license kek

