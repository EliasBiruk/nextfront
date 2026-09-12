'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentExercises() {
  const router = useRouter();

  const exercises = [
    {
      id: 1,
      title: 'JavaScript Array Methods',
      course: 'JavaScript Fundamentals',
      difficulty: 'Easy',
      completed: true,
      score: 95,
      timeSpent: '15 min',
      attempts: 1
    },
    {
      id: 2,
      title: 'React Component Props',
      course: 'React Development',
      difficulty: 'Medium',
      completed: true,
      score: 88,
      timeSpent: '25 min',
      attempts: 2
    },
    {
      id: 3,
      title: 'Python List Comprehensions',
      course: 'Python for Data Science',
      difficulty: 'Medium',
      completed: false,
      timeSpent: '0 min',
      attempts: 0
    },
    {
      id: 4,
      title: 'CSS Flexbox Layout',
      course: 'Web Development Basics',
      difficulty: 'Easy',
      completed: false,
      timeSpent: '0 min',
      attempts: 0
    },
    {
      id: 5,
      title: 'Async/Await Patterns',
      course: 'JavaScript Fundamentals',
      difficulty: 'Hard',
      completed: false,
      timeSpent: '0 min',
      attempts: 0
    },
    {
      id: 6,
      title: 'React Hooks useEffect',
      course: 'React Development',
      difficulty: 'Hard',
      completed: true,
      score: 92,
      timeSpent: '35 min',
      attempts: 3
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout actor="student" userName="John Smith">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exercises</h1>
        <p className="text-gray-600">Practice with hands-on coding exercises</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{exercises.length}</div>
                <div className="text-blue-100 text-sm">Total Exercises</div>
              </div>
              <div className="text-4xl opacity-80">💻</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{exercises.filter(e => e.completed).length}</div>
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
                <div className="text-3xl font-bold mb-1">
                  {Math.round(exercises.filter(e => e.completed).reduce((acc, e) => acc + (e.score || 0), 0) / exercises.filter(e => e.completed).length)}%
                </div>
                <div className="text-purple-100 text-sm">Avg Score</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {exercises.filter(e => e.completed).reduce((acc, e) => acc + (e.attempts || 0), 0)}
                </div>
                <div className="text-orange-100 text-sm">Total Attempts</div>
              </div>
              <div className="text-4xl opacity-80">🔄</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap">All Exercises</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Completed</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Pending</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Easy</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Medium</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Hard</button>
      </div>

      {/* Exercises List */}
      <Card>
        <CardBody>
          <CardTitle>Available Exercises</CardTitle>
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`p-4 border rounded-lg hover:border-blue-500 transition cursor-pointer ${
                  exercise.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:bg-blue-50'
                }`}
                onClick={() => router.push(`/student/assessments/exercise/${exercise.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                      <Badge variant={exercise.completed ? 'success' : 'default'}>
                        {exercise.completed ? 'Completed' : 'Pending'}
                      </Badge>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exercise.course}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      {exercise.completed ? (
                        <>
                          <span>📊 Score: {exercise.score}%</span>
                          <span>⏱️ {exercise.timeSpent}</span>
                          <span>🔄 {exercise.attempts} attempt{exercise.attempts > 1 ? 's' : ''}</span>
                        </>
                      ) : (
                        <>
                          <span>⏱️ Not started</span>
                          <span>🔄 0 attempts</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {exercise.completed ? (
                      <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                        Retry
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}