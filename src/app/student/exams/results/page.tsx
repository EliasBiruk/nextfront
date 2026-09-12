'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function ExamResults() {
  const examResults = [
    {
      examId: 1,
      title: 'Python Basics Assessment',
      course: 'Python for Data Science',
      attemptNumber: 1,
      date: 'November 20, 2026',
      overallScore: 85,
      grade: 'A',
      status: 'passed',
      classAverage: 72,
      percentile: 78,
      sectionBreakdown: [
        { section: 'Variables & Data Types', score: 90, maxScore: 100, weight: 20 },
        { section: 'Control Flow', score: 85, maxScore: 100, weight: 25 },
        { section: 'Functions', score: 88, maxScore: 100, weight: 25 },
        { section: 'Data Structures', score: 78, maxScore: 100, weight: 30 },
      ],
      topicPerformance: [
        { topic: 'Lists', score: 95, classAverage: 80 },
        { topic: 'Dictionaries', score: 88, classAverage: 75 },
        { topic: 'Loops', score: 82, classAverage: 70 },
        { topic: 'Functions', score: 88, classAverage: 68 },
        { topic: 'Error Handling', score: 72, classAverage: 65 },
      ],
      scoreDistribution: [
        { range: '90-100', count: 5, studentIn: false },
        { range: '80-89', count: 12, studentIn: true },
        { range: '70-79', count: 18, studentIn: false },
        { range: '60-69', count: 10, studentIn: false },
        { range: 'Below 60', count: 5, studentIn: false },
      ],
      previousAttempts: [],
      recommendations: [
        'Focus on error handling concepts',
        'Practice more with nested data structures',
        'Review exception handling patterns',
      ],
    },
    {
      examId: 2,
      title: 'React Components Quiz',
      course: 'React Development',
      attemptNumber: 2,
      date: 'November 12, 2026',
      overallScore: 65,
      grade: 'D',
      status: 'failed',
      classAverage: 78,
      percentile: 25,
      sectionBreakdown: [
        { section: 'Component Basics', score: 75, maxScore: 100, weight: 20 },
        { section: 'State Management', score: 55, maxScore: 100, weight: 30 },
        { section: 'Props & Context', score: 60, maxScore: 100, weight: 25 },
        { section: 'Hooks', score: 70, maxScore: 100, weight: 25 },
      ],
      topicPerformance: [
        { topic: 'useState', score: 68, classAverage: 80 },
        { topic: 'useEffect', score: 72, classAverage: 75 },
        { topic: 'Context API', score: 55, classAverage: 70 },
        { topic: 'Custom Hooks', score: 60, classAverage: 65 },
        { topic: 'Redux Basics', score: 58, classAverage: 72 },
      ],
      scoreDistribution: [
        { range: '90-100', count: 8, studentIn: false },
        { range: '80-89', count: 15, studentIn: false },
        { range: '70-79', count: 12, studentIn: false },
        { range: '60-69', count: 8, studentIn: true },
        { range: 'Below 60', count: 7, studentIn: false },
      ],
      previousAttempts: [
        { attemptNumber: 1, date: 'November 10, 2026', score: 58 },
      ],
      recommendations: [
        'Deep dive into State Management patterns',
        'Practice Context API implementation',
        'Review Redux fundamentals',
        'Complete additional practice exercises',
        'Attend office hours for clarification',
      ],
    },
    {
      examId: 3,
      title: 'Data Structures Final',
      course: 'Computer Science Fundamentals',
      attemptNumber: 2,
      date: 'October 28, 2026',
      overallScore: 88,
      grade: 'A',
      status: 'passed',
      classAverage: 75,
      percentile: 85,
      sectionBreakdown: [
        { section: 'Arrays & Linked Lists', score: 92, maxScore: 100, weight: 25 },
        { section: 'Stacks & Queues', score: 90, maxScore: 100, weight: 20 },
        { section: 'Trees', score: 85, maxScore: 100, weight: 30 },
        { section: 'Graphs', score: 84, maxScore: 100, weight: 25 },
      ],
      topicPerformance: [
        { topic: 'Array Operations', score: 95, classAverage: 82 },
        { topic: 'Linked Lists', score: 88, classAverage: 75 },
        { topic: 'Binary Trees', score: 85, classAverage: 70 },
        { topic: 'Graph Traversal', score: 84, classAverage: 68 },
        { topic: 'Sorting Algorithms', score: 90, classAverage: 78 },
      ],
      scoreDistribution: [
        { range: '90-100', count: 10, studentIn: false },
        { range: '80-89', count: 15, studentIn: true },
        { range: '70-79', count: 20, studentIn: false },
        { range: '60-69', count: 8, studentIn: false },
        { range: 'Below 60', count: 7, studentIn: false },
      ],
      previousAttempts: [
        { attemptNumber: 1, date: 'October 25, 2026', score: 78 },
      ],
      recommendations: [
        'Excellent performance overall',
        'Consider advanced data structures course',
        'Help peers with graph concepts',
      ],
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    if (score >= 60) return 'orange';
    return 'red';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exam Results</h1>
        <p className="text-gray-600">View detailed exam results and performance analytics</p>
      </div>

      {/* Overall Performance Summary */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Overall Performance Summary</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {examResults.filter(r => r.status === 'passed').length}
              </div>
              <div className="text-sm text-green-600">Exams Passed</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {Math.round(examResults.reduce((sum, r) => sum + r.overallScore, 0) / examResults.length)}%
              </div>
              <div className="text-sm text-blue-600">Average Score</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {Math.round(examResults.reduce((sum, r) => sum + r.percentile, 0) / examResults.length)}th
              </div>
              <div className="text-sm text-purple-600">Avg Percentile</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {Math.round(examResults.reduce((sum, r) => sum + r.classAverage, 0) / examResults.length)}%
              </div>
              <div className="text-sm text-yellow-600">Class Average</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Detailed Results */}
      <div className="space-y-6">
        {examResults.map((result) => (
          <Card key={result.examId}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{result.title}</h3>
                  <p className="text-sm text-gray-600">{result.course}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Attempt {result.attemptNumber} • {result.date}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={result.status === 'passed' ? 'success' : 'danger'}>
                    {result.status === 'passed' ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              </div>

              {/* Overall Score */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Your Score</div>
                  <div className="text-3xl font-bold text-blue-700">{result.overallScore}%</div>
                  <div className={`text-lg font-semibold ${getGradeColor(result.grade)}`}>
                    Grade: {result.grade}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Class Average</div>
                  <div className="text-3xl font-bold text-gray-700">{result.classAverage}%</div>
                  <div className="text-sm text-gray-500">
                    {result.overallScore >= result.classAverage ? 'Above Average' : 'Below Average'}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 mb-1">Percentile</div>
                  <div className="text-3xl font-bold text-purple-700">{result.percentile}th</div>
                  <div className="text-sm text-purple-500">
                    {result.percentile >= 50 ? 'Top Half' : 'Bottom Half'}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">Performance</div>
                  <div className="text-3xl font-bold text-green-700">
                    {result.overallScore >= 70 ? 'Good' : 'Needs Work'}
                  </div>
                  <div className="text-sm text-green-500">
                    {result.overallScore - result.classAverage >= 0 ? '+' : ''}
                    {result.overallScore - result.classAverage}% vs avg
                  </div>
                </div>
              </div>

              {/* Section Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Performance by Section</h4>
                <div className="space-y-3">
                  {result.sectionBreakdown.map((section, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{section.section}</span>
                        <span className="text-gray-600">
                          {section.score}% (Weight: {section.weight}%)
                        </span>
                      </div>
                      <ProgressBar
                        progress={section.score}
                        color={getScoreColor(section.score)}
                        showLabel={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Performance Comparison */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Topic Performance vs Class Average</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.topicPerformance.map((topic, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{topic.topic}</span>
                        <div className="flex gap-2 text-sm">
                          <span className="text-blue-600 font-semibold">{topic.score}%</span>
                          <span className="text-gray-400">vs</span>
                          <span className="text-gray-600">{topic.classAverage}%</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <ProgressBar
                          progress={topic.score}
                          color={getScoreColor(topic.score)}
                          showLabel={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Distribution */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Score Distribution</h4>
                <div className="flex items-end gap-2 h-32">
                  {result.scoreDistribution.map((dist, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full rounded-t ${
                          dist.studentIn ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        style={{ height: `${(dist.count / 20) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-1">{dist.range}</div>
                      <div className="text-xs text-gray-500">{dist.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Trend */}
              {result.previousAttempts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Performance Trend</h4>
                  <div className="flex items-end gap-4 h-24 p-4 bg-gray-50 rounded-lg">
                    {result.previousAttempts.map((attempt, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-12 bg-gray-400 rounded-t"
                          style={{ height: `${attempt.score}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-2">
                          #{attempt.attemptNumber}
                        </div>
                        <div className="text-xs text-gray-500">{attempt.score}%</div>
                      </div>
                    ))}
                    <div className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-12 rounded-t ${
                          result.status === 'passed' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ height: `${result.overallScore}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">
                        #{result.attemptNumber}
                      </div>
                      <div className="text-xs text-gray-500">{result.overallScore}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-3">Recommendations for Improvement</h4>
                <div className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {result.previousAttempts.length + 1} total attempt(s)
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Download Report</Button>
                  <Button variant="outline" size="sm">View Detailed Analysis</Button>
                  {result.status === 'failed' && (
                    <Button size="sm">Schedule Retake</Button>
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
