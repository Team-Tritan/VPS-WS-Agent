"use strict";

export async function limit(rate: any, max: any) {
  const clients: any[] = [];

  setInterval(() => {
    let i = clients.length;
    while (i--) clients[i].messageCount = 0;
  }, rate);

  return function limit(server: any) {
    server.messageCount = 0;

    server.on("newListener", function (name: any, listener: any) {
      if (name !== "message" || listener._rated) return;

      function ratedListener(data: any, flags: any) {
        if (server.messageCount++ < max) listener(data, flags);
        else server.emit("limited", data, flags);
      }

      ratedListener._rated = true;
      server.on("message", ratedListener);

      process.nextTick(() => server.removeListener("message", listener));
    });

    clients.push(server);
    server.on("close", () => clients.splice(clients.indexOf(server), 1));
  };
}
