import React, { FormEvent, useEffect, useRef, useState } from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  const categoryEl = useRef<HTMLSelectElement>(null);
  const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

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
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="header">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category: { id: number; name: string }) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashCards} />
      </div>
    </div>
  );
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
