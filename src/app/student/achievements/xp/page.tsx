'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function XPPage() {
  const xpHistory = [
    { date: 'Sep 6, 2026', source: 'Lesson Completion', amount: 50, multiplier: 1 },
    { date: 'Sep 6, 2026', source: 'Quiz Score (95%)', amount: 75, multiplier: 1.5 },
    { date: 'Sep 5, 2026', source: 'Exercise Completion', amount: 30, multiplier: 1 },
    { date: 'Sep 5, 2026', source: 'Streak Bonus (12 days)', amount: 100, multiplier: 2 },
    { date: 'Sep 4, 2026', source: 'Challenge Win', amount: 150, multiplier: 1.5 },
    { date: 'Sep 4, 2026', source: 'Lesson Completion', amount: 50, multiplier: 1 },
    { date: 'Sep 3, 2026', source: 'Achievement Earned', amount: 500, multiplier: 1 },
    { date: 'Sep 3, 2026', source: 'Quiz Score (100%)', amount: 100, multiplier: 2 },
    { date: 'Sep 2, 2026', source: 'Lesson Completion', amount: 50, multiplier: 1 },
    { date: 'Sep 2, 2026', source: 'Exercise Completion', amount: 30, multiplier: 1 },
    { date: 'Sep 1, 2026', source: 'Community Help', amount: 25, multiplier: 1 },
    { date: 'Sep 1, 2026', source: 'Lesson Completion', amount: 50, multiplier: 1 },
    { date: 'Aug 31, 2026', source: 'Quiz Score (85%)', amount: 65, multiplier: 1 },
    { date: 'Aug 31, 2026', source: 'Streak Bonus (7 days)', amount: 50, multiplier: 1.5 },
    { date: 'Aug 30, 2026', source: 'Challenge Completion', amount: 100, multiplier: 1 },
  ];

  const xpBreakdown = [
    { source: 'Lessons', amount: 1250, percentage: 26, color: 'blue' },
    { source: 'Quizzes', amount: 980, percentage: 20, color: 'green' },
    { source: 'Exercises', amount: 720, percentage: 15, color: 'purple' },
    { source: 'Streaks', amount: 850, percentage: 18, color: 'orange' },
    { source: 'Challenges', amount: 650, percentage: 13, color: 'yellow' },
    { source: 'Achievements', amount: 370, percentage: 8, color: 'red' },
  ];

  const multipliers = [
    { name: 'Streak Multiplier', description: 'XP bonus for maintaining learning streaks', bonus: 'Up to 2x', active: true },
    { name: 'Perfect Quiz Bonus', description: 'Double XP for 100% quiz scores', bonus: '2x', active: true },
    { name: 'Weekend Warrior', description: '1.5x XP on weekends', bonus: '1.5x', active: false },
    { name: 'Early Bird', description: '1.2x XP for lessons before 8 AM', bonus: '1.2x', active: true },
    { name: 'Challenge Bonus', description: '1.5x XP for challenge completions', bonus: '1.5x', active: true },
  ];

  const totalXP = 4820;
  const nextLevelXP = 5600;
  const currentLevelXP = 4800;
  const progressToNext = ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">XP & Points</h1>
        <p className="text-gray-600">Track your experience points and earning history</p>
      </div>

      {/* XP Overview */}
      <Card className="mb-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-purple-100 mb-1">Total XP</div>
              <div className="text-4xl font-bold">{totalXP.toLocaleString()}</div>
            </div>
            <div className="text-6xl opacity-80">⭐</div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-100">Level 18 Progress</span>
              <span className="text-purple-100">{progressToNext.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-purple-400 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-purple-100">
            {nextLevelXP - totalXP} XP to Level 19
          </div>
        </CardBody>
      </Card>

      {/* XP Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardBody>
            <CardTitle>XP Breakdown by Source</CardTitle>
            <div className="space-y-4">
              {xpBreakdown.map((item) => (
                <div key={item.source}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.source}</span>
                    <span className="text-sm text-gray-600">{item.amount.toLocaleString()} XP ({item.percentage}%)</span>
                  </div>
                  <ProgressBar progress={item.percentage} color={item.color as any} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Active Multipliers</CardTitle>
            <div className="space-y-3">
              {multipliers.map((multiplier) => (
                <div 
                  key={multiplier.name}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    multiplier.active 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{multiplier.name}</div>
                    <div className="text-xs text-gray-600">{multiplier.description}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={multiplier.active ? 'success' : 'default'}>
                      {multiplier.bonus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* XP Earning History */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>XP Earning History</CardTitle>
          <div className="space-y-2">
            {xpHistory.map((entry, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {entry.source.includes('Lesson') ? '📚' : 
                     entry.source.includes('Quiz') ? '📝' : 
                     entry.source.includes('Exercise') ? '💻' : 
                     entry.source.includes('Streak') ? '🔥' : 
                     entry.source.includes('Challenge') ? '🎯' : 
                     entry.source.includes('Achievement') ? '🏆' : '⭐'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{entry.source}</div>
                    <div className="text-xs text-gray-500">{entry.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">
                    +{Math.round(entry.amount * entry.multiplier)} XP
                  </div>
                  {entry.multiplier > 1 && (
                    <Badge variant="success" size="sm">{entry.multiplier}x</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Bonus Opportunities */}
      <Card>
        <CardBody>
          <CardTitle>Bonus XP Opportunities</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                title: 'Complete 5 lessons today', 
                xp: 100, 
                icon: '📚',
                progress: 3,
                total: 5
              },
              { 
                title: 'Get 100% on next quiz', 
                xp: 150, 
                icon: '📝',
                progress: 0,
                total: 1
              },
              { 
                title: 'Reach 15-day streak', 
                xp: 200, 
                icon: '🔥',
                progress: 12,
                total: 15
              },
              { 
                title: 'Complete 3 exercises', 
                xp: 75, 
                icon: '💻',
                progress: 1,
                total: 3
              },
              { 
                title: 'Win a coding challenge', 
                xp: 175, 
                icon: '🎯',
                progress: 0,
                total: 1
              },
              { 
                title: 'Help 3 classmates', 
                xp: 50, 
                icon: '🤝',
                progress: 1,
                total: 3
              },
            ].map((opportunity) => (
              <div key={opportunity.title} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{opportunity.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{opportunity.title}</div>
                    <div className="text-sm text-purple-600 font-medium">+{opportunity.xp} XP</div>
                  </div>
                </div>
                <ProgressBar progress={(opportunity.progress / opportunity.total) * 100} color="purple" />
                <div className="text-xs text-gray-500 mt-1">
                  {opportunity.progress}/{opportunity.total} completed
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
