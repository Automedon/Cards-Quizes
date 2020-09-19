import React, { useEffect, useState } from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCards(
        res.data.results.map((questionItem: any, index: number) => {
          const answer = questionItem.correct_answer;
          const options = [
            ...questionItem.incorrect_answers.map((a: string) =>
              decodeString(a)
            ),
            answer,
          ].sort(() => Math.random() - 0.5);
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer,
            options,
          };
        })
      );
    });
  }, []);

  function decodeString(str: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  return <FlashCardList flashcards={flashCards} />;
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2+2",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2+1",
    answer: "3",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 3,
    question: "What is 2+3",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
];

export default App;
