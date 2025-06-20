import QuizComplete from "../assets/quiz-complete.png";
import Questions from "../questions";

const Summary = ({ userAnswers }: { userAnswers: string[] }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === "null");
  const correctAnswers = userAnswers.filter((answer,index) => answer === Questions[index].answers[0]);
  const skippedPercent = Math.round( (skippedAnswers.length / userAnswers.length) * 100 )
  const correctPercent = Math.round( (correctAnswers.length / userAnswers.length) * 100 )
  const wrongPercent = 100 - correctPercent - skippedPercent
  return (
    <div id="summary">
      <img src={QuizComplete} alt="Trophy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">Answered Wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer: string, index: number) => {
          let cssClass = "user-answer";
          if (answer === "null") {
            cssClass += " skipped";
          } else if (answer === Questions[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{Questions[index].text}</p>
              <p className={cssClass}>
                {answer !== "null" ? answer : "Skipped"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default Summary;
