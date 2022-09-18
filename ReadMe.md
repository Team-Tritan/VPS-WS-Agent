# Websocket Server

The purpose of this project is to grab data from pc's and send it to the server which stores it in MongoDB and is sorted by hostnames. (soonTM) will display on a site probably as a uptime page for vps'.

Currently grabs the following data from client: time, hostname, ip, platform, uptime, memory_free, total_memory.

# Startup:

## **Agent**

**Run in dev:**

- npm run dev-agent

**Run in prod:**

- docker-compose up agent

## **Server**

**Run in dev:**

- npm run dev-server

**Run in prod:**

- docker-compose up server

# Contributing

Feel free to do any changes or submit any PR's :p

# License

No license kek
