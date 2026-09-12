'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { quizzesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

type AnswerState = 'NOT_STARTED' | 'IN_PROGRESS' | 'ANSWERED' | 'NOT_ANSWERED' | 'REVEALED' | 'CORRECT' | 'INCORRECT';

interface Question {
  id: number;
  question: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  hint?: string;
  explanation?: string;
}

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const { currentUser } = useAuth();
  const quizId = params.quizId;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('NOT_STARTED');
  const [revealed, setRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuiz() {
      if (!currentUser) return;
      try {
        const quizData = await quizzesService().getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.error('Failed to load quiz:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuiz();
  }, [quizId, currentUser]);

  const questions: Question[] = quiz?.questions || [
    {
      id: 1,
      question: 'Which method is used to add an event listener to an element in JavaScript?',
      options: [
        { label: 'A', text: 'addEventListener()', isCorrect: true },
        { label: 'B', text: 'onEvent()', isCorrect: false },
        { label: 'C', text: 'bindEvent()', isCorrect: false },
        { label: 'D', text: 'attachEvent()', isCorrect: false },
      ],
      hint: 'This is the standard DOM method for attaching event handlers to elements.',
      explanation: 'addEventListener() is the standard DOM method for attaching event handlers. It allows multiple event listeners for the same event and provides better control over event propagation.',
    },
  ];

  const currentQuestionData = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleAnswerSelect = (label: string) => {
    if (revealed || answerState !== 'NOT_STARTED' && answerState !== 'IN_PROGRESS') return;
    
    setSelectedAnswer(label);
    setAnswerState('IN_PROGRESS');
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentUser) return;

    const correctOption = currentQuestionData.options.find(opt => opt.isCorrect);
    const isCorrect = selectedAnswer === correctOption?.label;

    if (isCorrect) {
      setAnswerState('CORRECT');
      setScore(prev => prev + 1);
    } else {
      setAnswerState('INCORRECT');
    }
    setShowExplanation(true);

    try {
      await quizzesService.submitQuizAnswer({
        userId: currentUser.id,
        quizId,
        questionId: currentQuestionData.id.toString(),
        answer: selectedAnswer,
        isCorrect,
      });
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleRevealAnswer = () => {
    // CRITICAL RULE: Revealing answer counts as NOT ANSWERED
    setRevealed(true);
    setAnswerState('REVEALED');
    setShowExplanation(true);
    
    // Do NOT increment score - revealed answers are NOT counted as correct
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerState('NOT_STARTED');
      setRevealed(false);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSkip = () => {
    setAnswerState('NOT_ANSWERED');
    handleNextQuestion();
  };

  const getAnswerStateBadge = () => {
    switch (answerState) {
      case 'CORRECT':
        return <Badge variant="success">Correct</Badge>;
      case 'INCORRECT':
        return <Badge variant="danger">Incorrect</Badge>;
      case 'REVEALED':
        return <Badge variant="warning">Answer Revealed (Not Answered)</Badge>;
      case 'NOT_ANSWERED':
        return <Badge variant="info">Skipped</Badge>;
      default:
        return null;
    }
  };

  const getOptionStyle = (option: { label: string; text: string; isCorrect: boolean }) => {
    const isSelected = selectedAnswer === option.label;
    const isCorrect = option.isCorrect;

    if (revealed) {
      // When revealed, show correct answer but mark as REVEALED state
      if (isCorrect) {
        return 'border-green-500 bg-green-50';
      }
      return 'border-gray-200 bg-gray-50 opacity-60';
    }

    if (answerState === 'CORRECT' || answerState === 'INCORRECT') {
      if (isCorrect) {
        return 'border-green-500 bg-green-50';
      }
      if (isSelected && !isCorrect) {
        return 'border-red-500 bg-red-50';
      }
      return 'border-gray-200 bg-gray-50 opacity-60';
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-50';
    }

    return 'border-gray-200 hover:border-blue-500 hover:bg-blue-50';
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="student" userName="John Smith" />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardBody>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
                    <p className="text-gray-600 mb-6">
                      You scored {score} out of {questions.length}
                    </p>
                    
                    <div className="inline-block p-6 bg-blue-50 rounded-lg mb-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {Math.round((score / questions.length) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Score</div>
                    </div>

                    <div className="space-y-2 text-left max-w-md mx-auto mb-6">
                      <div className="flex justify-between">
                        <span>Correct Answers:</span>
                        <span className="font-medium text-green-600">{score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incorrect Answers:</span>
                        <span className="font-medium text-red-600">
                          {questions.length - score - (questions.filter(q => q.options).length - score)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revealed (Not Counted):</span>
                        <span className="font-medium text-yellow-600">
                          {/* This would be tracked in a real implementation */}
                          0
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> Revealed answers are counted as "Not Answered" and do not contribute to your score.
                      </p>
                    </div>

                    <Button onClick={() => window.location.reload()} className="w-full">
                      Retake Quiz
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="student" userName="John Smith" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Quiz Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">JavaScript Fundamentals - Chapter 5 Quiz</h1>
              <p className="text-gray-600">Test your knowledge of DOM manipulation and event handling</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                  <span>⏱️</span>
                  <span className="font-medium">Time Remaining: 14:32</span>
                </div>
                {getAnswerStateBadge()}
              </div>
            </div>

            {/* Quiz Progress */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-gray-600">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </CardBody>
            </Card>

            {/* Quiz Question */}
            <Card className="mb-6">
              <CardBody>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Question {currentQuestion + 1}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-6">
                  {currentQuestionData.question}
                </h2>

                <div className="space-y-3">
                  {currentQuestionData.options.map((option) => (
                    <div
                      key={option.label}
                      onClick={() => handleAnswerSelect(option.label)}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition ${getOptionStyle(option)} ${
                        revealed || (answerState !== 'NOT_STARTED' && answerState !== 'IN_PROGRESS') ? 'pointer-events-none' : ''
                      }`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full font-medium ${
                        revealed && option.isCorrect ? 'bg-green-500 text-white' :
                        answerState === 'CORRECT' && option.isCorrect ? 'bg-green-500 text-white' :
                        answerState === 'INCORRECT' && selectedAnswer === option.label ? 'bg-red-500 text-white' :
                        'bg-gray-100'
                      }`}>
                        {option.label}
                      </div>
                      <span className="flex-1">{option.text}</span>
                      {revealed && option.isCorrect && (
                        <span className="text-green-600 font-medium">✓ Correct</span>
                      )}
                      {!revealed && answerState === 'CORRECT' && option.isCorrect && (
                        <span className="text-green-600 font-medium">✓ Correct</span>
                      )}
                      {!revealed && answerState === 'INCORRECT' && selectedAnswer === option.label && (
                        <span className="text-red-600 font-medium">✗ Incorrect</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hint */}
                {currentQuestionData.hint && !revealed && answerState === 'IN_PROGRESS' && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <div className="font-medium text-yellow-800 mb-1">Hint</div>
                        <p className="text-sm text-yellow-700">
                          {currentQuestionData.hint}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {showExplanation && currentQuestionData.explanation && (
                  <div className={`mt-6 p-4 rounded-lg ${
                    revealed ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{revealed ? '👁️' : '✓'}</span>
                      <div>
                        <div className={`font-medium mb-1 ${revealed ? 'text-orange-800' : 'text-green-800'}`}>
                          {revealed ? 'Answer Revealed' : 'Explanation'}
                        </div>
                        <p className={`text-sm ${revealed ? 'text-orange-700' : 'text-green-700'}`}>
                          {currentQuestionData.explanation}
                        </p>
                        {revealed && (
                          <p className="text-xs text-orange-600 mt-2 font-medium">
                            This answer was revealed and is counted as NOT ANSWERED. It does not contribute to your score.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Quiz Actions */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              <div className="flex gap-3">
                {answerState === 'NOT_STARTED' || answerState === 'IN_PROGRESS' ? (
                  <>
                    <button
                      onClick={handleSkip}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handleRevealAnswer}
                      className="px-6 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition"
                    >
                      Reveal Answer
                    </button>
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="px-6 py-2"
                    >
                      Submit Answer
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleNextQuestion} className="px-6 py-2">
                    {currentQuestion < questions.length - 1 ? 'Next →' : 'Finish Quiz'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}