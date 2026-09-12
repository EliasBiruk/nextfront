'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';

export default function AssessmentResultsPage() {
  const assessmentResult = {
    title: 'Python Data Structures Quiz',
    type: 'quiz',
    subject: 'Python',
    completedDate: '2024-09-05',
    timeTaken: '28 min',
    totalQuestions: 25,
    correctAnswers: 23,
    score: 92,
    grade: 'A',
    icon: '📝'
  };

  const topicBreakdown = [
    { topic: 'Lists', score: 95, classAverage: 82, questions: 6 },
    { topic: 'Dictionaries', score: 88, classAverage: 78, questions: 5 },
    { topic: 'Tuples', score: 100, classAverage: 85, questions: 4 },
    { topic: 'Sets', score: 90, classAverage: 80, questions: 4 },
    { topic: 'Comprehensions', score: 85, classAverage: 75, questions: 3 },
    { topic: 'Nested Structures', score: 90, classAverage: 70, questions: 3 }
  ];

  const questionTypeBreakdown = [
    { type: 'Multiple Choice', correct: 10, total: 12, percentage: 83 },
    { type: 'True/False', correct: 6, total: 6, percentage: 100 },
    { type: 'Fill in the Blank', correct: 4, total: 5, percentage: 80 },
    { type: 'Code Analysis', correct: 3, total: 2, percentage: 100 }
  ];

  const performanceTrend = [
    { date: 'Aug 15', score: 78, assessment: 'Python Basics' },
    { date: 'Aug 22', score: 85, assessment: 'Python Functions' },
    { date: 'Aug 29', score: 88, assessment: 'Python OOP' },
    { date: 'Sep 5', score: 92, assessment: 'Data Structures' }
  ];

  const comparisonData = {
    yourScore: 92,
    classAverage: 81,
    topScore: 98,
    medianScore: 84,
    percentile: 85
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  const getComparisonColor = (yourScore: number, comparison: number) => {
    if (yourScore >= comparison) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessment Results</h1>
        <p className="text-gray-600">Detailed performance analysis and insights.</p>
      </div>

      {/* Back Button */}
      <Link
        href="/student/assessments/completed"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        ← Back to Completed Assessments
      </Link>

      {/* Assessment Overview */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-start gap-6">
            <div className="text-6xl">{assessmentResult.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{assessmentResult.title}</h2>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  {assessmentResult.grade}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{assessmentResult.subject}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Score</div>
                  <div className="text-2xl font-bold text-gray-900">{assessmentResult.score}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Correct Answers</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {assessmentResult.correctAnswers}/{assessmentResult.totalQuestions}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Time Taken</div>
                  <div className="text-2xl font-bold text-gray-900">{assessmentResult.timeTaken}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-2xl font-bold text-gray-900">{assessmentResult.completedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Class Comparison */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Class Comparison</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 mb-1">Your Score</div>
              <div className="text-3xl font-bold text-blue-900">{comparisonData.yourScore}%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Class Average</div>
              <div className={`text-3xl font-bold ${getComparisonColor(comparisonData.yourScore, comparisonData.classAverage)}`}>
                {comparisonData.classAverage}%
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-600 mb-1">Top Score</div>
              <div className="text-3xl font-bold text-purple-900">{comparisonData.topScore}%</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 mb-1">Your Percentile</div>
              <div className="text-3xl font-bold text-green-900">{comparisonData.percentile}%</div>
            </div>
          </div>

          {/* Score Distribution Visual */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">Score Distribution</div>
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-green-500 rounded-full"
                style={{ left: '0%', width: '15%' }}
              ></div>
              <div 
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ left: '15%', width: '35%' }}
              ></div>
              <div 
                className="absolute h-full bg-yellow-500 rounded-full"
                style={{ left: '50%', width: '30%' }}
              ></div>
              <div 
                className="absolute h-full bg-red-500 rounded-full"
                style={{ left: '80%', width: '20%' }}
              ></div>
              {/* Your position marker */}
              <div 
                className="absolute h-full w-1 bg-black"
                style={{ left: `${comparisonData.yourScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 bg-black"></div>
              <span className="text-sm text-gray-600">Your position</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Topic Breakdown */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Performance by Topic</CardTitle>
          <div className="space-y-4">
            {topicBreakdown.map((topic, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{topic.topic}</span>
                    <span className="text-sm text-gray-500">({topic.questions} questions)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Your Score</div>
                      <div className="font-bold text-gray-900">{topic.score}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Class Avg</div>
                      <div className={`font-bold ${getComparisonColor(topic.score, topic.classAverage)}`}>
                        {topic.classAverage}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ProgressBar progress={topic.score} color={getScoreColor(topic.score)} />
                  </div>
                  <div>
                    <ProgressBar progress={topic.classAverage} color="blue" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Question Type Breakdown */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Performance by Question Type</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questionTypeBreakdown.map((type, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{type.type}</span>
                  <span className="text-sm text-gray-600">
                    {type.correct}/{type.total} correct
                  </span>
                </div>
                <ProgressBar progress={type.percentage} color={getScoreColor(type.percentage)} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Performance Trend */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Performance Trend</CardTitle>
          <div className="space-y-4">
            {performanceTrend.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-500">{data.date}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{data.assessment}</span>
                    <span className="text-sm font-bold text-gray-900">{data.score}%</span>
                  </div>
                  <ProgressBar progress={data.score} color={getScoreColor(data.score)} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Trend Summary */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📈</span>
              <span className="font-semibold text-green-900">Improvement Trend</span>
            </div>
            <div className="text-green-800">
              Your scores have improved by <span className="font-bold">+14%</span> over the past month.
              Keep up the great work!
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recommendations */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Recommendations</CardTitle>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-medium text-blue-900">Focus on Comprehensions</div>
                <div className="text-sm text-blue-700">
                  Your score in list comprehensions was 85%. Review the advanced comprehension patterns to improve further.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="font-medium text-green-900">Excellent in Tuples</div>
                <div className="text-sm text-green-700">
                  You scored 100% on tuple questions. Consider helping peers who struggle with this topic.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl">📚</div>
              <div>
                <div className="font-medium text-purple-900">Practice Nested Structures</div>
                <div className="text-sm text-purple-700">
                  Try more exercises with nested dictionaries and lists to strengthen your understanding.
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/student/learning"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Continue Learning
        </Link>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
          Download Report
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
          Share Results
        </button>
      </div>
    </DashboardLayout>
  );
}
