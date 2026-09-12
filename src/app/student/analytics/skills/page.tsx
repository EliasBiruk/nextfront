'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function SkillsAnalytics() {
  const skills = [
    { name: 'JavaScript', level: 'Advanced', progress: 85, category: 'Programming' },
    { name: 'React', level: 'Intermediate', progress: 65, category: 'Frontend' },
    { name: 'Python', level: 'Intermediate', progress: 70, category: 'Programming' },
    { name: 'HTML/CSS', level: 'Advanced', progress: 90, category: 'Frontend' },
    { name: 'Node.js', level: 'Beginner', progress: 35, category: 'Backend' },
    { name: 'Data Structures', level: 'Beginner', progress: 40, category: 'CS Fundamentals' },
    { name: 'APIs & REST', level: 'Intermediate', progress: 60, category: 'Backend' },
    { name: 'Git & Version Control', level: 'Intermediate', progress: 55, category: 'Tools' },
    { name: 'Database Design', level: 'Beginner', progress: 30, category: 'Backend' },
    { name: 'Testing', level: 'Beginner', progress: 25, category: 'Quality' },
  ];

  const skillGaps = [
    { skill: 'Database Design', gap: 'High', recommendation: 'Complete SQL fundamentals course' },
    { skill: 'Testing', gap: 'High', recommendation: 'Learn unit testing with Jest' },
    { skill: 'Node.js', gap: 'Medium', recommendation: 'Practice backend projects' },
    { skill: 'Data Structures', gap: 'Medium', recommendation: 'Focus on algorithms practice' },
  ];

  const skillTimeline = [
    { month: 'Jan', skills: ['JavaScript Basics', 'HTML/CSS'] },
    { month: 'Feb', skills: ['React Fundamentals', 'Git Basics'] },
    { month: 'Mar', skills: ['Python Basics', 'APIs'] },
    { month: 'Apr', skills: ['Advanced JavaScript', 'React Hooks'] },
    { month: 'May', skills: ['Node.js Intro', 'Data Structures'] },
    { month: 'Jun', skills: ['Testing Basics', 'Database Intro'] },
  ];

  const skillAchievements = [
    { name: 'JavaScript Master', description: 'Reached advanced level in JavaScript', icon: '🚀' },
    { name: 'Frontend Pro', description: 'Mastered HTML, CSS, and React', icon: '🎨' },
    { name: 'Quick Learner', description: 'Acquired 5 new skills in 3 months', icon: '⚡' },
    { name: 'Full Stack Starter', description: 'Started learning backend technologies', icon: '🔧' },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Skills Development</h1>
        <p className="text-gray-600">Track your skill progress and identify areas for improvement</p>
      </div>

      {/* Overall Skills Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">10</div>
            <p className="text-gray-600 text-sm">Skills Tracked</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">3</div>
            <p className="text-gray-600 text-sm">Advanced Skills</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">55%</div>
            <p className="text-gray-600 text-sm">Avg. Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">6</div>
            <p className="text-gray-600 text-sm">New This Month</p>
          </CardBody>
        </Card>
      </div>

      {/* Skills Progress */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Skills Progress</CardTitle>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{skill.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === 'Advanced' ? 'bg-green-100 text-green-700' :
                      skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {skill.level}
                    </span>
                    <span className="text-gray-600 font-semibold">{skill.progress}%</span>
                  </div>
                </div>
                <ProgressBar progress={skill.progress} color={
                  skill.level === 'Advanced' ? 'green' :
                  skill.level === 'Intermediate' ? 'blue' : 'yellow'
                } />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Skill Gaps and Recommendations */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Skill Gaps & Recommendations</CardTitle>
          <div className="space-y-4">
            {skillGaps.map((gap) => (
              <div key={gap.skill} className={`p-4 rounded-lg ${
                gap.gap === 'High' ? 'bg-red-50' : 'bg-yellow-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{gap.skill}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      gap.gap === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {gap.gap} Gap
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">💡 {gap.recommendation}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Skill Acquisition Timeline */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Skill Acquisition Timeline (Last 6 Months)</CardTitle>
          <div className="space-y-4">
            {skillTimeline.map((month) => (
              <div key={month.month} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {month.month[0]}
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="font-semibold mb-2">{month.month}</div>
                  <div className="flex flex-wrap gap-2">
                    {month.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Skills by Category */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Skills by Category</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Programming', 'Frontend', 'Backend', 'CS Fundamentals', 'Tools', 'Quality'].map((category) => {
              const categorySkills = skills.filter(s => s.category === category);
              const avgProgress = categorySkills.length > 0
                ? Math.round(categorySkills.reduce((acc, s) => acc + s.progress, 0) / categorySkills.length)
                : 0;
              return (
                <div key={category} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{category}</h4>
                  <div className="mb-2">
                    <ProgressBar progress={avgProgress} color="blue" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {categorySkills.length} skills • {avgProgress}% avg
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Skill-Related Achievements */}
      <Card>
        <CardBody>
          <CardTitle>Skill Achievements</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillAchievements.map((achievement) => (
              <div key={achievement.name} className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
