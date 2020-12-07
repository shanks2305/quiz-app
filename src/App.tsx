import React, { useState } from "react";
import { Dificulty, fetchQuizQuestions, questionState } from "./API";
import {} from "./utils";

//components
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.style";
const TOTAL_QUESTIONS: number = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    //Start the quiz
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Dificulty.MEDIUM
    );
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //Will check answers
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Will get the next question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div>
          <h1>REACT QUIZ</h1>
          {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          ) : null}

          {!gameOver ? <p className="score">Score:{score}</p> : null}
          {loading ? <p>Loading Questions....</p> : null}
          {!loading && !gameOver && (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answer={questions[number].answer}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswer.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  );
}

export default App;
