import '../styles/_answer-options.scss';
import { useGameContext } from '../context/GameContext';

const AnswerOptions = () => {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    handleAnswerSelect,
    correctAnswer,
    showAnswerResult,
  } = useGameContext();

  return (
    <div className="answers-section">
      {questions[currentQuestionIndex].answers.map((answer, index) => {
        // Determine additional classes based on correct/incorrect state
        let answerClass = selectedAnswer === index ? 'selected' : '';

        if (showAnswerResult) {
          if (index === correctAnswer) {
            answerClass = 'correct';
          } else if (selectedAnswer === index && index !== correctAnswer) {
            answerClass = 'incorrect';
          }
        }

        return (
          <div
            key={index}
            className={`answer-option ${answerClass}`}
            onClick={() => handleAnswerSelect(index)}
          >
            <div className="answer-letter">{answer.letter}</div>
            <div className="answer-text">{answer.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
