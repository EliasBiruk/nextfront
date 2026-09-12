'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import { useState } from 'react';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    dailyGoal: 5,
    weeklyGoal: 20,
    studyTime: 'evening',
    reminderTime: '09:00',
    reminderFrequency: 'daily',
    difficulty: 'intermediate',
    autoRecommendations: true,
  });

  const handleSave = () => {
    console.log('Preferences saved:', preferences);
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Preferences</h1>
        <p className="text-gray-600">Customize your learning experience and goals</p>
      </div>

      {/* Learning Goals */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Learning Goals</CardTitle>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Study Goal (hours)</label>
              <input
                type="number"
                value={preferences.dailyGoal}
                onChange={(e) => setPreferences({...preferences, dailyGoal: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Study Goal (hours)</label>
              <input
                type="number"
                value={preferences.weeklyGoal}
                onChange={(e) => setPreferences({...preferences, weeklyGoal: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="5"
                max="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Time</label>
              <select
                value={preferences.studyTime}
                onChange={(e) => setPreferences({...preferences, studyTime: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="morning">Morning (6AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 12AM)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Reminders */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Study Reminders</CardTitle>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Time</label>
              <input
                type="time"
                value={preferences.reminderTime}
                onChange={(e) => setPreferences({...preferences, reminderTime: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Frequency</label>
              <select
                value={preferences.reminderFrequency}
                onChange={(e) => setPreferences({...preferences, reminderFrequency: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="everyFewDays">Every few days</option>
                <option value="weekly">Weekly</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Content Preferences */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Content Preferences</CardTitle>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Difficulty Level</label>
              <select
                value={preferences.difficulty}
                onChange={(e) => setPreferences({...preferences, difficulty: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Auto-Recommendations</div>
                <div className="text-sm text-gray-600">Get personalized course recommendations</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={preferences.autoRecommendations} onChange={(e) => setPreferences({...preferences, autoRecommendations: e.target.checked})} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Current Week Progress</CardTitle>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Daily Goal</span>
                <span className="text-sm text-gray-600">3/5 hours</span>
              </div>
              <ProgressBar progress={60} color="blue" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Weekly Goal</span>
                <span className="text-sm text-gray-600">12/20 hours</span>
              </div>
              <ProgressBar progress={60} color="green" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Preferences
        </button>
      </div>
    </DashboardLayout>
  );
}