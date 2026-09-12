'use client';

import { Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { coursesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'exercise' | 'summary';
  duration: string;
  content?: string;
  videoUrl?: string;
  quizQuestions?: any[];
  exerciseInstructions?: string;
}

function LessonsBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');
  const chapterId = searchParams.get('chapter');
  const topicId = searchParams.get('topic');
  const subtopicId = searchParams.get('subtopic');
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [newLesson, setNewLesson] = useState({
    title: '',
    type: 'video' as 'video' | 'text' | 'quiz' | 'exercise' | 'summary',
    duration: '',
    content: '',
    videoUrl: '',
  });

  useEffect(() => {
    async function loadCourse() {
      if (!courseId || !currentUser) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId });
        setCourse(response.course);
        // Load lessons from curriculum structure
        if (response.course.curriculum) {
          const allLessons: Lesson[] = [];
          response.course.curriculum.forEach((chapter: any) => {
            chapter.topics.forEach((topic: any) => {
              topic.subtopics.forEach((subtopic: any) => {
                if (subtopic.lessons) {
                  allLessons.push(...subtopic.lessons);
                }
              });
            });
          });
          setLessons(allLessons);
        }
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const addLesson = () => {
    if (newLesson.title) {
      const lesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title: newLesson.title,
        type: newLesson.type,
        duration: newLesson.duration || '10:00',
        content: newLesson.content,
        videoUrl: newLesson.videoUrl,
      };
      setLessons([...lessons, lesson]);
      setNewLesson({ title: '', type: 'video', duration: '', content: '', videoUrl: '' });
    }
  };

  const editLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      type: lesson.type,
      duration: lesson.duration,
      content: lesson.content || '',
      videoUrl: lesson.videoUrl || '',
    });
    setIsEditing(true);
  };

  const updateLesson = () => {
    if (editingLesson) {
      const updatedLessons = lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { 
              ...lesson, 
              title: newLesson.title,
              type: newLesson.type,
              duration: newLesson.duration,
              content: newLesson.content,
              videoUrl: newLesson.videoUrl,
            }
          : lesson
      );
      setLessons(updatedLessons);
      setIsEditing(false);
      setEditingLesson(null);
      setNewLesson({ title: '', type: 'video', duration: '', content: '', videoUrl: '' });
    }
  };

  const deleteLesson = (lessonId: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
  };

  const handleSaveLessons = async () => {
    if (!courseId) return;
    
    setIsSaving(true);
    try {
      await coursesService().updateCourse({ courseId, lessons: lessons.length });
    } catch (error) {
      console.error('Failed to save lessons:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async () => {
    await handleSaveLessons();
    router.push(`/instructor/builder/pricing?id=${courseId}`);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'text': return '📄';
      case 'quiz': return '❓';
      case 'exercise': return '💻';
      case 'summary': return '📝';
      default: return '📚';
    }
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading lesson builder...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Builder</h1>
            <p className="text-gray-600">Create and manage lesson content for your subtopic</p>
            {course && (
              <p className="text-sm text-gray-500 mt-1">Course: {course.title}</p>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <Button onClick={handleSaveLessons} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button onClick={handleContinue} disabled={isSaving}>
              Continue to Pricing →
            </Button>
            <Link href={`/instructor/builder/curriculum?id=${courseId}`}>
              <Button>Back to Curriculum</Button>
            </Link>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lesson Form */}
        <Card>
          <CardBody>
            <CardTitle>{isEditing ? 'Edit Lesson' : 'Add New Lesson'}</CardTitle>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Introduction to Variables"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Type *
                </label>
                <select
                  value={newLesson.type}
                  onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="video">🎥 Video</option>
                  <option value="text">📄 Text</option>
                  <option value="quiz">❓ Quiz</option>
                  <option value="exercise">💻 Exercise</option>
                  <option value="summary">📝 Summary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 15:00"
                />
              </div>

              {newLesson.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              )}

              {(newLesson.type === 'text' || newLesson.type === 'summary') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your lesson content here..."
                  />
                </div>
              )}

              {newLesson.type === 'exercise' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Instructions *
                  </label>
                  <textarea
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the exercise and what students should accomplish..."
                  />
                </div>
              )}

              {newLesson.type === 'quiz' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Quiz questions will be configured in the Quiz Builder. Click "Configure Quiz" after adding this lesson.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={updateLesson}>
                      Update Lesson
                    </Button>
                    <Button onClick={() => {
                      setIsEditing(false);
                      setEditingLesson(null);
                      setNewLesson({ title: '', type: 'video', duration: '', content: '', videoUrl: '' });
                    }} variant="outline">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={addLesson}>
                    Add Lesson
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Lessons List */}
        <Card>
          <CardBody>
            <CardTitle>Lessons ({lessons.length})</CardTitle>
            
            {lessons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📚</div>
                <p>No lessons yet. Add your first lesson to get started.</p>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>Type: {lesson.type}</span>
                          <span>Duration: {lesson.duration}</span>
                        </div>
                        {lesson.content && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {lesson.content.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button onClick={() => editLesson(lesson)} size="sm" variant="outline">
                          Edit
                        </Button>
                        {lesson.type === 'quiz' && (
                          <Button 
                            onClick={() => router.push(`/instructor/builder/quizzes?courseId=${courseId}&lessonId=${lesson.id}`)}
                            size="sm" 
                            variant="outline"
                          >
                            Configure Quiz
                          </Button>
                        )}
                        <Button onClick={() => deleteLesson(lesson.id)} variant="danger" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default function LessonsBuilder() {
  return (
    <Suspense fallback={<div>Loading lesson builder...</div>}>
      <LessonsBuilderContent />
    </Suspense>
  );
}
