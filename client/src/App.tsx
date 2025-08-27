import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './lib/socket';
import type { Card, Hand } from './lib/types';

function App() {

  const [card, setCard] = useState<Card | null>(null);
  const [hand, setHand] = useState<Hand>({cards: []});

  useEffect(() => {
    const onCard = (c: Card) => {
      if (!c) return;
      setCard(c);
      setHand(prev => ({
        cards: [...prev.cards, c]
      }));
    }

    socket.on("connect", () => {
      console.log("connected", socket.id);
    })

    socket.on("card", onCard);

    return () => {
      socket.off("card", onCard);
    };
  }, [])

  const draw = () => {
    socket.emit("draw-card");
    console.log("pushed");
  }

  return (
    <>
      <h1>Card Deck</h1>
      <div>
        <button
          onClick={draw}
        >
          Draw
        </button>
        <br />
        <p>{"You have this many cards in your hand " + hand.cards.length}</p>
        {card
          ? <p>{"You drew a " + card.suit!}</p>
          : null
        }
      </div>
    </>
  )
}

export default App
