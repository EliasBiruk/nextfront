'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import { useState } from 'react';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    { 
      id: 1,
      name: 'JavaScript Fundamentals Master', 
      icon: '🎓',
      description: 'Completed the JavaScript Fundamentals course with excellence',
      whyEarned: 'You completed all 12 lessons, passed all quizzes with an average score of 92%, and submitted all exercises successfully. Your dedication to understanding core concepts like variables, functions, and DOM manipulation earned you this achievement.',
      requirements: 'Complete all lessons, pass all quizzes, submit all exercises',
      progress: 100,
      nextAchievement: 'JavaScript Advanced Master',
      nextProgress: 35,
      category: 'learning',
      dateEarned: 'Aug 25, 2026',
      xpReward: 500
    },
    { 
      id: 2,
      name: 'Quiz Perfectionist', 
      icon: '🏆',
      description: 'Achieved 100% on 10 different quizzes',
      whyEarned: 'Your consistent performance and attention to detail led to perfect scores on quizzes covering JavaScript, React, Python, and CSS. This demonstrates mastery of the material.',
      requirements: 'Score 100% on 10 quizzes',
      progress: 100,
      nextAchievement: 'Quiz Legend',
      nextProgress: 60,
      category: 'learning',
      dateEarned: 'Aug 28, 2026',
      xpReward: 300
    },
    { 
      id: 3,
      name: '12-Day Learning Streak', 
      icon: '🔥',
      description: 'Maintained a learning streak for 12 consecutive days',
      whyEarned: 'You logged in and completed at least one lesson every day for 12 days straight. Consistency is key to learning, and you have shown remarkable dedication.',
      requirements: 'Complete at least one lesson daily for 12 days',
      progress: 100,
      nextAchievement: '30-Day Streak',
      nextProgress: 40,
      category: 'time-based',
      dateEarned: 'Sep 6, 2026',
      xpReward: 400
    },
    { 
      id: 4,
      name: 'Community Helper', 
      icon: '🤝',
      description: 'Helped 15 classmates with their questions',
      whyEarned: 'You actively participated in discussion forums, provided helpful answers to 15 classmates, and received positive feedback from the community. Your contributions have helped others learn.',
      requirements: 'Help 15 classmates with their questions',
      progress: 100,
      nextAchievement: 'Community Leader',
      nextProgress: 50,
      category: 'social',
      dateEarned: 'Sep 1, 2026',
      xpReward: 350
    },
    { 
      id: 5,
      name: 'Challenge Conqueror', 
      icon: '🎯',
      description: 'Completed 10 coding challenges',
      whyEarned: 'You successfully solved 10 coding challenges of varying difficulty, from beginner to advanced. Your problem-solving skills have improved significantly.',
      requirements: 'Complete 10 coding challenges',
      progress: 100,
      nextAchievement: 'Challenge Master',
      nextProgress: 70,
      category: 'challenges',
      dateEarned: 'Aug 30, 2026',
      xpReward: 450
    },
    { 
      id: 6,
      name: 'Early Achiever', 
      icon: '🌅',
      description: 'Completed 20 lessons before 8 AM',
      whyEarned: 'You showed exceptional dedication by completing 20 lessons early in the morning. This demonstrates strong time management and commitment to learning.',
      requirements: 'Complete 20 lessons before 8 AM',
      progress: 100,
      nextAchievement: 'Morning Master',
      nextProgress: 45,
      category: 'time-based',
      dateEarned: 'Aug 20, 2026',
      xpReward: 200
    },
    { 
      id: 7,
      name: 'React Developer', 
      icon: '⚛️',
      description: 'Completed the React Development course',
      whyEarned: 'You mastered React fundamentals including components, state management, hooks, and routing. Your final project demonstrated practical application of these concepts.',
      requirements: 'Complete all React course lessons and final project',
      progress: 100,
      nextAchievement: 'React Expert',
      nextProgress: 25,
      category: 'learning',
      dateEarned: 'Sep 5, 2026',
      xpReward: 600
    },
    { 
      id: 8,
      name: 'Speed Learner', 
      icon: '⚡',
      description: 'Completed a course in under 48 hours',
      whyEarned: 'You completed the CSS Fundamentals course in just 42 hours, showing exceptional focus and ability to grasp concepts quickly.',
      requirements: 'Complete any course in under 48 hours',
      progress: 100,
      nextAchievement: 'Lightning Learner',
      nextProgress: 0,
      category: 'learning',
      dateEarned: 'Aug 15, 2026',
      xpReward: 250
    },
  ];

  const categories = [
    { id: 'all', name: 'All Achievements' },
    { id: 'learning', name: 'Learning' },
    { id: 'social', name: 'Social' },
    { id: 'challenges', name: 'Challenges' },
    { id: 'time-based', name: 'Time-Based' },
  ];

  const categoryColors: Record<string, string> = {
    learning: 'blue',
    social: 'green',
    challenges: 'purple',
    'time-based': 'orange',
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Detailed view of your accomplishments and progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-green-900 mb-1">{achievements.length}</div>
            <div className="text-sm text-green-700">Achievements Earned</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-blue-900 mb-1">2,550</div>
            <div className="text-sm text-blue-700">Total XP from Achievements</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-purple-900 mb-1">5</div>
            <div className="text-sm text-purple-700">In Progress</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-orange-900 mb-1">68%</div>
            <div className="text-sm text-orange-700">Completion Rate</div>
          </CardBody>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{achievement.name}</h3>
                      <Badge variant="info" className="capitalize">{achievement.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Earned</div>
                      <div className="font-medium">{achievement.dateEarned}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Why you earned this:</h4>
                    <p className="text-sm text-blue-800">{achievement.whyEarned}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Requirements</div>
                      <div className="text-sm font-medium">{achievement.requirements}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">XP Reward</div>
                      <div className="text-sm font-medium text-yellow-700">+{achievement.xpReward} XP</div>
                    </div>
                  </div>
                  
                  {achievement.nextAchievement && (
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Next: {achievement.nextAchievement}
                        </span>
                        <span className="text-sm text-gray-500">{achievement.nextProgress}%</span>
                      </div>
                      <ProgressBar 
                        progress={achievement.nextProgress} 
                        color={categoryColors[achievement.category] as 'blue' | 'green' | 'purple' | 'orange'} 
                      />
                    </div>
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
