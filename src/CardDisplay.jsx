function CardDisplay({ cards }) {
  return (
    <div>
      {cards && cards.length > 0 ? (
        cards.map((card, index) => (
          <img
            key={index}
            src={card.image}
            alt={`${card.value} of ${card.suit}`}
          />
        ))
      ) : (
        <p>No cards to display</p>
      )}
    </div>
  );
}

export default CardDisplay;
