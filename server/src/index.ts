import express from "express";
import {createServer} from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {Server} from "socket.io";
import { Card } from "./generated/prisma/index.js";
import { createBlankCard } from "./lib/factories.js";

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
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
  
  socket.on("draw-card", () => {
    console.log("draw-card");
    io.emit("card", card);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  })
});

server.listen(3000, () => {
  console.log("server running at port 3000.");
});