'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function Bookmarks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const bookmarks = [
    {
      id: 1,
      title: 'Introduction to Python',
      type: 'lesson',
      category: 'Programming',
      tags: ['python', 'basics'],
      dateAdded: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Web Development Course',
      type: 'course',
      category: 'Development',
      tags: ['web', 'html', 'css'],
      dateAdded: '2024-01-10',
      progress: 40
    },
    {
      id: 3,
      title: 'JavaScript Functions Exercise',
      type: 'exercise',
      category: 'Programming',
      tags: ['javascript', 'functions'],
      dateAdded: '2024-01-20',
      progress: 100
    },
    {
      id: 4,
      title: 'The Adventure of Code',
      type: 'story',
      category: 'Learning',
      tags: ['story', 'coding'],
      dateAdded: '2024-01-18',
      progress: 60
    },
    {
      id: 5,
      title: 'React Weather App',
      type: 'project',
      category: 'Development',
      tags: ['react', 'api'],
      dateAdded: '2024-01-22',
      progress: 30
    },
    {
      id: 6,
      title: 'Data Structures Basics',
      type: 'lesson',
      category: 'Computer Science',
      tags: ['data-structures', 'algorithms'],
      dateAdded: '2024-01-12',
      progress: 50
    },
    {
      id: 7,
      title: 'CSS Grid Mastery',
      type: 'course',
      category: 'Design',
      tags: ['css', 'grid', 'layout'],
      dateAdded: '2024-01-08',
      progress: 80
    },
    {
      id: 8,
      title: 'Algorithm Challenge Set 5',
      type: 'exercise',
      category: 'Programming',
      tags: ['algorithms', 'challenge'],
      dateAdded: '2024-01-25',
      progress: 0
    }
  ];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || bookmark.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      lesson: '📚',
      course: '🎓',
      exercise: '✏️',
      story: '📖',
      project: '🚀'
    };
    return icons[type] || '📌';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      lesson: 'bg-blue-100 text-blue-800',
      course: 'bg-green-100 text-green-800',
      exercise: 'bg-yellow-100 text-yellow-800',
      story: 'bg-purple-100 text-purple-800',
      project: 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bookmarks</h1>
        <p className="text-gray-600">Your saved content across all learning materials</p>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('lesson')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'lesson' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lessons
              </button>
              <button
                onClick={() => setSelectedFilter('course')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'course' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setSelectedFilter('exercise')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'exercise' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Exercises
              </button>
              <button
                onClick={() => setSelectedFilter('story')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'story' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => setSelectedFilter('project')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === 'project' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Projects
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Bookmarks by Type */}
      <div className="space-y-6">
        {['lesson', 'course', 'exercise', 'story', 'project'].map(type => {
          const typeBookmarks = filteredBookmarks.filter(b => b.type === type);
          if (typeBookmarks.length === 0) return null;

          return (
            <Card key={type}>
              <CardBody>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(type)}</span>
                  <span className="capitalize">{type}s</span>
                  <span className="text-sm font-normal text-gray-500">({typeBookmarks.length})</span>
                </CardTitle>
                <div className="space-y-3">
                  {typeBookmarks.map(bookmark => (
                    <div
                      key={bookmark.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{bookmark.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(bookmark.type)}`}>
                            {bookmark.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            📁 {bookmark.category}
                          </span>
                          <span className="flex items-center gap-1">
                            📅 {bookmark.dateAdded}
                          </span>
                          <div className="flex items-center gap-1">
                            {bookmark.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {bookmark.progress > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{bookmark.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${bookmark.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                          Open
                        </button>
                        <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filteredBookmarks.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📌</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookmarks found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
}
