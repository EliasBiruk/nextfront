'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function SavedStories() {
  const [savedStories, setSavedStories] = useState([
    {
      id: 1,
      title: 'The Future of AI in Education',
      excerpt: 'How artificial intelligence is transforming the way we learn and teach...',
      category: 'Technology',
      topic: 'Artificial Intelligence',
      readTime: '4 min',
      savedDate: '2024-01-15',
      progress: 75,
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Learning While Working: Time Management Tips',
      excerpt: 'Practical strategies for balancing full-time work with online education...',
      category: 'Productivity',
      topic: 'Time Management',
      readTime: '6 min',
      savedDate: '2024-01-12',
      progress: 30,
      icon: '⏰'
    },
    {
      id: 3,
      title: 'Breaking into Tech Without a CS Degree',
      excerpt: 'Success stories and actionable advice for career changers...',
      category: 'Career',
      topic: 'Career Development',
      readTime: '8 min',
      savedDate: '2024-01-10',
      progress: 100,
      icon: '💼'
    },
    {
      id: 4,
      title: 'The Science of Effective Learning',
      excerpt: 'Research-backed techniques to improve retention and understanding...',
      category: 'Learning',
      topic: 'Learning Science',
      readTime: '5 min',
      savedDate: '2024-01-08',
      progress: 0,
      icon: '🧠'
    },
    {
      id: 5,
      title: 'Building a Portfolio That Gets Hired',
      excerpt: 'Create a compelling portfolio that showcases your skills to employers...',
      category: 'Career',
      topic: 'Portfolio Development',
      readTime: '7 min',
      savedDate: '2024-01-05',
      progress: 50,
      icon: '📁'
    },
    {
      id: 6,
      title: 'Mastering Remote Work Collaboration',
      excerpt: 'Tools and strategies for effective teamwork in distributed environments...',
      category: 'Productivity',
      topic: 'Remote Work',
      readTime: '6 min',
      savedDate: '2024-01-03',
      progress: 100,
      icon: '💻'
    }
  ]);

  const handleRemoveFromSaved = (id: number) => {
    setSavedStories(stories => stories.filter(story => story.id !== id));
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getProgressLabel = (progress: number) => {
    if (progress === 100) return 'Completed';
    if (progress > 0) return `${progress}% read`;
    return 'Not started';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Stories</h1>
        <p className="text-gray-600">Stories you've bookmarked for later reading</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">{savedStories.length}</div>
            <div className="text-sm text-gray-600">Total Saved</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">
              {savedStories.filter(s => s.progress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-yellow-600">
              {savedStories.filter(s => s.progress > 0 && s.progress < 100).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-gray-600">
              {savedStories.filter(s => s.progress === 0).length}
            </div>
            <div className="text-sm text-gray-600">Not Started</div>
          </CardBody>
        </Card>
      </div>

      {/* Saved Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition">
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{story.icon}</div>
                <Badge 
                  variant={story.progress === 100 ? 'success' : story.progress > 0 ? 'warning' : 'default'} 
                  size="sm"
                >
                  {getProgressLabel(story.progress)}
                </Badge>
              </div>
              
              <Badge variant="default" size="sm" className="mb-2">{story.category}</Badge>
              <h4 className="font-semibold text-lg mb-2">{story.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{story.excerpt}</p>
              
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span>📅 {story.readTime} read</span>
                <span>🏷️ {story.topic}</span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Reading Progress</span>
                  <span>{story.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(story.progress)}`}
                    style={{ width: `${story.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-xs text-gray-500">Saved on {new Date(story.savedDate).toLocaleDateString()}</span>
                <button
                  onClick={() => handleRemoveFromSaved(story.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove from Saved
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {savedStories.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">No Saved Stories</h3>
              <p className="text-gray-600">Start saving stories to build your reading list</p>
            </div>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
}
