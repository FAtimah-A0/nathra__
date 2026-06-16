import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { QUESTIONS } from './data/quizData';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [topic, setTopic] = useState('sheets');
  const [level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  function startQuiz(nextLevel) {
    setLevel(nextLevel);
    setQuestions(QUESTIONS[topic][nextLevel]);
    setCurrent(0);
    setScore(0);
    resetQuestionState();
    setScreen('quiz');
  }

  function resetQuestionState() {
    setAnswered(false);
    setSelectedIdx(null);
    setFeedback('');
    setIsCorrect(false);
  }

  function selectAnswer(idx) {
    if (answered) return;

    const question = questions[current];
    setAnswered(true);
    setSelectedIdx(idx);

    if (idx === question.ans) {
      setScore((prev) => prev + 1);
      setFeedback(question.fb);
      setIsCorrect(true);
    } else {
      setFeedback(`❌ إجابة خاطئة. ${question.fb}`);
      setIsCorrect(false);
    }
  }

  function nextQuestion() {
    const next = current + 1;
    if (next >= questions.length) {
      setScreen('results');
      return;
    }
    setCurrent(next);
    resetQuestionState();
  }

  function goHome() {
    setScreen('welcome');
  }

  function retryQuiz() {
    startQuiz(level);
  }

  return (
    <div className="card">
      {screen === 'welcome' && (
        <WelcomeScreen topic={topic} onSelectTopic={setTopic} onStartQuiz={startQuiz} />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          level={level}
          current={current}
          questions={questions}
          answered={answered}
          selectedIdx={selectedIdx}
          feedback={feedback}
          isCorrect={isCorrect}
          onGoHome={goHome}
          onSelectAnswer={selectAnswer}
          onNextQuestion={nextQuestion}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          score={score}
          total={questions.length}
          level={level}
          topic={topic}
          onGoHome={goHome}
          onRetryQuiz={retryQuiz}
        />
      )}
    </div>
  );
}
