import React, { useState } from "react";

interface FlashCardProps {
  flashcard: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  };
}

const FlashCard: React.FC<FlashCardProps> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  return (
    <div className={`card ${flip && "flip"}`} onClick={() => setFlip(!flip)}>
      <div className="front">
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return <div className="flashcard-option">{option}</div>;
          })}
        </div>
      </div>
      <div className="back">{flashcard.answer}</div>
      {flip ? flashcard.answer : flashcard.question}
    </div>
  );
};

export default FlashCard;
