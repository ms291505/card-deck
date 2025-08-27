import { Card } from "../generated/prisma/index.js";

export function createBlankCard(): Card {
  const card: Card = {
    id: -1,
    deckId: -1,
    suit: null,
    content: null,
    value: null,
    notes: null,
    created: new Date()
  }
  return card;
}