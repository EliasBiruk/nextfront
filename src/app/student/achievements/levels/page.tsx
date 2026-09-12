'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function LevelsPage() {
  const currentLevel = 18;
  const currentXP = 4820;
  const nextLevelXP = 5600;
  const prevLevelXP = 4800;
  const progressToNext = ((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100;

  const levelPerks = [
    { level: 1, perk: 'Access to basic courses', unlocked: true },
    { level: 5, perk: 'Unlock quizzes', unlocked: true },
    { level: 10, perk: 'Access to exercises', unlocked: true },
    { level: 15, perk: 'Unlock coding challenges', unlocked: true },
    { level: 18, perk: 'Premium avatar customization', unlocked: true },
    { level: 20, perk: 'Access to advanced courses', unlocked: false },
    { level: 25, perk: 'Priority support', unlocked: false },
    { level: 30, perk: 'Exclusive community access', unlocked: false },
    { level: 40, perk: 'Mentor program access', unlocked: false },
    { level: 50, perk: 'Course creation tools', unlocked: false },
  ];

  const levelMilestones = [
    { level: 5, xp: 500, reward: 'Quiz Master Badge', achieved: true },
    { level: 10, xp: 1500, reward: '10 Course Badge', achieved: true },
    { level: 15, xp: 3000, reward: 'Challenge Access', achieved: true },
    { level: 20, xp: 5600, reward: 'Advanced Courses', achieved: false },
    { level: 25, xp: 8500, reward: 'Priority Support', achieved: false },
    { level: 30, xp: 12000, reward: 'Community Leader', achieved: false },
  ];

  const streakHistory = [
    { date: 'Sep 6, 2026', length: 12, status: 'active' },
    { date: 'Aug 25, 2026', length: 21, status: 'completed' },
    { date: 'Aug 10, 2026', length: 7, status: 'completed' },
    { date: 'Jul 28, 2026', length: 5, status: 'completed' },
    { date: 'Jul 15, 2026', length: 3, status: 'completed' },
  ];

  const streakRewards = [
    { days: 3, reward: '50 XP bonus', achieved: true },
    { days: 7, reward: '7-Day Streak Badge', achieved: true },
    { days: 14, reward: '150 XP bonus', achieved: true },
    { days: 21, reward: 'Streak Master Badge', achieved: true },
    { days: 30, reward: '300 XP bonus + Premium Avatar', achieved: false },
    { days: 60, reward: 'Legendary Streak Badge', achieved: false },
    { days: 100, reward: 'Exclusive Title: "Dedicated Learner"', achieved: false },
  ];

  const currentStreak = 12;
  const longestStreak = 21;

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Levels & Streaks</h1>
        <p className="text-gray-600">Track your level progression and learning streaks</p>
      </div>

      {/* Current Level & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-purple-100 mb-1">Current Level</div>
                <div className="text-5xl font-bold">{currentLevel}</div>
              </div>
              <div className="text-6xl opacity-80">⭐</div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-purple-100">Progress to Level {currentLevel + 1}</span>
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
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-orange-100 mb-1">Current Streak</div>
                <div className="text-5xl font-bold">{currentStreak}</div>
                <div className="text-sm text-orange-100">days</div>
              </div>
              <div className="text-6xl opacity-80">🔥</div>
            </div>
            <div className="bg-orange-400 bg-opacity-30 rounded-lg p-3">
              <div className="text-sm text-orange-100">Personal Best</div>
              <div className="text-2xl font-bold">{longestStreak} days</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Level Perks */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Level Perks & Benefits</CardTitle>
          <div className="space-y-2">
            {levelPerks.map((perk) => (
              <div 
                key={perk.level}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  perk.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {perk.unlocked ? '✅' : '🔒'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Level {perk.level}</div>
                    <div className="text-sm text-gray-600">{perk.perk}</div>
                  </div>
                </div>
                <Badge variant={perk.unlocked ? 'success' : 'default'}>
                  {perk.unlocked ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Level Milestones */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Level Milestones</CardTitle>
          <div className="space-y-4">
            {levelMilestones.map((milestone) => (
              <div key={milestone.level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl ${milestone.achieved ? '' : 'grayscale opacity-50'}`}>
                      {milestone.achieved ? '🏆' : '🎯'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Level {milestone.level}</div>
                      <div className="text-sm text-gray-600">{milestone.reward}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{milestone.xp.toLocaleString()} XP</div>
                    <Badge variant={milestone.achieved ? 'success' : 'default'}>
                      {milestone.achieved ? 'Achieved' : 'Locked'}
                    </Badge>
                  </div>
                </div>
                {!milestone.achieved && milestone.level <= currentLevel + 5 && (
                  <ProgressBar 
                    progress={currentLevel >= milestone.level ? 100 : ((currentXP / milestone.xp) * 100)} 
                    color="purple" 
                  />
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Streak History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardBody>
            <CardTitle>Streak History</CardTitle>
            <div className="space-y-3">
              {streakHistory.map((streak, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    streak.status === 'active' 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-medium text-gray-900">{streak.length} days</div>
                      <div className="text-xs text-gray-500">{streak.date}</div>
                    </div>
                  </div>
                  <Badge variant={streak.status === 'active' ? 'warning' : 'default'}>
                    {streak.status === 'active' ? 'Active' : 'Completed'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Streak Rewards</CardTitle>
            <div className="space-y-3">
              {streakRewards.map((reward) => (
                <div 
                  key={reward.days}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    reward.achieved 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {reward.achieved ? '✅' : '🔒'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{reward.days} Days</div>
                      <div className="text-xs text-gray-600">{reward.reward}</div>
                    </div>
                  </div>
                  <Badge variant={reward.achieved ? 'success' : 'default'}>
                    {reward.achieved ? 'Earned' : 'Locked'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Level & Streak Challenges */}
      <Card>
        <CardBody>
          <CardTitle>Level & Streak Challenges</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                title: 'Reach Level 20', 
                xp: 500, 
                icon: '⭐',
                progress: 82,
                description: 'Unlock advanced courses'
              },
              { 
                title: 'Maintain 15-day streak', 
                xp: 300, 
                icon: '🔥',
                progress: 80,
                description: 'Earn streak master badge'
              },
              { 
                title: 'Complete 5 level-up challenges', 
                xp: 400, 
                icon: '🎯',
                progress: 60,
                description: 'Show consistent progress'
              },
              { 
                title: 'Reach 25-day personal best', 
                xp: 350, 
                icon: '🏆',
                progress: 48,
                description: 'Beat your record'
              },
              { 
                title: 'Earn 10 level perks', 
                xp: 600, 
                icon: '🎁',
                progress: 50,
                description: 'Unlock more benefits'
              },
              { 
                title: 'Complete 30-day streak', 
                xp: 1000, 
                icon: '🔥',
                progress: 40,
                description: 'Legendary achievement'
              },
            ].map((challenge) => (
              <div key={challenge.title} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{challenge.title}</div>
                    <div className="text-sm text-purple-600 font-medium">+{challenge.xp} XP</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{challenge.description}</p>
                <ProgressBar progress={challenge.progress} color="purple" />
                <div className="text-xs text-gray-500 mt-1">{challenge.progress}% complete</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
