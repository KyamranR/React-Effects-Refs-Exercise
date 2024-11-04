function Controls({ onDraw, onShuffle, isShuffling, autoDraw }) {
  return (
    <div>
      <button onClick={onDraw} disabled={isShuffling}>
        {autoDraw ? "Stop Drawing" : "Start Drawing"}
      </button>
      <button onClick={onShuffle} disabled={isShuffling || autoDraw}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>
    </div>
  );
}

export default Controls;
