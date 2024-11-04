function CardDisplay({ cards }) {
  return (
    <div>
      {cards.map((card, index) => (
        <img
          key={index}
          src={card.image}
          alt={`${card.value} of ${card.suit}`}
        />
      ))}
    </div>
  );
}

export default CardDisplay;
