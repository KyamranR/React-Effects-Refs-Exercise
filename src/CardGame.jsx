import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Controls from "./Controls";
import CardDisplay from "./CardDisplay";

function CardGame() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [hasCards, setHasCards] = useState(true);
  const [autoDraw, setAutoDraw] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const drawInterval = useRef(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeckId(response.data.deck_id);
    };
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (!hasCards) {
      alert("Error: no cards remaining!");
      return;
    }

    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    if (response.data.remaining === 0) setHasCards(false);
    setCards((prevCards) => [...prevCards, ...response.data.cards]);
  };

  const toggleAutoDraw = () => {
    setAutoDraw(!autoDraw);
  };

  useEffect(() => {
    if (autoDraw) {
      drawInterval.current = setInterval(async () => {
        const response = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );

        if (response.data.remaining === 0) {
          clearInterval(drawInterval.current);
          setAutoDraw(false);
          setHasCards(false);
          alert("Error: no cards remaining!");
        } else {
          setCards((prevCards) => [...prevCards, ...response.data.cards]);
        }
      }, 1000);
    }

    return () => clearInterval(drawInterval.current);
  }, [autoDraw, deckId]);

  const shuffleDeck = async () => {
    setIsShuffling(true);
    setCards([]); // Clear displayed cards
    setHasCards(true); // Reset card status
    await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    setIsShuffling(false);
  };

  return (
    <div>
      <h1>Deck of Cards</h1>
      <Controls
        onDraw={toggleAutoDraw}
        onShuffle={shuffleDeck}
        isShuffling={isShuffling}
        autoDraw={autoDraw}
      />
      <CardDisplay cards={cards} />
    </div>
  );
}

export default CardGame;
