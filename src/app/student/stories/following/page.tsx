'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function FollowingStories() {
  const followedAuthors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Data Science Instructor',
      avatar: '👩‍🏫',
      followers: 12500,
      stories: [
        {
          id: 1,
          title: 'Advanced Machine Learning Techniques',
          excerpt: 'Explore cutting-edge ML methods and their real-world applications...',
          category: 'Data Science',
          topic: 'Machine Learning',
          readTime: '8 min',
          isNew: true,
          unreadCount: 3,
          icon: '🤖'
        },
        {
          id: 2,
          title: 'Building Production-Ready Models',
          excerpt: 'Best practices for deploying ML models in production environments...',
          category: 'Engineering',
          topic: 'MLOps',
          readTime: '6 min',
          isNew: false,
          unreadCount: 0,
          icon: '⚙️'
        }
      ]
    },
    {
      id: 2,
      name: 'Prof. Michael Torres',
      role: 'Computer Science Professor',
      avatar: '👨‍🏫',
      followers: 8700,
      stories: [
        {
          id: 3,
          title: 'Understanding Distributed Systems',
          excerpt: 'A deep dive into the architecture of modern distributed applications...',
          category: 'Computer Science',
          topic: 'Systems',
          readTime: '10 min',
          isNew: true,
          unreadCount: 1,
          icon: '🌐'
        }
      ]
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Learning Designer',
      avatar: '👩‍💼',
      followers: 5400,
      stories: [
        {
          id: 4,
          title: 'The Psychology of Learning',
          excerpt: 'How our brains process and retain new information effectively...',
          category: 'Psychology',
          topic: 'Learning Science',
          readTime: '5 min',
          isNew: true,
          unreadCount: 2,
          icon: '🧠'
        },
        {
          id: 5,
          title: 'Creating Engaging Online Courses',
          excerpt: 'Tips and strategies for designing compelling educational content...',
          category: 'Education',
          topic: 'Instructional Design',
          readTime: '7 min',
          isNew: false,
          unreadCount: 0,
          icon: '📚'
        }
      ]
    }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Stories from People You Follow</h1>
        <p className="text-gray-600">Stay updated with content from your favorite authors and instructors</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Followed Authors</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">6</div>
            <div className="text-sm text-gray-600">New Stories</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-purple-600">45</div>
            <div className="text-sm text-gray-600">Total Stories</div>
          </CardBody>
        </Card>
      </div>

      {/* Authors and Their Stories */}
      <div className="space-y-6">
        {followedAuthors.map((author) => (
          <div key={author.id}>
            {/* Author Profile Card */}
            <Card className="mb-4">
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{author.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{author.name}</h3>
                    <p className="text-sm text-gray-600">{author.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{author.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  {author.stories.some(s => s.isNew) && (
                    <Badge variant="info" className="ml-4">
                      {author.stories.filter(s => s.isNew).length} New
                    </Badge>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Author's Stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              {author.stories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition cursor-pointer">
                  <CardBody>
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{story.icon}</div>
                      {story.isNew && (
                        <Badge variant="success" size="sm">New</Badge>
                      )}
                    </div>
                    <Badge variant="default" size="sm" className="mb-2">{story.category}</Badge>
                    <h4 className="font-semibold text-lg mb-2">{story.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{story.excerpt}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>📅 {story.readTime} read</span>
                      <span>🏷️ {story.topic}</span>
                    </div>
                    {story.unreadCount > 0 && (
                      <div className="text-xs text-blue-600 font-medium">
                        {story.unreadCount} unread from this author
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
