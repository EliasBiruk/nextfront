import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolQuizzes() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">Manage quiz library, question banks, and student quiz attempts</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Create Quiz</Button>
          <Button variant="outline">Add to Question Bank</Button>
          <Button variant="outline">Import Questions</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>History</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Quiz Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">124</div>
            <p className="text-gray-600 text-sm">Total Quizzes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">2,850</div>
            <p className="text-gray-600 text-sm">Questions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">5,420</div>
            <p className="text-gray-600 text-sm">Attempts</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">78%</div>
            <p className="text-gray-600 text-sm">Avg. Score</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">89</div>
            <p className="text-gray-600 text-sm">Published</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold">Quiz Library</div>
            <div className="text-sm text-gray-600">All quizzes</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">❓</div>
            <div className="font-semibold">Question Bank</div>
            <div className="text-sm text-gray-600">Question repository</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Results</div>
            <div className="text-sm text-gray-600">Quiz results</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="font-semibold">Analytics</div>
            <div className="text-sm text-gray-600">Performance data</div>
          </CardBody>
        </Card>
      </div>

      {/* Quiz List */}
      <Card>
        <CardBody>
          <CardTitle>Quiz Library</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Algebra Chapter 1 Quiz',
                subject: 'Mathematics',
                questions: 20,
                duration: '30 minutes',
                attempts: 145,
                avgScore: 82,
                status: 'Published',
                created: '2024-08-20',
                difficulty: 'Medium'
              },
              {
                name: 'Physics Forces Test',
                subject: 'Science',
                questions: 15,
                duration: '25 minutes',
                attempts: 98,
                avgScore: 75,
                status: 'Published',
                created: '2024-08-18',
                difficulty: 'Hard'
              },
              {
                name: 'Literature Comprehension',
                subject: 'English',
                questions: 25,
                duration: '40 minutes',
                attempts: 186,
                avgScore: 88,
                status: 'Published',
                created: '2024-08-15',
                difficulty: 'Easy'
              },
              {
                name: 'World War II Quiz',
                subject: 'History',
                questions: 18,
                duration: '35 minutes',
                attempts: 72,
                avgScore: 79,
                status: 'Draft',
                created: '2024-08-22',
                difficulty: 'Medium'
              },
              {
                name: 'Computer Science Basics',
                subject: 'Computer Science',
                questions: 22,
                duration: '45 minutes',
                attempts: 120,
                avgScore: 85,
                status: 'Published',
                created: '2024-08-10',
                difficulty: 'Medium'
              },
            ].map((quiz) => (
              <div key={quiz.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📝
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{quiz.name}</h3>
                        <Badge variant={
                          quiz.difficulty === 'Easy' ? 'success' : 
                          quiz.difficulty === 'Medium' ? 'warning' : 'danger'
                        }>
                          {quiz.difficulty}
                        </Badge>
                        <Badge variant={quiz.status === 'Published' ? 'success' : 'warning'}>
                          {quiz.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{quiz.subject}</p>
                      <p className="text-xs text-gray-400 mt-1">Created: {quiz.created} • Duration: {quiz.duration}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Questions: <span className="font-semibold">{quiz.questions}</span></span>
                        <span className="text-gray-600">Attempts: <span className="font-semibold">{quiz.attempts}</span></span>
                        <span className="text-gray-600">Avg Score: <span className="font-semibold">{quiz.avgScore}%</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Results</Button>
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