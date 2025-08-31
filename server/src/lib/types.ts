import { Card } from "@prisma/client";

export interface Ack {ok: boolean};

export interface ServerToClientEvents {
  noArg: () => void;
  card: (card: Card, ack: (response: Ack) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  drawCard: () => void;
  createLobby: (lobby: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}