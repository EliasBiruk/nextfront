'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

interface Exercise {
  id: number;
  title: string;
  course: string;
  chapter: string;
  description: string;
  problem: string;
  expectedOutput: string;
  starterCode: string;
  language: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  attempts: number;
  maxAttempts: number;
  hint?: string;
  explanation?: string;
  testCases?: {
    input: string;
    expected: string;
  }[];
}

export default function ExerciseTakingPage({ params }: { params: { exerciseId: string } }) {
  const [view, setView] = useState<'taking' | 'result'>('taking');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);

  const exercise: Exercise = {
    id: parseInt(params.exerciseId),
    title: 'JavaScript Array Methods',
    course: 'JavaScript Fundamentals',
    chapter: 'Chapter 4: Arrays',
    description: 'Practice using JavaScript array methods to manipulate data',
    problem: 'Write a function that takes an array of numbers and returns a new array with only the even numbers, doubled.',
    expectedOutput: 'Function returns array with even numbers doubled',
    starterCode: `function doubleEvens(numbers) {
  // Your code here
  return numbers;
}`,
    language: 'javascript',
    difficulty: 'Medium',
    timeLimit: 30,
    attempts: 0,
    maxAttempts: 3,
    hint: 'Use the filter() method to get even numbers, then map() to double them',
    explanation: 'The solution uses filter() to select even numbers (num % 2 === 0), then map() to double each selected number. This demonstrates chaining array methods effectively.',
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expected: '[4, 8]' },
      { input: '[10, 15, 20, 25]', expected: '[20, 40]' },
      { input: '[1, 3, 5]', expected: '[]' }
    ]
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // Simple evaluation for demo purposes
        const func = new Function('return ' + code);
        const result = func();
        
        // Test the function
        const testResults = exercise.testCases?.map(test => {
          const input = eval(test.input);
          const expected = eval(test.expected);
          const actual = result(input);
          const passed = JSON.stringify(actual) === JSON.stringify(expected);
          return { input, expected, actual, passed };
        });

        const allPassed = testResults?.every(t => t.passed);
        
        if (allPassed) {
          setOutput('✅ All tests passed!\n\n' + testResults?.map(t => 
            `Input: ${JSON.stringify(t.input)}\nExpected: ${JSON.stringify(t.expected)}\nActual: ${JSON.stringify(t.actual)}\nStatus: ${t.passed ? '✓' : '✗'}`
          ).join('\n\n'));
        } else {
          setOutput('❌ Some tests failed:\n\n' + testResults?.map(t => 
            `Input: ${JSON.stringify(t.input)}\nExpected: ${JSON.stringify(t.expected)}\nActual: ${JSON.stringify(t.actual)}\nStatus: ${t.passed ? '✓' : '✗'}`
          ).join('\n\n'));
        }
      } catch (error) {
        setOutput('❌ Error: ' + (error as Error).message);
      }
      setIsRunning(false);
    }, 1000);
  };

  const submitExercise = () => {
    // Simulate grading
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    const passed = score >= 80;
    
    setResult({
      passed,
      score,
      feedback: passed 
        ? 'Excellent work! Your solution correctly handles all test cases and follows best practices.'
        : 'Good attempt! Review the explanation and try again to improve your solution.'
    });
    setView('result');
  };

  const resetExercise = () => {
    setCode(exercise.starterCode);
    setOutput('');
    setShowHint(false);
    setShowExplanation(false);
    setResult(null);
    setView('taking');
  };

  if (view === 'taking') {
    return (
      <DashboardLayout actor="student" userName="John Smith">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>
            <Badge variant={exercise.difficulty === 'Easy' ? 'success' : exercise.difficulty === 'Medium' ? 'warning' : 'error'}>
              {exercise.difficulty}
            </Badge>
          </div>
          <p className="text-gray-600">{exercise.course} • {exercise.chapter}</p>
        </div>

        {/* Exercise Info */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Exercise Details</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>⏱️ {exercise.timeLimit} min</span>
                <span>🔄 {exercise.attempts}/{exercise.maxAttempts} attempts</span>
                <span>💻 {exercise.language}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Problem</h4>
                <p className="text-gray-700">{exercise.problem}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Expected Output</h4>
                <p className="text-gray-700">{exercise.expectedOutput}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Code Editor */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCode(exercise.starterCode)}
                  disabled={isRunning}
                >
                  🔄 Reset
                </Button>
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                >
                  {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                </Button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 px-4 py-3 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </CardBody>
        </Card>

        {/* Output */}
        {output && (
          <Card className="mb-6">
            <CardBody>
              <CardTitle>Output</CardTitle>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {output}
              </pre>
            </CardBody>
          </Card>
        )}

        {/* Hint Section */}
        <Card className="mb-6">
          <CardBody>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                💡 Show Hint
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">💡 Hint</h4>
                  <button
                    onClick={() => setShowHint(false)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Hide
                  </button>
                </div>
                <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  {exercise.hint}
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Explanation Section */}
        {showExplanation && exercise.explanation && (
          <Card className="mb-6">
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">📚 Explanation</h4>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Hide
                </button>
              </div>
              <p className="text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
                {exercise.explanation}
              </p>
            </CardBody>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? '📚 Hide Explanation' : '📚 Show Explanation'}
          </Button>
          <Button onClick={submitExercise}>
            ✅ Submit Exercise
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  if (view === 'result' && result) {
    return (
      <DashboardLayout actor="student" userName="John Smith">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Exercise Results</h1>
          <p className="text-gray-600">{exercise.title}</p>
        </div>

        {/* Result Card */}
        <Card className="mb-6">
          <CardBody>
            <div className="text-center">
              <div className={`text-6xl mb-4 ${result.passed ? 'text-green-500' : 'text-orange-500'}`}>
                {result.passed ? '🎉' : '👍'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {result.passed ? 'Excellent!' : 'Good Effort!'}
              </h2>
              <p className="text-gray-600 mb-6">{result.feedback}</p>

              <div className="max-w-md mx-auto mb-6">
                <div className="text-5xl font-bold mb-2 text-gray-900">{result.score}%</div>
                <ProgressBar progress={result.score} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-2">Test Results</h4>
                {exercise.testCases?.map((test, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-sm text-gray-600">Test {index + 1}</span>
                    <span className="text-green-600">✓ Passed</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Explanation */}
        {exercise.explanation && (
          <Card className="mb-6">
            <CardBody>
              <CardTitle>📚 Solution Explanation</CardTitle>
              <p className="text-gray-700">{exercise.explanation}</p>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Example Solution:</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`function doubleEvens(numbers) {
  return numbers
    .filter(num => num % 2 === 0)
    .map(num => num * 2);
}`}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Back to Exercises
          </Button>
          <Button onClick={resetExercise}>
            🔄 Try Again
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return null;
}
