'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { useState, useEffect } from 'react';

interface Exam {
  id: number;
  title: string;
  course: string;
  date: string;
  duration: string;
  questions: number;
  passingScore: number;
  attempts: number;
  status: 'available' | 'completed' | 'locked';
  description?: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function StudentExams() {
  const [view, setView] = useState<'list' | 'detail' | 'taking' | 'result'>('list');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(null);

  const exams: Exam[] = [
    {
      id: 1,
      title: 'JavaScript Fundamentals Final Exam',
      course: 'JavaScript Fundamentals',
      date: 'Available until Dec 15, 2026',
      duration: '2 hours',
      questions: 50,
      passingScore: 70,
      attempts: 3,
      status: 'available',
      description: 'This exam covers all fundamental JavaScript concepts including variables, functions, arrays, objects, DOM manipulation, and async programming.',
    },
    {
      id: 2,
      title: 'Web Development Comprehensive',
      course: 'Web Development Basics',
      date: 'Available until Dec 20, 2026',
      duration: '3 hours',
      questions: 75,
      passingScore: 75,
      attempts: 2,
      status: 'available',
      description: 'Comprehensive exam covering HTML, CSS, JavaScript, and modern web development practices.',
    },
  ];

  const examHistory = [
    {
      title: 'Python Basics Assessment',
      course: 'Python for Data Science',
      date: 'Nov 20, 2026',
      score: 85,
      status: 'passed',
      attempts: 1
    },
    {
      title: 'HTML/CSS Fundamentals',
      course: 'Web Development Basics',
      date: 'Nov 15, 2026',
      score: 92,
      status: 'passed',
      attempts: 1
    },
    {
      title: 'React Components Quiz',
      course: 'React Development',
      date: 'Nov 10, 2026',
      score: 65,
      status: 'failed',
      attempts: 2
    },
  ];

  const mockQuestions: Question[] = [
    {
      id: 1,
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Which method is used to add an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswer: 0
    },
    {
      id: 3,
      question: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Digital Object Model'],
      correctAnswer: 0
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === 'taking' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [view, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewDetail = (exam: Exam) => {
    setSelectedExam(exam);
    setView('detail');
  };

  const handleStartExam = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(7200);
    setView('taking');
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({...answers, [questionId]: answerIndex});
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    mockQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / mockQuestions.length) * 100);
    const passed = score >= (selectedExam?.passingScore || 70);
    setExamResult({ score, passed });
    setView('result');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedExam(null);
    setCurrentQuestion(0);
    setAnswers({});
    setExamResult(null);
  };

  // Exam Detail View
  if (view === 'detail' && selectedExam) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Exams
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedExam.title}</h1>
          <p className="text-gray-600">{selectedExam.course}</p>
        </div>

        <Card className="mb-6">
          <CardBody>
            <CardTitle>Exam Information</CardTitle>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedExam.description}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold">{selectedExam.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Questions</div>
                  <div className="font-semibold">{selectedExam.questions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Passing Score</div>
                  <div className="font-semibold">{selectedExam.passingScore}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Attempts</div>
                  <div className="font-semibold">{selectedExam.attempts} remaining</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <CardTitle>Exam Rules</CardTitle>
            <ul className="space-y-2 text-gray-600">
              <li>• You have {selectedExam.duration} to complete the exam</li>
              <li>• Once started, the timer cannot be paused</li>
              <li>• You can navigate between questions and change answers</li>
              <li>• Submit your answers before time runs out</li>
              <li>• {selectedExam.attempts} attempts are available</li>
            </ul>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleStartExam}>Start Exam</Button>
          <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // Exam Taking View
  if (view === 'taking' && selectedExam) {
    const question = mockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedExam.title}</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {mockQuestions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeRemaining)}</div>
              <div className="text-sm text-gray-500">Time Remaining</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition ${
                    answers[question.id] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[question.id] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {answers[question.id] === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentQuestion === mockQuestions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Exam</Button>
          ) : (
            <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Next
            </button>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Exam Result View
  if (view === 'result' && examResult && selectedExam) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Exams
          </button>
        </div>

        <Card className="mb-6">
          <CardBody className="text-center py-12">
            <div className={`text-6xl mb-4 ${examResult.passed ? '🎉' : '😢'}`}></div>
            <h1 className="text-3xl font-bold mb-2">
              {examResult.passed ? 'Congratulations!' : 'Keep Trying!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {examResult.passed
                ? 'You have successfully passed the exam.'
                : 'You did not meet the passing score. Review the material and try again.'}
            </p>
            <div className="inline-block p-8 bg-gray-50 rounded-lg mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">{examResult.score}%</div>
              <div className="text-gray-600">Your Score</div>
            </div>
            <div className="text-sm text-gray-500">
              Passing score: {selectedExam.passingScore}%
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleBackToList}>Back to Exams</Button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Review Answers
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // Exam List View
  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Formal Examinations</h1>
        <p className="text-gray-600">View and take formal examinations</p>
      </div>

      {/* Available Exams */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Available Exams</CardTitle>
          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer" onClick={() => handleViewDetail(exam)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.course}</p>
                  </div>
                  <Badge variant="info">Available</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div>📅 {exam.date}</div>
                  <div>⏱️ {exam.duration}</div>
                  <div>❓ {exam.questions} questions</div>
                  <div>🎯 {exam.passingScore}% to pass</div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{exam.attempts} attempts remaining</span>
                  <Button onClick={(e) => { e.stopPropagation(); handleViewDetail(exam); }}>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Exam History */}
      <Card>
        <CardBody>
          <CardTitle>Exam History</CardTitle>
          <div className="space-y-4">
            {examHistory.map((exam) => (
              <div key={exam.title} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.course}</p>
                  </div>
                  <Badge variant={exam.status === 'passed' ? 'success' : 'danger'}>
                    {exam.status === 'passed' ? 'Passed' : 'Failed'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{exam.date} • {exam.attempts} attempt(s)</span>
                  <span className="font-semibold">{exam.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}