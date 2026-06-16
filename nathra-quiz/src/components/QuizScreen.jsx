import { ANSWER_LETTERS, LEVEL_LABELS } from '../data/quizData';

export default function QuizScreen({
  level,
  current,
  questions,
  answered,
  selectedIdx,
  feedback,
  isCorrect,
  onGoHome,
  onSelectAnswer,
  onNextQuestion,
}) {
  const question = questions[current];
  const total = questions.length;
  const progress = (current / total) * 100;
  const isLast = current === total - 1;

  function getOptionClass(idx) {
    if (!answered) return 'option';
    if (idx === question.ans) return 'option correct';
    if (idx === selectedIdx) return 'option wrong';
    return 'option';
  }

  return (
    <div className="section">
      <button type="button" className="back-btn" onClick={onGoHome}>
        ← العودة
      </button>
      <div className="progress-wrap">
        <div className="progress-info">
          <span>{LEVEL_LABELS[level]}</span>
          <span>
            السؤال {current + 1} من {total}
          </span>
        </div>
        <div className="progress">
          <div className="bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="question-num">السؤال {current + 1}</div>
      <div className="question-text">{question.q}</div>
      <div className="options">
        {question.opts.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            className={getOptionClass(idx)}
            disabled={answered}
            onClick={() => onSelectAnswer(idx)}
          >
            <span className="opt-letter">{ANSWER_LETTERS[idx]}</span>
            {opt}
          </button>
        ))}
      </div>
      {answered && feedback && (
        <div className={`feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}`}>{feedback}</div>
      )}
      {answered && (
        <button type="button" className="next-btn" onClick={onNextQuestion}>
          {isLast ? 'عرض النتائج 🏆' : 'السؤال التالي ←'}
        </button>
      )}
    </div>
  );
}
