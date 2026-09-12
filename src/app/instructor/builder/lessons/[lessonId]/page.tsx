'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';

interface LessonContent {
  type: 'video' | 'text' | 'image' | 'code' | 'resource' | 'transcript' | 'summary';
  id: string;
  content: string;
  metadata?: {
    url?: string;
    language?: string;
    filename?: string;
  };
}

export default function LessonEditorPage({ params }: { params: { lessonId: string } }) {
  const [lesson, setLesson] = useState({
    id: params.lessonId,
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming',
    order: 1,
    contents: [
      {
        type: 'video',
        id: 'c1',
        content: 'Introduction to JavaScript - Video Lesson',
        metadata: { url: 'https://example.com/video.mp4' }
      },
      {
        type: 'text',
        id: 'c2',
        content: 'JavaScript is a programming language that adds interactivity to your website.'
      },
      {
        type: 'code',
        id: 'c3',
        content: 'console.log("Hello, World!");',
        metadata: { language: 'javascript' }
      }
    ] as LessonContent[]
  });

  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [showAddContent, setShowAddContent] = useState(false);
  const [newContentType, setNewContentType] = useState<'video' | 'text' | 'image' | 'code' | 'resource' | 'transcript' | 'summary'>('text');

  const addContent = () => {
    const newContent: LessonContent = {
      type: newContentType,
      id: `c${Date.now()}`,
      content: '',
      metadata: newContentType === 'code' ? { language: 'javascript' } : undefined
    };
    setLesson({ ...lesson, contents: [...lesson.contents, newContent] });
    setShowAddContent(false);
  };

  const removeContent = (contentId: string) => {
    setLesson({
      ...lesson,
      contents: lesson.contents.filter(c => c.id !== contentId)
    });
  };

  const updateContent = (contentId: string, field: 'content' | 'metadata', value: any) => {
    setLesson({
      ...lesson,
      contents: lesson.contents.map(c =>
        c.id === contentId ? { ...c, [field]: value } : c
      )
    });
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'text': return '📄';
      case 'image': return '🖼️';
      case 'code': return '💻';
      case 'resource': return '🔗';
      case 'transcript': return '📝';
      case 'summary': return '📋';
      default: return '📄';
    }
  };

  const renderContentEditor = (content: LessonContent) => {
    switch (content.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="text"
                value={content.metadata?.url || ''}
                onChange={(e) => updateContent(content.id, 'metadata', { ...content.metadata, url: e.target.value })}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Title/Description</label>
              <textarea
                value={content.content}
                onChange={(e) => updateContent(content.id, 'content', e.target.value)}
                rows={3}
                placeholder="Enter video title or description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Content (Markdown supported)</label>
            <textarea
              value={content.content}
              onChange={(e) => updateContent(content.id, 'content', e.target.value)}
              rows={10}
              placeholder="Enter your lesson content here. Markdown is supported."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={content.metadata?.url || ''}
                onChange={(e) => updateContent(content.id, 'metadata', { ...content.metadata, url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text / Caption</label>
              <textarea
                value={content.content}
                onChange={(e) => updateContent(content.id, 'content', e.target.value)}
                rows={2}
                placeholder="Image description or caption"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Programming Language</label>
              <select
                value={content.metadata?.language || 'javascript'}
                onChange={(e) => updateContent(content.id, 'metadata', { ...content.metadata, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
              <textarea
                value={content.content}
                onChange={(e) => updateContent(content.id, 'content', e.target.value)}
                rows={12}
                placeholder="// Enter your code here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>
          </div>
        );

      case 'resource':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource URL</label>
              <input
                type="text"
                value={content.metadata?.url || ''}
                onChange={(e) => updateContent(content.id, 'metadata', { ...content.metadata, url: e.target.value })}
                placeholder="https://example.com/resource.pdf"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Description</label>
              <textarea
                value={content.content}
                onChange={(e) => updateContent(content.id, 'content', e.target.value)}
                rows={3}
                placeholder="Describe this resource"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'transcript':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Transcript</label>
            <textarea
              value={content.content}
              onChange={(e) => updateContent(content.id, 'content', e.target.value)}
              rows={15}
              placeholder="Enter the full transcript of the video lesson..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'summary':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Summary</label>
            <textarea
              value={content.content}
              onChange={(e) => updateContent(content.id, 'content', e.target.value)}
              rows={8}
              placeholder="Provide a summary of the key points covered in this lesson..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="John Doe">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Lesson</h1>
        <p className="text-gray-600">Create and manage lesson content</p>
      </div>

      {/* Lesson Header */}
      <Card className="mb-6">
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={lesson.description}
                onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={lesson.order}
                  onChange={(e) => setLesson({ ...lesson, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'content'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'content' && (
        <>
          {/* Add Content Button */}
          <div className="mb-6">
            {!showAddContent ? (
              <button
                onClick={() => setShowAddContent(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ➕ Add Content
              </button>
            ) : (
              <Card className="border-2 border-dashed border-blue-300">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Add New Content</h3>
                    <button
                      onClick={() => setShowAddContent(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {(['video', 'text', 'image', 'code', 'resource', 'transcript', 'summary'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewContentType(type)}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition ${
                          newContentType === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <span>{getContentIcon(type)}</span>
                        <span className="capitalize text-sm">{type}</span>
                      </button>
                    ))}
                  </div>
                  <Button onClick={addContent}>Add {newContentType}</Button>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {lesson.contents.map((content, index) => (
              <Card key={content.id}>
                <CardBody>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{getContentIcon(content.type)}</span>
                        <span className="font-medium capitalize">{content.type}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeContent(content.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      🗑️
                    </button>
                  </div>
                  {renderContentEditor(content)}
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <Card>
          <CardBody>
            <CardTitle>Lesson Settings</CardTitle>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="require-completion" className="rounded" />
                <label htmlFor="require-completion" className="text-sm text-gray-700">
                  Require completion before next lesson
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          👁️ Preview
        </Button>
        <Button className="flex items-center gap-2">
          💾 Save Lesson
        </Button>
      </div>
    </DashboardLayout>
  );
}
