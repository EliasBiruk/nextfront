'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function StudentGrades() {
  const gradeStats = {
    gpa: 3.8,
    weightedGpa: 4.0,
    classRank: 5,
    totalStudents: 120
  };

  const grades = [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Prof. Williams',
      grade: 'A',
      percentage: 95,
      credits: 4,
      semester: 'Fall 2026',
      assignments: [
        { name: 'Midterm', score: 92 },
        { name: 'Final', score: 95 },
        { name: 'Homework', score: 98 }
      ]
    },
    {
      id: 2,
      subject: 'Science',
      teacher: 'Dr. Johnson',
      grade: 'A-',
      percentage: 90,
      credits: 4,
      semester: 'Fall 2026',
      assignments: [
        { name: 'Lab Reports', score: 88 },
        { name: 'Quizzes', score: 92 },
        { name: 'Final Exam', score: 90 }
      ]
    },
    {
      id: 3,
      subject: 'English',
      teacher: 'Ms. Brown',
      grade: 'B+',
      percentage: 87,
      credits: 3,
      semester: 'Fall 2026',
      assignments: [
        { name: 'Essays', score: 85 },
        { name: 'Reading Comprehension', score: 90 },
        { name: 'Final Project', score: 86 }
      ]
    },
    {
      id: 4,
      subject: 'History',
      teacher: 'Mr. Davis',
      grade: 'A',
      percentage: 93,
      credits: 3,
      semester: 'Fall 2026',
      assignments: [
        { name: 'Timeline Project', score: 95 },
        { name: 'Research Paper', score: 90 },
        { name: 'Final Exam', score: 94 }
      ]
    },
    {
      id: 5,
      subject: 'Physical Education',
      teacher: 'Coach Miller',
      grade: 'A',
      percentage: 96,
      credits: 2,
      semester: 'Fall 2026',
      assignments: [
        { name: 'Participation', score: 98 },
        { name: 'Fitness Test', score: 94 },
        { name: 'Sports Skills', score: 96 }
      ]
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <DashboardLayout actor="student" userName="Student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Grades</h1>
        <p className="text-gray-600">View your grades and academic performance</p>
      </div>

      {/* Grade Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{gradeStats.gpa}</div>
                <div className="text-blue-100 text-sm">GPA</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{gradeStats.weightedGpa}</div>
                <div className="text-purple-100 text-sm">Weighted GPA</div>
              </div>
              <div className="text-4xl opacity-80">⚖️</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">#{gradeStats.classRank}</div>
                <div className="text-green-100 text-sm">Class Rank</div>
              </div>
              <div className="text-4xl opacity-80">🏆</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{gradeStats.totalStudents}</div>
                <div className="text-orange-100 text-sm">Total Students</div>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Grade Distribution</CardTitle>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {[
              { grade: 'A', count: 4, color: 'bg-green-500' },
              { grade: 'B', count: 1, color: 'bg-blue-500' },
              { grade: 'C', count: 0, color: 'bg-yellow-500' },
              { grade: 'D', count: 0, color: 'bg-orange-500' },
              { grade: 'F', count: 0, color: 'bg-red-500' }
            ].map((item) => (
              <div key={item.grade} className="text-center">
                <div className={`h-24 ${item.color} rounded-lg flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold text-xl">{item.count}</span>
                </div>
                <div className="mt-2 font-semibold text-gray-900">{item.grade}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Grades by Subject */}
      <Card>
        <CardBody>
          <CardTitle>My Grades</CardTitle>
          <div className="space-y-4">
            {grades.map((grade) => (
              <div key={grade.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{grade.subject}</h3>
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{grade.teacher} • {grade.semester}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>📊 {grade.percentage}%</span>
                      <span>🎓 {grade.credits} credits</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{grade.percentage}%</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Assignment Breakdown</div>
                  <div className="space-y-2">
                    {grade.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{assignment.name}</span>
                        <span className="font-medium">{assignment.score}%</span>
                      </div>
                    ))}
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
