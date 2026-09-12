'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function Planner() {
  const [selectedTab, setSelectedTab] = useState('goals');

  const goals = [
    {
      id: 1,
      title: 'Complete Python Course',
      category: 'Course Completion',
      deadline: '2024-02-15',
      progress: 65,
      priority: 'high',
      tasks: [
        { id: 1, title: 'Finish Chapter 8', completed: true },
        { id: 2, title: 'Complete Chapter 9', completed: true },
        { id: 3, title: 'Submit Final Project', completed: false },
        { id: 4, title: 'Pass Final Exam', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Build Portfolio Website',
      category: 'Project',
      deadline: '2024-03-01',
      progress: 40,
      priority: 'medium',
      tasks: [
        { id: 1, title: 'Design homepage', completed: true },
        { id: 2, title: 'Create about section', completed: true },
        { id: 3, title: 'Add projects gallery', completed: false },
        { id: 4, title: 'Implement contact form', completed: false },
        { id: 5, title: 'Deploy to hosting', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Learn React Fundamentals',
      category: 'Skill Development',
      deadline: '2024-02-28',
      progress: 25,
      priority: 'high',
      tasks: [
        { id: 1, title: 'Complete basics tutorial', completed: true },
        { id: 2, title: 'Build first component', completed: false },
        { id: 3, title: 'Learn state management', completed: false },
        { id: 4, title: 'Practice with hooks', completed: false }
      ]
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Study Python Lists and Dictionaries',
      goalId: 1,
      dueDate: '2024-01-15',
      priority: 'high',
      estimatedTime: '2 hours',
      completed: false,
      timeBlock: '10:00 AM - 12:00 PM'
    },
    {
      id: 2,
      title: 'Complete JavaScript Exercise Set 3',
      goalId: 3,
      dueDate: '2024-01-16',
      priority: 'medium',
      estimatedTime: '1.5 hours',
      completed: false,
      timeBlock: '2:00 PM - 3:30 PM'
    },
    {
      id: 3,
      title: 'Review CSS Grid Concepts',
      goalId: 2,
      dueDate: '2024-01-17',
      priority: 'low',
      estimatedTime: '1 hour',
      completed: true,
      timeBlock: '9:00 AM - 10:00 AM'
    },
    {
      id: 4,
      title: 'Work on Portfolio Project',
      goalId: 2,
      dueDate: '2024-01-18',
      priority: 'high',
      estimatedTime: '3 hours',
      completed: false,
      timeBlock: '1:00 PM - 4:00 PM'
    },
    {
      id: 5,
      title: 'Read React Documentation',
      goalId: 3,
      dueDate: '2024-01-19',
      priority: 'medium',
      estimatedTime: '2 hours',
      completed: false,
      timeBlock: '11:00 AM - 1:00 PM'
    }
  ];

  const schedule = [
    { time: '9:00 AM', activity: 'Morning Review', duration: '1 hour', type: 'routine' },
    { time: '10:00 AM', activity: 'Python Study', duration: '2 hours', type: 'study' },
    { time: '12:00 PM', activity: 'Lunch Break', duration: '1 hour', type: 'break' },
    { time: '1:00 PM', activity: 'Portfolio Project', duration: '2 hours', type: 'project' },
    { time: '3:00 PM', activity: 'Exercise Practice', duration: '1.5 hours', type: 'practice' },
    { time: '4:30 PM', activity: 'Review & Notes', duration: '1 hour', type: 'review' },
    { time: '5:30 PM', activity: 'Free Time', duration: '2 hours', type: 'break' }
  ];

  const productivityTips = [
    {
      icon: '🎯',
      title: 'Set SMART Goals',
      description: 'Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound'
    },
    {
      icon: '⏰',
      title: 'Use Pomodoro Technique',
      description: 'Study in focused 25-minute intervals with 5-minute breaks'
    },
    {
      icon: '📝',
      title: 'Take Active Notes',
      description: 'Summarize concepts in your own words to improve retention'
    },
    {
      icon: '🔄',
      title: 'Spaced Repetition',
      description: 'Review material at increasing intervals for long-term memory'
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getScheduleTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      routine: 'bg-blue-100 border-blue-300',
      study: 'bg-purple-100 border-purple-300',
      project: 'bg-green-100 border-green-300',
      practice: 'bg-yellow-100 border-yellow-300',
      review: 'bg-pink-100 border-pink-300',
      break: 'bg-gray-100 border-gray-300'
    };
    return colors[type] || 'bg-gray-100 border-gray-300';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Study Planner</h1>
        <p className="text-gray-600">Manage your goals, tasks, and study schedule</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedTab('goals')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            selectedTab === 'goals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => setSelectedTab('tasks')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            selectedTab === 'tasks' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setSelectedTab('schedule')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            selectedTab === 'schedule' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Schedule
        </button>
      </div>

      {selectedTab === 'goals' && (
        <div className="space-y-6">
          {goals.map(goal => (
            <Card key={goal.id}>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{goal.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>📁 {goal.category}</span>
                      <span>📅 Due: {goal.deadline}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{goal.progress}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tasks ({goal.tasks.filter(t => t.completed).length}/{goal.tasks.length})</h4>
                  <div className="space-y-2">
                    {goal.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card>
            <CardBody>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                + Add New Goal
              </button>
            </CardBody>
          </Card>
        </div>
      )}

      {selectedTab === 'tasks' && (
        <div className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id}>
              <CardBody>
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>📅 {task.dueDate}</span>
                      <span>⏱️ {task.estimatedTime}</span>
                      <span>🕐 {task.timeBlock}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card>
            <CardBody>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                + Add New Task
              </button>
            </CardBody>
          </Card>
        </div>
      )}

      {selectedTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              <CardTitle>Today's Schedule</CardTitle>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${getScheduleTypeColor(item.type)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{item.time}</span>
                      <span className="text-sm text-gray-600">{item.duration}</span>
                    </div>
                    <div className="text-gray-900">{item.activity}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardBody>
                <CardTitle>Time Blocking</CardTitle>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Morning Block</div>
                    <div className="text-sm text-blue-700">9:00 AM - 12:00 PM</div>
                    <div className="text-sm text-gray-600">Deep work sessions</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Afternoon Block</div>
                    <div className="text-sm text-green-700">1:00 PM - 4:00 PM</div>
                    <div className="text-sm text-gray-600">Project work & practice</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Evening Block</div>
                    <div className="text-sm text-purple-700">5:00 PM - 7:00 PM</div>
                    <div className="text-sm text-gray-600">Review & planning</div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle>Productivity Tips</CardTitle>
                <div className="space-y-3">
                  {productivityTips.map((tip, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{tip.title}</div>
                        <div className="text-xs text-gray-600">{tip.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
