export interface Card {
  suit?: string,
  content?: string
}

export interface Hand {
  cards: Card[],
}