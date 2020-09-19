import React from "react";

interface FlashCardProps {
  flashcard: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  };
}

const FlashCard: React.FC<FlashCardProps> = ({ flashcard }) => {
  return <div>{flashcard.question}</div>;
};

export default FlashCard;
