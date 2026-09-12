'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import { useState } from 'react';

export default function BadgesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const badges = [
    { 
      id: 1,
      name: 'First Course', 
      icon: '🎓', 
      description: 'Completed your first course',
      rarity: 'common',
      category: 'learning',
      dateEarned: 'Aug 15, 2026',
      requirements: 'Complete any course',
      progress: 100
    },
    { 
      id: 2,
      name: 'Quiz Master', 
      icon: '🏆', 
      description: 'Scored 100% on 5 quizzes',
      rarity: 'rare',
      category: 'learning',
      dateEarned: 'Aug 20, 2026',
      requirements: 'Get 100% on 5 quizzes',
      progress: 100
    },
    { 
      id: 3,
      name: '7-Day Streak', 
      icon: '🔥', 
      description: 'Learned for 7 consecutive days',
      rarity: 'rare',
      category: 'time-based',
      dateEarned: 'Aug 22, 2026',
      requirements: 'Learn every day for 7 days',
      progress: 100
    },
    { 
      id: 4,
      name: 'Code Warrior', 
      icon: '💻', 
      description: 'Completed 50 exercises',
      rarity: 'epic',
      category: 'learning',
      dateEarned: 'Aug 25, 2026',
      requirements: 'Complete 50 coding exercises',
      progress: 100
    },
    { 
      id: 5,
      name: 'Quick Learner', 
      icon: '⚡', 
      description: 'Finished a course in record time',
      rarity: 'rare',
      category: 'learning',
      dateEarned: 'Aug 28, 2026',
      requirements: 'Complete a course in under 48 hours',
      progress: 100
    },
    { 
      id: 6,
      name: 'Perfect Score', 
      icon: '💯', 
      description: 'Got 100% on a quiz',
      rarity: 'common',
      category: 'learning',
      dateEarned: 'Aug 10, 2026',
      requirements: 'Score 100% on any quiz',
      progress: 100
    },
    { 
      id: 7,
      name: 'Night Owl', 
      icon: '🦉', 
      description: 'Studied after midnight',
      rarity: 'common',
      category: 'time-based',
      dateEarned: 'Aug 12, 2026',
      requirements: 'Complete a lesson after midnight',
      progress: 100
    },
    { 
      id: 8,
      name: 'Early Bird', 
      icon: '🐦', 
      description: 'Started learning before 6 AM',
      rarity: 'common',
      category: 'time-based',
      dateEarned: 'Aug 14, 2026',
      requirements: 'Complete a lesson before 6 AM',
      progress: 100
    },
    { 
      id: 9,
      name: 'Social Butterfly', 
      icon: '🦋', 
      description: 'Helped 10 classmates',
      rarity: 'epic',
      category: 'social',
      dateEarned: 'Aug 30, 2026',
      requirements: 'Help 10 classmates with their questions',
      progress: 100
    },
    { 
      id: 10,
      name: 'Challenge Champion', 
      icon: '🎯', 
      description: 'Won 5 coding challenges',
      rarity: 'legendary',
      category: 'challenges',
      dateEarned: 'Sep 1, 2026',
      requirements: 'Win 5 coding challenges',
      progress: 100
    },
    { 
      id: 11,
      name: '30-Day Streak', 
      icon: '🔥', 
      description: 'Learned for 30 consecutive days',
      rarity: 'legendary',
      category: 'time-based',
      dateEarned: 'Sep 5, 2026',
      requirements: 'Learn every day for 30 days',
      progress: 100
    },
    { 
      id: 12,
      name: 'Master of React', 
      icon: '⚛️', 
      description: 'Completed all React courses',
      rarity: 'epic',
      category: 'learning',
      dateEarned: 'Sep 6, 2026',
      requirements: 'Complete all React-related courses',
      progress: 100
    },
  ];

  const categories = [
    { id: 'all', name: 'All Badges' },
    { id: 'learning', name: 'Learning' },
    { id: 'social', name: 'Social' },
    { id: 'challenges', name: 'Challenges' },
    { id: 'time-based', name: 'Time-Based' },
  ];

  const rarityStyles: Record<string, string> = {
    common: 'bg-gray-100 text-gray-800 border-gray-300',
    rare: 'bg-blue-100 text-blue-800 border-blue-300',
    epic: 'bg-purple-100 text-purple-800 border-purple-300',
    legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  const rarityIcons: Record<string, string> = {
    common: '⚪',
    rare: '🔵',
    epic: '🟣',
    legendary: '🟡',
  };

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Badges Collection</h1>
        <p className="text-gray-600">Show off your achievements and earned badges</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-yellow-900 mb-1">{badges.length}</div>
            <div className="text-sm text-yellow-700">Total Badges</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-purple-900 mb-1">{badges.filter(b => b.rarity === 'legendary').length}</div>
            <div className="text-sm text-purple-700">Legendary</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-blue-900 mb-1">{badges.filter(b => b.rarity === 'epic').length}</div>
            <div className="text-sm text-blue-700">Epic</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardBody className="p-4">
            <div className="text-3xl font-bold text-green-900 mb-1">{badges.filter(b => b.rarity === 'rare').length}</div>
            <div className="text-sm text-green-700">Rare</div>
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

      {/* Badges Grid */}
      <Card>
        <CardBody>
          <CardTitle>Your Badges ({filteredBadges.length})</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => (
              <div 
                key={badge.id}
                className={`p-4 rounded-lg border-2 ${rarityStyles[badge.rarity]} hover:shadow-md transition`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{badge.icon}</div>
                  <Badge variant={badge.rarity === 'legendary' ? 'warning' : badge.rarity === 'epic' ? 'info' : badge.rarity === 'rare' ? 'success' : 'default'}>
                    {rarityIcons[badge.rarity]} {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Earned:</span>
                    <span className="font-medium">{badge.dateEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium capitalize">{badge.category}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-gray-500 mb-1">Requirements:</div>
                    <div className="font-medium">{badge.requirements}</div>
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
