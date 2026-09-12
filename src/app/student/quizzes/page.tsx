'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  hint?: string;
}

interface Quiz {
  id: number;
  title: string;
  course: string;
  chapter: string;
  questions: Question[];
  timeLimit: number; // in minutes
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  status: 'available' | 'completed' | 'locked';
}

export default function StudentQuizzes() {
  const [view, setView] = useState<'list' | 'taking' | 'result'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [usedHints, setUsedHints] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizzes: Quiz[] = [
    {
      id: 1,
      title: 'JavaScript Variables Quiz',
      course: 'JavaScript Fundamentals',
      chapter: 'Chapter 2: Variables and Data Types',
      questions: [
        {
          id: 1,
          question: 'Which keyword is used to declare a variable that cannot be reassigned?',
          options: ['var', 'let', 'const', 'static'],
          correctAnswer: 2,
          explanation: 'const is used to declare variables that cannot be reassigned after initialization.',
          hint: 'Think about which keyword stands for "constant"'
        },
        {
          id: 2,
          question: 'What is the scope of a variable declared with var?',
          options: ['Block scope', 'Function scope', 'Global scope only', 'Lexical scope'],
          correctAnswer: 1,
          explanation: 'var has function scope, meaning it is accessible throughout the entire function where it is declared.',
          hint: 'Unlike let and const, var has a different scope behavior'
        },
        {
          id: 3,
          question: 'Which of the following is NOT a valid JavaScript data type?',
          options: ['String', 'Boolean', 'Float', 'Undefined'],
          correctAnswer: 2,
          explanation: 'JavaScript does not have a separate Float type. Numbers in JavaScript are all floating-point.',
          hint: 'JavaScript uses Number type for all numeric values'
        },
        {
          id: 4,
          question: 'What will be the output of: typeof null?',
          options: ['null', 'undefined', 'object', 'number'],
          correctAnswer: 2,
          explanation: 'This is a known JavaScript bug where typeof null returns "object" instead of "null".',
          hint: 'This is actually a bug in JavaScript'
        },
        {
          id: 5,
          question: 'Which method converts a string to an integer?',
          options: ['parseInt()', 'toInteger()', 'convertInt()', 'Number.parseInt()'],
          correctAnswer: 0,
          explanation: 'parseInt() is the built-in method to parse a string and return an integer.',
          hint: 'The method name starts with "parse"'
        }
      ],
      timeLimit: 15,
      passingScore: 70,
      attempts: 0,
      maxAttempts: 3,
      status: 'available'
    },
    {
      id: 2,
      title: 'React Components Quiz',
      course: 'React Development',
      chapter: 'Chapter 3: Component Basics',
      questions: [
        {
          id: 1,
          question: 'What is the correct way to pass data to a React component?',
          options: ['Using state', 'Using props', 'Using context', 'Using refs'],
          correctAnswer: 1,
          explanation: 'Props (properties) are used to pass data from parent to child components in React.',
          hint: 'Think about the term for "properties" in React'
        },
        {
          id: 2,
          question: 'Which hook is used to manage state in a functional component?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 1,
          explanation: 'useState is the hook used to add state to functional components in React.',
          hint: 'The hook name contains "state"'
        }
      ],
      timeLimit: 10,
      passingScore: 80,
      attempts: 1,
      maxAttempts: 3,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Python Lists Quiz',
      course: 'Python for Data Science',
      chapter: 'Chapter 2: Data Structures',
      questions: [],
      timeLimit: 20,
      passingScore: 75,
      attempts: 0,
      maxAttempts: 3,
      status: 'locked'
    }
  ];

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setRevealedAnswers(new Set());
    setUsedHints(new Set());
    setTimeRemaining(quiz.timeLimit * 60);
    setQuizResult(null);
    setShowExplanation(false);
    setView('taking');
  };

  const selectAnswer = (questionId: number, answerIndex: number) => {
    // If answer was already revealed, don't allow changing
    if (revealedAnswers.has(questionId)) return;
    
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const revealAnswer = (questionId: number) => {
    const newRevealed = new Set(revealedAnswers);
    newRevealed.add(questionId);
    setRevealedAnswers(newRevealed);
    // Remove the answer if it was selected (revealed answer counts as NOT ANSWERED)
    const newAnswers = { ...answers };
    delete newAnswers[questionId];
    setAnswers(newAnswers);
  };

  const useHint = (questionId: number) => {
    const newUsedHints = new Set(usedHints);
    newUsedHints.add(questionId);
    setUsedHints(newUsedHints);
  };

  const submitQuiz = () => {
    if (!selectedQuiz) return;
    
    let correctCount = 0;
    selectedQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer && !revealedAnswers.has(q.id)) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    const passed = score >= selectedQuiz.passingScore;
    
    setQuizResult({ score, passed, correct: correctCount, total: selectedQuiz.questions.length });
    setView('result');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (view === 'list') {
    return (
      <DashboardLayout actor="student" userName="John Smith">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quizzes</h1>
          <p className="text-gray-600">Test your knowledge with interactive quizzes</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-1">{quizzes.length}</div>
                  <div className="text-blue-100 text-sm">Total Quizzes</div>
                </div>
                <div className="text-4xl opacity-80">📝</div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-1">{quizzes.filter(q => q.status === 'completed').length}</div>
                  <div className="text-green-100 text-sm">Completed</div>
                </div>
                <div className="text-4xl opacity-80">✅</div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-1">{quizzes.filter(q => q.status === 'available').length}</div>
                  <div className="text-purple-100 text-sm">Available</div>
                </div>
                <div className="text-4xl opacity-80">🎯</div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-1">{quizzes.filter(q => q.status === 'locked').length}</div>
                  <div className="text-orange-100 text-sm">Locked</div>
                </div>
                <div className="text-4xl opacity-80">🔒</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quizzes List */}
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className={quiz.status === 'locked' ? 'opacity-60' : ''}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                      <Badge variant={quiz.status === 'completed' ? 'success' : quiz.status === 'available' ? 'default' : 'warning'}>
                        {quiz.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{quiz.course}</p>
                    <p className="text-sm text-gray-500 mb-3">{quiz.chapter}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>❓ {quiz.questions.length} questions</span>
                      <span>⏱️ {quiz.timeLimit} minutes</span>
                      <span>🎯 {quiz.passingScore}% to pass</span>
                      <span>🔄 {quiz.attempts}/{quiz.maxAttempts} attempts</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    {quiz.status === 'available' && (
                      <Button onClick={() => startQuiz(quiz)}>Start Quiz</Button>
                    )}
                    {quiz.status === 'completed' && (
                      <Button variant="outline" onClick={() => startQuiz(quiz)}>Retry</Button>
                    )}
                    {quiz.status === 'locked' && (
                      <Button variant="outline" disabled>🔒 Locked</Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (view === 'taking' && selectedQuiz) {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;
    const isAnswered = answers[currentQ.id] !== undefined;
    const isRevealed = revealedAnswers.has(currentQ.id);
    const hintUsed = usedHints.has(currentQ.id);

    return (
      <DashboardLayout actor="student" userName="John Smith">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedQuiz.title}</h1>
          <p className="text-gray-600">{selectedQuiz.course}</p>
        </div>

        {/* Quiz Header */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </span>
                <ProgressBar progress={progress} />
              </div>
              <div className="text-sm font-medium text-gray-700">
                ⏱️ {formatTime(timeRemaining)}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{currentQ.question}</h3>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let optionClass = 'border-gray-200 hover:border-blue-400 hover:bg-blue-50';
                
                if (isRevealed) {
                  if (index === currentQ.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (answers[currentQ.id] === index) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (answers[currentQ.id] === index) {
                  optionClass = 'border-blue-500 bg-blue-50';
                }

                return (
                  <button
                    key={index}
                    onClick={() => !isRevealed && selectAnswer(currentQ.id, index)}
                    disabled={isRevealed}
                    className={`w-full text-left p-4 border rounded-lg transition ${optionClass} ${
                      isRevealed ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {isRevealed && index === currentQ.correctAnswer && (
                        <span className="ml-auto text-green-600">✓ Correct</span>
                      )}
                      {isRevealed && answers[currentQ.id] === index && index !== currentQ.correctAnswer && (
                        <span className="ml-auto text-red-600">✗ Your answer</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint Section */}
            {currentQ.hint && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                {!hintUsed ? (
                  <button
                    onClick={() => useHint(currentQ.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    💡 Show Hint
                  </button>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">💡 Hint:</span> {currentQ.hint}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Explanation Section */}
            {isRevealed && currentQ.explanation && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">📚 Explanation:</span> {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </Button>
          
          <div className="flex gap-2">
            {!isRevealed && (
              <button
                onClick={() => revealAnswer(currentQ.id)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                👁️ Reveal Answer
              </button>
            )}
          </div>

          {currentQuestion < selectedQuiz.questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              Next →
            </Button>
          ) : (
            <Button onClick={submitQuiz}>
              Submit Quiz
            </Button>
          )}
        </div>
      </DashboardLayout>
    );
  }

  if (view === 'result' && quizResult) {
    return (
      <DashboardLayout actor="student" userName="John Smith">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-600">{selectedQuiz?.title}</p>
        </div>

        {/* Result Card */}
        <Card className="mb-6">
          <CardBody>
            <div className="text-center">
              <div className={`text-6xl mb-4 ${quizResult.passed ? 'text-green-500' : 'text-red-500'}`}>
                {quizResult.passed ? '🎉' : '😔'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {quizResult.passed ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              <p className="text-gray-600 mb-6">
                {quizResult.passed 
                  ? 'You passed the quiz!' 
                  : `You need ${selectedQuiz?.passingScore}% to pass. Try again!`
                }
              </p>

              <div className="max-w-md mx-auto mb-6">
                <div className="text-5xl font-bold mb-2 text-gray-900">{quizResult.score}%</div>
                <ProgressBar progress={quizResult.score} />
              </div>

              <div className="flex justify-center gap-8 text-sm text-gray-600">
                <div>
                  <div className="font-semibold text-gray-900">{quizResult.correct}</div>
                  <div>Correct</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{quizResult.total - quizResult.correct}</div>
                  <div>Incorrect</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{quizResult.total}</div>
                  <div>Total</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setView('list')}>
            ← Back to Quizzes
          </Button>
          <Button onClick={() => startQuiz(selectedQuiz!)}>
            🔄 Retry Quiz
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return null;
}