import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolAnalytics() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Comprehensive school analytics and performance insights</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>Generate Report</Button>
          <Button variant="outline">Export Data</Button>
          <Button variant="outline">Schedule Reports</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Academic Year 2024-2025</option>
            <option>Academic Year 2023-2024</option>
            <option>Academic Year 2022-2023</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Total Students</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">92.5%</div>
            <p className="text-gray-600 text-sm">Attendance Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">85%</div>
            <p className="text-gray-600 text-sm">Pass Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">3.7</div>
            <p className="text-gray-600 text-sm">Avg. GPA</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">75%</div>
            <p className="text-gray-600 text-sm">Fee Collection</p>
          </CardBody>
        </Card>
      </div>

      {/* Analytics Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <div className="font-semibold">Student Analytics</div>
            <div className="text-sm text-gray-600">Student performance</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Academic Analytics</div>
            <div className="text-sm text-gray-600">Academic metrics</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold">Attendance Analytics</div>
            <div className="text-sm text-gray-600">Attendance trends</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold">Finance Analytics</div>
            <div className="text-sm text-gray-600">Financial insights</div>
          </CardBody>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Key Performance Metrics</CardTitle>
          <div className="space-y-4">
            {[
              {
                metric: 'Student Enrollment',
                current: 2450,
                target: 2500,
                change: '+5.2%',
                trend: 'up',
                status: 'On Track'
              },
              {
                metric: 'Average GPA',
                current: 3.7,
                target: 3.8,
                change: '+0.1',
                trend: 'up',
                status: 'Good'
              },
              {
                metric: 'Attendance Rate',
                current: 92.5,
                target: 95,
                change: '-1.5%',
                trend: 'down',
                status: 'Needs Attention'
              },
              {
                metric: 'Fee Collection Rate',
                current: 75,
                target: 90,
                change: '+2.3%',
                trend: 'up',
                status: 'Below Target'
              },
              {
                metric: 'Teacher Satisfaction',
                current: 4.2,
                target: 4.5,
                change: '+0.2',
                trend: 'up',
                status: 'Good'
              },
            ].map((metric) => (
              <div key={metric.metric} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📊
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{metric.metric}</h3>
                        <Badge variant={
                          metric.status === 'On Track' ? 'success' : 
                          metric.status === 'Good' ? 'success' : 
                          metric.status === 'Needs Attention' ? 'warning' : 'danger'
                        }>
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Current: <span className="font-semibold">{metric.current}</span></span>
                        <span className="text-gray-600">Target: <span className="font-semibold">{metric.target}</span></span>
                        <span className={`font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Progress to Target</span>
                          <span className="text-sm font-semibold">{Math.round((metric.current / metric.target) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${
                            (metric.current / metric.target) >= 0.9 ? 'bg-green-600' : 
                            (metric.current / metric.target) >= 0.75 ? 'bg-blue-600' : 
                            (metric.current / metric.target) >= 0.5 ? 'bg-yellow-600' : 'bg-red-600'
                          }`} style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Drill Down</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Insights */}
      <Card>
        <CardBody>
          <CardTitle>Recent Insights & Alerts</CardTitle>
          <div className="space-y-4">
            {[
              {
                type: 'Alert',
                severity: 'High',
                message: 'Attendance rate in Class 9-C dropped below 80% this week',
                date: '2024-08-25',
                action: 'Review'
              },
              {
                type: 'Insight',
                severity: 'Medium',
                message: 'Mathematics performance improved by 15% in 10th grade',
                date: '2024-08-24',
                action: 'Analyze'
              },
              {
                type: 'Alert',
                severity: 'Medium',
                message: 'Fee collection for September is 15% below target',
                date: '2024-08-23',
                action: 'Follow Up'
              },
              {
                type: 'Insight',
                severity: 'Low',
                message: 'Library book borrowing increased by 20% this month',
                date: '2024-08-22',
                action: 'Monitor'
              },
            ].map((insight) => (
              <div key={insight.message} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {insight.type === 'Alert' ? '⚠️' : '💡'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{insight.type}</h3>
                        <Badge variant={
                          insight.severity === 'High' ? 'danger' : 
                          insight.severity === 'Medium' ? 'warning' : 'info'
                        }>
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                      <p className="text-xs text-gray-400 mt-1">Date: {insight.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">{insight.action}</Button>
                    <Button variant="outline" size="sm">Dismiss</Button>
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