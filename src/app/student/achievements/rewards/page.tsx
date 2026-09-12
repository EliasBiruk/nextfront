'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import { useState } from 'react';

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pointBalance = 1250;

  const rewards = [
    { 
      id: 1,
      name: 'Premium Avatar Pack', 
      icon: '🎨',
      description: 'Unlock 20 exclusive avatar designs',
      category: 'cosmetics',
      cost: 500,
      available: true,
      popularity: 'high'
    },
    { 
      id: 2,
      name: 'Advanced React Course', 
      icon: '⚛️',
      description: 'Access to premium React development course',
      category: 'learning',
      cost: 800,
      available: true,
      popularity: 'high'
    },
    { 
      id: 3,
      name: 'Custom Profile Theme', 
      icon: '🎭',
      description: 'Personalize your dashboard with custom themes',
      category: 'cosmetics',
      cost: 300,
      available: true,
      popularity: 'medium'
    },
    { 
      id: 4,
      name: 'Python Data Science Bundle', 
      icon: '🐍',
      description: 'Complete Python data science learning package',
      category: 'learning',
      cost: 1000,
      available: true,
      popularity: 'high'
    },
    { 
      id: 5,
      name: 'Priority Support Access', 
      icon: '⭐',
      description: 'Get priority response from support team',
      category: 'features',
      cost: 600,
      available: true,
      popularity: 'medium'
    },
    { 
      id: 6,
      name: 'Badge Display Case', 
      icon: '🏆',
      description: 'Showcase your badges on your profile',
      category: 'cosmetics',
      cost: 200,
      available: true,
      popularity: 'low'
    },
    { 
      id: 7,
      name: 'Coding Challenge Pack', 
      icon: '🎯',
      description: 'Access to 50 exclusive coding challenges',
      category: 'learning',
      cost: 400,
      available: true,
      popularity: 'medium'
    },
    { 
      id: 8,
      name: 'Mentor Session', 
      icon: '👨‍🏫',
      description: '1-hour session with a senior developer',
      category: 'features',
      cost: 1500,
      available: false,
      popularity: 'high'
    },
    { 
      id: 9,
      name: 'Weekly XP Boost', 
      icon: '⚡',
      description: '2x XP for all activities this week',
      category: 'features',
      cost: 700,
      available: true,
      popularity: 'high'
    },
    { 
      id: 10,
      name: 'Course Creation Kit', 
      icon: '📚',
      description: 'Tools to create and share your own courses',
      category: 'features',
      cost: 2000,
      available: false,
      popularity: 'medium'
    },
    { 
      id: 11,
      name: 'Exclusive Profile Badge', 
      icon: '🎖️',
      description: 'Premium badge for your profile',
      category: 'cosmetics',
      cost: 150,
      available: true,
      popularity: 'low'
    },
    { 
      id: 12,
      name: 'Advanced CSS Masterclass', 
      icon: '🎨',
      description: 'Deep dive into advanced CSS techniques',
      category: 'learning',
      cost: 550,
      available: true,
      popularity: 'medium'
    },
  ];

  const redemptionHistory = [
    { date: 'Sep 5, 2026', reward: 'Basic Avatar Pack', cost: 200, status: 'completed' },
    { date: 'Aug 28, 2026', reward: 'JavaScript Cheatsheet', cost: 100, status: 'completed' },
    { date: 'Aug 15, 2026', reward: 'Profile Theme: Blue', cost: 150, status: 'completed' },
    { date: 'Aug 10, 2026', reward: 'Quiz Retry Pass', cost: 50, status: 'completed' },
  ];

  const earningOpportunities = [
    { source: 'Daily Login', points: 10, frequency: 'Once per day' },
    { source: 'Lesson Completion', points: 25, frequency: 'Per lesson' },
    { source: 'Quiz Score > 90%', points: 50, frequency: 'Per quiz' },
    { source: 'Exercise Completion', points: 15, frequency: 'Per exercise' },
    { source: 'Challenge Win', points: 100, frequency: 'Per challenge' },
    { source: 'Streak Bonus', points: 50, frequency: 'Every 7 days' },
    { source: 'Helping Classmates', points: 25, frequency: 'Per help' },
    { source: 'Achievement', points: 100, frequency: 'Per achievement' },
  ];

  const categories = [
    { id: 'all', name: 'All Rewards' },
    { id: 'learning', name: 'Learning Materials' },
    { id: 'features', name: 'Features' },
    { id: 'cosmetics', name: 'Cosmetics' },
  ];

  const categoryColors = {
    learning: 'blue',
    features: 'purple',
    cosmetics: 'pink',
  };

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const affordableRewards = filteredRewards.filter(r => r.available && r.cost <= pointBalance);

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rewards Store</h1>
        <p className="text-gray-600">Redeem your points for exclusive rewards</p>
      </div>

      {/* Point Balance */}
      <Card className="mb-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-yellow-100 mb-1">Available Points</div>
              <div className="text-5xl font-bold">{pointBalance.toLocaleString()}</div>
            </div>
            <div className="text-6xl opacity-80">💰</div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <div className="text-sm text-yellow-100">Can Redeem</div>
              <div className="text-xl font-bold">{affordableRewards.length} rewards</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <div className="text-sm text-yellow-100">Total Spent</div>
              <div className="text-xl font-bold">500 pts</div>
            </div>
          </div>
        </CardBody>
      </Card>

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

      {/* Available Rewards */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Available Rewards ({filteredRewards.filter(r => r.available).length})</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRewards.map((reward) => (
              <div 
                key={reward.id}
                className={`p-4 rounded-lg border-2 ${
                  !reward.available 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : reward.cost <= pointBalance
                    ? 'bg-white border-green-300 hover:border-green-500 hover:shadow-md cursor-pointer'
                    : 'bg-white border-gray-200'
                } transition`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{reward.icon}</div>
                  <Badge variant={reward.available ? (reward.cost <= pointBalance ? 'success' : 'info') : 'default'}>
                    {reward.popularity}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{reward.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-yellow-600">{reward.cost} pts</div>
                  {reward.available ? (
                    reward.cost <= pointBalance ? (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                        Redeem
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium">
                        Not Enough Points
                      </button>
                    )
                  ) : (
                    <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium">
                      Locked
                    </button>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500 capitalize">
                  {reward.category}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Redemption History */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Redemption History</CardTitle>
          <div className="space-y-3">
            {redemptionHistory.map((entry, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎁</div>
                  <div>
                    <div className="font-medium text-gray-900">{entry.reward}</div>
                    <div className="text-xs text-gray-500">{entry.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">-{entry.cost} pts</div>
                  <Badge variant="success" size="sm">Redeemed</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Earning Opportunities */}
      <Card>
        <CardBody>
          <CardTitle>Ways to Earn Points</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {earningOpportunities.map((opportunity) => (
              <div key={opportunity.source} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition">
                <div className="text-2xl mb-2">💎</div>
                <div className="font-semibold text-gray-900 mb-1">{opportunity.source}</div>
                <div className="text-lg font-bold text-blue-600 mb-1">+{opportunity.points} pts</div>
                <div className="text-xs text-gray-500">{opportunity.frequency}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
