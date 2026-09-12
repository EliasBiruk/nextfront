import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function PerformanceAnalytics() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="student" userName="John Smith" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
              <p className="text-gray-600">Track your learning performance across courses and assessments</p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
                  <p className="text-gray-600 text-sm">Average Quiz Score</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">88%</div>
                  <p className="text-gray-600 text-sm">Exercise Success Rate</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
                  <p className="text-gray-600 text-sm">Perfect Quizzes</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2.4h</div>
                  <p className="text-gray-600 text-sm">Avg. Quiz Time</p>
                </CardBody>
              </Card>
            </div>

            {/* Quiz Performance */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Quiz Performance by Course</CardTitle>
                <div className="space-y-4">
                  {[
                    { name: 'JavaScript Fundamentals', score: 95 },
                    { name: 'React Development', score: 88 },
                    { name: 'Python for Data Science', score: 91 },
                    { name: 'Web Development Basics', score: 98 },
                  ].map((course) => (
                    <div key={course.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{course.name}</span>
                        <span className="text-gray-600">{course.score}% average</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Exercise Performance */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Exercise Performance</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Completion Rate</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
                    <p className="text-gray-600 text-sm">of exercises completed</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">First Attempt Success</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">78%</div>
                    <p className="text-gray-600 text-sm">solved on first try</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Average Attempts</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">1.3</div>
                    <p className="text-gray-600 text-sm">attempts per exercise</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Total Exercises</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
                    <p className="text-gray-600 text-sm">exercises completed</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardBody>
                <CardTitle>Skills Progress</CardTitle>
                <div className="space-y-4">
                  {[
                    { name: 'JavaScript', level: 'Advanced', progress: 85 },
                    { name: 'React', level: 'Intermediate', progress: 60 },
                    { name: 'Python', level: 'Intermediate', progress: 65 },
                    { name: 'HTML/CSS', level: 'Advanced', progress: 90 },
                    { name: 'Data Structures', level: 'Beginner', progress: 30 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-gray-600">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
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