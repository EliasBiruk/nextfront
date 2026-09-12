'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function ReadingHistory() {
  const readingHistory = [
    {
      id: 1,
      title: 'The Future of AI in Education',
      category: 'Technology',
      topic: 'Artificial Intelligence',
      readTime: '4 min',
      readDate: '2024-01-15',
      readTimeStr: '10:30 AM',
      progress: 100,
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Learning While Working: Time Management Tips',
      category: 'Productivity',
      topic: 'Time Management',
      readTime: '6 min',
      readDate: '2024-01-14',
      readTimeStr: '2:15 PM',
      progress: 75,
      icon: '⏰'
    },
    {
      id: 3,
      title: 'Breaking into Tech Without a CS Degree',
      category: 'Career',
      topic: 'Career Development',
      readTime: '8 min',
      readDate: '2024-01-13',
      readTimeStr: '9:00 AM',
      progress: 100,
      icon: '💼'
    },
    {
      id: 4,
      title: 'The Science of Effective Learning',
      category: 'Learning',
      topic: 'Learning Science',
      readTime: '5 min',
      readDate: '2024-01-12',
      readTimeStr: '4:45 PM',
      progress: 100,
      icon: '🧠'
    },
    {
      id: 5,
      title: 'Building a Portfolio That Gets Hired',
      category: 'Career',
      topic: 'Portfolio Development',
      readTime: '7 min',
      readDate: '2024-01-11',
      readTimeStr: '11:20 AM',
      progress: 50,
      icon: '📁'
    },
    {
      id: 6,
      title: 'Mastering Remote Work Collaboration',
      category: 'Productivity',
      topic: 'Remote Work',
      readTime: '6 min',
      readDate: '2024-01-10',
      readTimeStr: '3:30 PM',
      progress: 100,
      icon: '💻'
    }
  ];

  const readingStats = {
    totalStoriesRead: 47,
    totalReadingTime: 312, // in minutes
    favoriteTopics: [
      { topic: 'Career Development', count: 12 },
      { topic: 'Technology', count: 10 },
      { topic: 'Productivity', count: 8 },
      { topic: 'Learning Science', count: 7 }
    ]
  };

  const readingStreak = {
    currentStreak: 14,
    longestStreak: 21,
    totalDays: 89
  };

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Read your first story', icon: '🎯', unlocked: true },
    { id: 2, name: 'Bookworm', description: 'Read 10 stories', icon: '📚', unlocked: true },
    { id: 3, name: 'Dedicated Reader', description: 'Read 25 stories', icon: '🏆', unlocked: true },
    { id: 4, name: 'Streak Master', description: '7-day reading streak', icon: '🔥', unlocked: true },
    { id: 5, name: 'Consistency King', description: '14-day reading streak', icon: '👑', unlocked: true },
    { id: 6, name: 'Story Expert', description: 'Read 50 stories', icon: '⭐', unlocked: false },
    { id: 7, name: 'Month Long', description: '30-day reading streak', icon: '📅', unlocked: false },
    { id: 8, name: 'Legend', description: '100 stories read', icon: '🌟', unlocked: false }
  ];

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reading History</h1>
        <p className="text-gray-600">Track your reading journey and achievements</p>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">{readingStats.totalStoriesRead}</div>
            <div className="text-sm text-gray-600">Stories Read</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">
              {Math.floor(readingStats.totalReadingTime / 60)}h {readingStats.totalReadingTime % 60}m
            </div>
            <div className="text-sm text-gray-600">Total Reading Time</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-purple-600">{readingStreak.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak 🔥</div>
          </CardBody>
        </Card>
      </div>

      {/* Reading Streak Card */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Reading Streak</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">{readingStreak.currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">{readingStreak.longestStreak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">{readingStreak.totalDays}</div>
              <div className="text-sm text-gray-600">Total Days Active</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Favorite Topics */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Favorite Topics</CardTitle>
          <div className="space-y-3">
            {readingStats.favoriteTopics.map((topic, index) => (
              <div key={topic.topic} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">{topic.topic}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(topic.count / readingStats.favoriteTopics[0].count) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">{topic.count} stories</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Achievements */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Achievements</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 text-center ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-sm mb-1">{achievement.name}</div>
                <div className="text-xs text-gray-600">{achievement.description}</div>
                {achievement.unlocked && (
                  <Badge variant="success" size="sm" className="mt-2">Unlocked</Badge>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Reading History */}
      <Card>
        <CardBody>
          <CardTitle>Recent Reading History</CardTitle>
          <div className="space-y-4">
            {readingHistory.map((story) => (
              <div key={story.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="text-3xl">{story.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="font-semibold">{story.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Badge variant="default" size="sm">{story.category}</Badge>
                        <span>🏷️ {story.topic}</span>
                        <span>📅 {story.readTime} read</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{formatDate(story.readDate)}</div>
                      <div>{story.readTimeStr}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getProgressColor(story.progress)}`}
                        style={{ width: `${story.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{story.progress}%</span>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap">
                  {story.progress === 100 ? 'Re-read' : 'Continue'}
                </button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
