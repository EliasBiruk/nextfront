'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  language: string;
  requirements: string[];
  submissions: number;
  author: string;
}

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solution, setSolution] = useState('');
  const [attempts, setAttempts] = useState<number[]>([]);

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Hello World',
      description: 'Write a program that prints "Hello, World!" to the console.',
      difficulty: 'easy',
      points: 10,
      language: 'javascript',
      requirements: [
        'Print exactly "Hello, World!"',
        'Use console.log()',
        'No extra characters'
      ],
      submissions: 1250,
      author: 'Admin'
    },
    {
      id: '2',
      title: 'Array Sum',
      description: 'Write a function that takes an array of numbers and returns their sum.',
      difficulty: 'easy',
      points: 15,
      language: 'javascript',
      requirements: [
        'Function should accept an array',
        'Return the sum of all numbers',
        'Handle empty arrays'
      ],
      submissions: 890,
      author: 'Instructor Smith'
    },
    {
      id: '3',
      title: 'Palindrome Checker',
      description: 'Create a function that checks if a string is a palindrome.',
      difficulty: 'medium',
      points: 25,
      language: 'javascript',
      requirements: [
        'Case-insensitive check',
        'Ignore spaces and punctuation',
        'Return boolean'
      ],
      submissions: 567,
      author: 'Admin'
    },
    {
      id: '4',
      title: 'React Counter',
      description: 'Build a React component with increment and decrement buttons.',
      difficulty: 'medium',
      points: 30,
      language: 'react',
      requirements: [
        'Use useState hook',
        'Display current count',
        'Prevent negative numbers'
      ],
      submissions: 423,
      author: 'Instructor Johnson'
    },
    {
      id: '5',
      title: 'Data Processing',
      description: 'Process a dataset using Python and calculate statistics.',
      difficulty: 'hard',
      points: 50,
      language: 'python',
      requirements: [
        'Read data from list',
        'Calculate mean, median, mode',
        'Handle edge cases'
      ],
      submissions: 156,
      author: 'Admin'
    },
    {
      id: '6',
      title: 'CSS Animation',
      description: 'Create a smooth CSS animation with keyframes.',
      difficulty: 'medium',
      points: 20,
      language: 'css',
      requirements: [
        'Use @keyframes',
        'Smooth transitions',
        'Responsive design'
      ],
      submissions: 312,
      author: 'Instructor Davis'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 450, challenges: 12 },
    { rank: 2, name: 'Sarah Kim', points: 420, challenges: 11 },
    { rank: 3, name: 'Mike Johnson', points: 380, challenges: 10 },
    { rank: 4, name: 'Kapi', points: 350, challenges: 9 },
    { rank: 5, name: 'Emma Wilson', points: 320, challenges: 8 }
  ];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  const handleSubmitSolution = () => {
    if (!solution.trim()) {
      alert('Please enter your solution');
      return;
    }
    // Simulate submission
    const newAttempt = attempts.length + 1;
    setAttempts([...attempts, newAttempt]);
    alert('Solution submitted! In production, this would be evaluated.');
    setSolution('');
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Coding Challenges</h1>
        <p className="text-gray-600">Test your skills with coding challenges posted by instructors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter */}
          <Card>
            <CardBody className="py-3">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm font-medium text-gray-700">Filter:</span>
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Easy</Button>
                <Button variant="outline" size="sm">Medium</Button>
                <Button variant="outline" size="sm">Hard</Button>
                <Button variant="outline" size="sm">JavaScript</Button>
                <Button variant="outline" size="sm">React</Button>
                <Button variant="outline" size="sm">Python</Button>
              </div>
            </CardBody>
          </Card>

          {/* Challenge Cards */}
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`cursor-pointer transition-all ${
                selectedChallenge?.id === challenge.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <CardBody>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {challenge.points} pts
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>👤 {challenge.author}</span>
                      <span>📝 {challenge.submissions} submissions</span>
                      <span>💻 {challenge.language}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">Start</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Challenge Details */}
          {selectedChallenge && (
            <Card>
              <CardBody>
                <CardTitle>Challenge Details</CardTitle>
                <h3 className="font-semibold text-lg mb-2">{selectedChallenge.title}</h3>
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[selectedChallenge.difficulty]}`}>
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {selectedChallenge.points} pts
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{selectedChallenge.description}</p>
                
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {selectedChallenge.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      {req}
                    </li>
                  ))}
                </ul>

                <Link href={`/student/playground/${selectedChallenge.language}`}>
                  <Button variant="primary" className="w-full">Open in Playground</Button>
                </Link>
              </CardBody>
            </Card>
          )}

          {/* Past Attempts */}
          {attempts.length > 0 && (
            <Card>
              <CardBody>
                <CardTitle>Past Attempts</CardTitle>
                <div className="space-y-2">
                  {attempts.map((attempt, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Attempt #{attempt}</span>
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Leaderboard */}
          <Card>
            <CardBody>
              <CardTitle>🏆 Leaderboard</CardTitle>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex justify-between items-center p-2 rounded ${
                      entry.name === 'Kapi' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700">#{entry.rank}</span>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600">{entry.points} pts</div>
                      <div className="text-xs text-gray-500">{entry.challenges} challenges</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Your Stats */}
          <Card>
            <CardBody>
              <CardTitle>Your Stats</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-semibold">350</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Challenges Completed:</span>
                  <span className="font-semibold">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Rank:</span>
                  <span className="font-semibold">#4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold">75%</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
