import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Questions from "../questions";

const Question = ({
  index,
  onSelectAnswer,
  onSkipAnswer,
}: {
  index: number;
  onSelectAnswer: (selectedAnswer: string) => void;
  onSkipAnswer: () => void;
}) => {
  const [answer, setAnswer] = useState<{
    selectedAnswer: string;
    isCorrect: null | boolean;
  }>({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer: string) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: Questions[index].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : ()=>{}}
        mode={answerState}
      />
      <h2>{Questions[index].text}</h2>
      <Answers
        answers={Questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};
export default Question;
