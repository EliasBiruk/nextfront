'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getUserGamification, getAchievements } from '@/data/mockData';

export default function StudentAchievements() {
  const { currentUser } = useAuth();
  
  const gamification = currentUser ? getUserGamification(currentUser.id) : {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    achievements: [],
    stats: {
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      coursesCompleted: 0,
      coursesEnrolled: 0,
      playgroundUses: 0,
    },
  };
  
  const allAchievements = getAchievements();
  const earnedAchievements = allAchievements.filter(a => gamification.achievements.includes(a.id));
  const xpToNextLevel = (gamification.level * 1000) - gamification.xp;
  const levelProgress = (gamification.xp % 1000) / 10;

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Achievements Hub</h1>
        <p className="text-gray-600">Track your learning milestones, badges, XP, and rewards</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-3xl font-bold mb-1">{gamification.xp}</div>
            <div className="text-purple-100 text-sm">Total XP</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
          <CardBody className="p-4">
            <div className="text-3xl font-bold mb-1">{earnedAchievements.length}</div>
            <div className="text-yellow-100 text-sm">Badges</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
          <CardBody className="p-4">
            <div className="text-3xl font-bold mb-1">{gamification.streak}</div>
            <div className="text-orange-100 text-sm">Day Streak</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white border-0">
          <CardBody className="p-4">
            <div className="text-3xl font-bold mb-1">{gamification.level}</div>
            <div className="text-green-100 text-sm">Level</div>
          </CardBody>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Level {gamification.level}</h3>
              <p className="text-gray-600">
                {gamification.level === 1 ? 'Beginner' : 
                 gamification.level < 5 ? 'Novice' :
                 gamification.level < 10 ? 'Intermediate' :
                 gamification.level < 20 ? 'Advanced' : 'Expert'} Learner
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">{gamification.xp} XP</div>
              <p className="text-sm text-gray-600">Total Experience</p>
            </div>
          </div>
          <ProgressBar progress={levelProgress} color="purple" />
          <p className="text-sm text-gray-600 mt-2">{xpToNextLevel} XP to Level {gamification.level + 1}</p>
        </CardBody>
      </Card>

      {/* All Achievements */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>All Achievements</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {allAchievements.map((achievement) => {
              const isEarned = gamification.achievements.includes(achievement.id);
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 border rounded-lg ${
                    isEarned 
                      ? 'border-yellow-400 bg-yellow-50' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant={isEarned ? 'success' : 'warning'}>
                      {isEarned ? 'Earned' : 'Locked'}
                    </Badge>
                    <span className="text-purple-600 font-medium">+{achievement.xpReward} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardBody>
          <CardTitle>Learning Statistics</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{gamification.stats.lessonsCompleted}</div>
              <div className="text-sm text-gray-600">Lessons</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{gamification.stats.quizzesCompleted}</div>
              <div className="text-sm text-gray-600">Quizzes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{gamification.stats.coursesCompleted}</div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{gamification.stats.coursesEnrolled}</div>
              <div className="text-sm text-gray-600">Enrolled</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{gamification.stats.playgroundUses}</div>
              <div className="text-sm text-gray-600">Playground</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}