import express from "express";
import {createServer} from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {Server} from "socket.io";
import { createBlankCard } from "./lib/factories.js";
import { Card } from "@prisma/client";
import {Ack, ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./lib/types.js";

const TIMEOUT = 5000;

const app = express();
app.use(express.json());

const server = createServer(app);

app.post("/api/new-deck", (req, res, next) => {

})

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  const card: Card = {
    ...createBlankCard(),
    suit: "Villager",
    content: "You are pathetic and are likely to die by violence, either by werewolf or neighbor."
  }

  console.log("socket connected:", socket.id);

  socket.on("drawCard", () => {
    console.log("drawCard");
    socket.timeout(TIMEOUT).emit("card", card, (err: Error | null, ack?: Ack) => {
      if (err) {
        console.log("not ok: ", err);
      }
      if (ack?.ok) {
        console.log("ok");
      }
    });
  });

  socket.on("createLobby", (lobby) => {
    socket.join(lobby);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at port 3000.");
});