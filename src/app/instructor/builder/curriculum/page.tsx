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
}

interface Subtopic {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

function CurriculumBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId || !currentUser) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId });
        setCourse(response.course);
        setChapters(response.course.curriculum || [
          {
            id: `ch-${Date.now()}-1`,
            title: 'Chapter 1: Introduction',
            topics: [
              {
                id: `topic-${Date.now()}-1`,
                title: 'Getting Started',
                subtopics: [
                  {
                    id: `sub-${Date.now()}-1`,
                    title: 'Overview',
                    lessons: [],
                  },
                ],
              },
            ],
          },
        ]);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      title: `Chapter ${chapters.length + 1}: New Chapter`,
      topics: []
    };
    setChapters([...chapters, newChapter]);
  };

  const addTopic = (chapterId: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const newTopic: Topic = {
          id: `topic-${Date.now()}`,
          title: 'New Topic',
          subtopics: []
        };
        return { ...chapter, topics: [...chapter.topics, newTopic] };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const addSubtopic = (chapterId: string, topicId: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedTopics = chapter.topics.map(topic => {
          if (topic.id === topicId) {
            const newSubtopic: Subtopic = {
              id: `sub-${Date.now()}`,
              title: 'New Subtopic',
              lessons: [],
            };
            return { ...topic, subtopics: [...topic.subtopics, newSubtopic] };
          }
          return topic;
        });
        return { ...chapter, topics: updatedTopics };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const updateChapterTitle = (chapterId: string, title: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, title };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const updateTopicTitle = (chapterId: string, topicId: string, title: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedTopics = chapter.topics.map(topic => {
          if (topic.id === topicId) {
            return { ...topic, title };
          }
          return topic;
        });
        return { ...chapter, topics: updatedTopics };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const updateSubtopicTitle = (chapterId: string, topicId: string, subtopicId: string, title: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedTopics = chapter.topics.map(topic => {
          if (topic.id === topicId) {
            const updatedSubtopics = topic.subtopics.map(subtopic => {
              if (subtopic.id === subtopicId) {
                return { ...subtopic, title };
              }
              return subtopic;
            });
            return { ...topic, subtopics: updatedSubtopics };
          }
          return topic;
        });
        return { ...chapter, topics: updatedTopics };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(ch => ch.id !== chapterId));
  };

  const deleteTopic = (chapterId: string, topicId: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, topics: chapter.topics.filter(t => t.id !== topicId) };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const deleteSubtopic = (chapterId: string, topicId: string, subtopicId: string) => {
    const updatedChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedTopics = chapter.topics.map(topic => {
          if (topic.id === topicId) {
            return { ...topic, subtopics: topic.subtopics.filter(s => s.id !== subtopicId) };
          }
          return topic;
        });
        return { ...chapter, topics: updatedTopics };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const handleSaveCurriculum = async () => {
    if (!courseId) return;
    
    setIsSaving(true);
    try {
      const lessonCount = chapters.reduce((total, ch) => 
        total + ch.topics.reduce((topicTotal, topic) => 
          topicTotal + topic.subtopics.reduce((subTotal, sub) => subTotal + sub.lessons.length, 0), 0), 0);
      
      await coursesService().updateCourse({ courseId, curriculum: chapters, lessons: lessonCount });
    } catch (error) {
      console.error('Failed to save curriculum:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async () => {
    await handleSaveCurriculum();
    router.push(`/instructor/builder/lessons?id=${courseId}`);
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading curriculum...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h1>
            <p className="text-gray-600">Build your course structure with chapters, topics, and subtopics</p>
            {course && (
              <p className="text-sm text-gray-500 mt-1">Course: {course.title}</p>
            )}
          </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={addChapter}>
          + Add Chapter
        </Button>
        <Button onClick={handleSaveCurriculum} variant="outline" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button onClick={handleContinue} disabled={isSaving}>
          Continue to Lessons →
        </Button>
        <Link href="/instructor/builder/info">
          <Button variant="outline">Back to Course Info</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                    className="w-full text-lg font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => addTopic(chapter.id)} size="sm">
                    + Add Topic
                  </Button>
                  <Button onClick={() => deleteChapter(chapter.id)} variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
              
              {chapter.topics.length > 0 ? (
                <div className="space-y-3">
                  {chapter.topics.map((topic) => (
                    <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 mr-4">
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(e) => updateTopicTitle(chapter.id, topic.id, e.target.value)}
                            className="w-full font-medium border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => addSubtopic(chapter.id, topic.id)} size="sm">
                            + Add Subtopic
                          </Button>
                          <Button onClick={() => deleteTopic(chapter.id, topic.id)} variant="danger" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      {topic.subtopics.length > 0 ? (
                        <div className="space-y-2 ml-4">
                          {topic.subtopics.map((subtopic) => (
                            <div 
                              key={subtopic.id}
                              className="border border-gray-200 rounded p-3 hover:border-blue-300 transition"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                  <input
                                    type="text"
                                    value={subtopic.title}
                                    onChange={(e) => updateSubtopicTitle(chapter.id, topic.id, subtopic.id, e.target.value)}
                                    className="w-full text-sm font-medium border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">
                                    {subtopic.lessons.length} lessons
                                  </span>
                                  <Button 
                                    onClick={() => router.push(`/instructor/builder/lessons?courseId=${courseId}&chapter=${chapter.id}&topic=${topic.id}&subtopic=${subtopic.id}`)}
                                    size="sm"
                                    variant="outline"
                                  >
                                    Add Lessons
                                  </Button>
                                  <Button 
                                    onClick={() => deleteSubtopic(chapter.id, topic.id, subtopic.id)} 
                                    variant="danger" 
                                    size="sm"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No subtopics yet. Add your first subtopic.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No topics yet. Add your first topic to get started.
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Course Structure Guide</h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>Chapter:</strong> Main sections of your course</p>
          <p>• <strong>Topic:</strong> Specific subjects within chapters</p>
          <p>• <strong>Subtopic:</strong> Detailed breakdown of topics</p>
          <p>• <strong>Lessons:</strong> Individual learning units (video, text, quiz, exercise)</p>
        </div>
      </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default function CurriculumBuilder() {
  return (
    <Suspense fallback={<div>Loading curriculum builder...</div>}>
      <CurriculumBuilderContent />
    </Suspense>
  );
}