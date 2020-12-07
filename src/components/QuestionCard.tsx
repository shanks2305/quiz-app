import React from "react";
import { ButtonWrapper, Wrapper } from "./QuestionCard.Style";

type Props = {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answer,
  callback,
  questionNr,
  totalQuestions,
  userAnswer,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Qusetion : {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answer.map((ans, i) => (
          <ButtonWrapper
            key={ans}
            correct={userAnswer?.correctAnswer === ans}
            userClicked={userAnswer?.answer === ans}
          >
            <button
              disabled={userAnswer ? true : false}
              value={ans}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
