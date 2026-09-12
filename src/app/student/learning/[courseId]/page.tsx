'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Badge from '@/components/shared/Badge';
import { ChevronRight, ChevronDown, PlayCircle, CheckCircle, Lock, BookOpen, FileText, Video } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  order: number;
  completed: boolean;
  locked: boolean;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  order: number;
  completed: boolean;
  locked: boolean;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  title: string;
  order: number;
  completed: boolean;
  locked: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'exercise' | 'summary';
  order: number;
  completed: boolean;
  locked: boolean;
  duration?: string;
}

export default function CourseLearningPage({ params }: { params: { courseId: string } }) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['ch1']));
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(['ch1-t1']));
  const [expandedSubtopics, setExpandedSubtopics] = useState<Set<string>>(new Set(['ch1-t1-s1']));

  // Mock course data
  const course = {
    id: params.courseId,
    title: 'JavaScript Fundamentals',
    description: 'Master the fundamentals of JavaScript programming',
    instructor: 'John Doe',
    progress: 45,
    totalLessons: 24,
    completedLessons: 11,
    estimatedHours: 12,
    chapters: [
      {
        id: 'ch1',
        title: 'Chapter 1: Introduction to JavaScript',
        order: 1,
        completed: false,
        locked: false,
        topics: [
          {
            id: 'ch1-t1',
            title: 'Topic 1: What is JavaScript?',
            order: 1,
            completed: true,
            locked: false,
            subtopics: [
              {
                id: 'ch1-t1-s1',
                title: 'Subtopic 1: History and Overview',
                order: 1,
                completed: true,
                locked: false,
                lessons: [
                  { id: 'l1', title: 'Introduction to JavaScript', type: 'video', order: 1, completed: true, locked: false, duration: '10:30' },
                  { id: 'l2', title: 'JavaScript History', type: 'text', order: 2, completed: true, locked: false },
                  { id: 'l3', title: 'Quiz: JavaScript Basics', type: 'quiz', order: 3, completed: true, locked: false },
                ]
              },
              {
                id: 'ch1-t1-s2',
                title: 'Subtopic 2: JavaScript in Modern Web',
                order: 2,
                completed: false,
                locked: false,
                lessons: [
                  { id: 'l4', title: 'Modern JavaScript Ecosystem', type: 'video', order: 1, completed: false, locked: false, duration: '15:00' },
                  { id: 'l5', title: 'Exercise: Setup Environment', type: 'exercise', order: 2, completed: false, locked: false },
                ]
              }
            ]
          },
          {
            id: 'ch1-t2',
            title: 'Topic 2: Setting Up Your Environment',
            order: 2,
            completed: false,
            locked: false,
            subtopics: [
              {
                id: 'ch1-t2-s1',
                title: 'Subtopic 1: Browser Console',
                order: 1,
                completed: false,
                locked: false,
                lessons: [
                  { id: 'l6', title: 'Using Browser DevTools', type: 'video', order: 1, completed: false, locked: false, duration: '12:00' },
                  { id: 'l7', title: 'Exercise: Console Basics', type: 'exercise', order: 2, completed: false, locked: false },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ch2',
        title: 'Chapter 2: Variables and Data Types',
        order: 2,
        completed: false,
        locked: false,
        topics: [
          {
            id: 'ch2-t1',
            title: 'Topic 1: Variables',
            order: 1,
            completed: false,
            locked: false,
            subtopics: [
              {
                id: 'ch2-t1-s1',
                title: 'Subtopic 1: let, const, var',
                order: 1,
                completed: false,
                locked: false,
                lessons: [
                  { id: 'l8', title: 'Declaring Variables', type: 'video', order: 1, completed: false, locked: false, duration: '18:00' },
                  { id: 'l9', title: 'Variable Scopes', type: 'text', order: 2, completed: false, locked: false },
                  { id: 'l10', title: 'Quiz: Variables', type: 'quiz', order: 3, completed: false, locked: false },
                ]
              }
            ]
          },
          {
            id: 'ch2-t2',
            title: 'Topic 2: Data Types',
            order: 2,
            completed: false,
            locked: true,
            subtopics: [
              {
                id: 'ch2-t2-s1',
                title: 'Subtopic 1: Primitive Types',
                order: 1,
                completed: false,
                locked: true,
                lessons: [
                  { id: 'l11', title: 'String, Number, Boolean', type: 'video', order: 1, completed: false, locked: true, duration: '20:00' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ch3',
        title: 'Chapter 3: Functions',
        order: 3,
        completed: false,
        locked: true,
        topics: []
      }
    ]
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const toggleSubtopic = (subtopicId: string) => {
    const newExpanded = new Set(expandedSubtopics);
    if (newExpanded.has(subtopicId)) {
      newExpanded.delete(subtopicId);
    } else {
      newExpanded.add(subtopicId);
    }
    setExpandedSubtopics(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <BookOpen className="w-4 h-4" />;
      case 'exercise': return <PlayCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-700';
      case 'text': return 'bg-blue-100 text-blue-700';
      case 'quiz': return 'bg-orange-100 text-orange-700';
      case 'exercise': return 'bg-green-100 text-green-700';
      case 'summary': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout actor="student" userName="John Smith">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span>👨‍🏫 {course.instructor}</span>
          <span>📚 {course.totalLessons} lessons</span>
          <span>⏱️ {course.estimatedHours} hours</span>
        </div>
      </div>

      {/* Course Progress */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Course Progress</CardTitle>
            <Badge variant="success">{course.progress}% Complete</Badge>
          </div>
          <ProgressBar progress={course.progress} />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
            <span>{course.totalLessons - course.completedLessons} lessons remaining</span>
          </div>
        </CardBody>
      </Card>

      {/* Course Hierarchy */}
      <div className="space-y-4">
        {course.chapters.map((chapter) => (
          <Card key={chapter.id} className={chapter.locked ? 'opacity-60' : ''}>
            <CardBody>
              {/* Chapter Level */}
              <div
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => !chapter.locked && toggleChapter(chapter.id)}
              >
                <div className="flex items-center gap-3">
                  {chapter.locked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : chapter.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                    <p className="text-sm text-gray-600">
                      {chapter.topics.reduce((acc, t) => acc + t.subtopics.reduce((acc2, s) => acc2 + s.lessons.length, 0), 0)} lessons
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!chapter.locked && (
                    <>
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Topics Level */}
              {expandedChapters.has(chapter.id) && !chapter.locked && (
                <div className="ml-8 mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
                  {chapter.topics.map((topic) => (
                    <div key={topic.id}>
                      <div
                        className="flex items-center justify-between cursor-pointer py-2"
                        onClick={() => !topic.locked && toggleTopic(topic.id)}
                      >
                        <div className="flex items-center gap-3">
                          {topic.locked ? (
                            <Lock className="w-4 h-4 text-gray-400" />
                          ) : topic.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">{topic.title}</h4>
                            <p className="text-xs text-gray-600">
                              {topic.subtopics.reduce((acc, s) => acc + s.lessons.length, 0)} lessons
                            </p>
                          </div>
                        </div>
                        {expandedTopics.has(topic.id) && !topic.locked && (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>

                      {/* Subtopics Level */}
                      {expandedTopics.has(topic.id) && !topic.locked && (
                        <div className="ml-6 mt-3 space-y-2 border-l-2 border-gray-200 pl-4">
                          {topic.subtopics.map((subtopic) => (
                            <div key={subtopic.id}>
                              <div
                                className="flex items-center justify-between cursor-pointer py-2"
                                onClick={() => !subtopic.locked && toggleSubtopic(subtopic.id)}
                              >
                                <div className="flex items-center gap-3">
                                  {subtopic.locked ? (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  ) : subtopic.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                  )}
                                  <div>
                                    <h5 className="font-medium text-gray-900 text-sm">{subtopic.title}</h5>
                                    <p className="text-xs text-gray-600">
                                      {subtopic.lessons.length} lessons
                                    </p>
                                  </div>
                                </div>
                                {expandedSubtopics.has(subtopic.id) && !subtopic.locked && (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                              </div>

                              {/* Lessons Level */}
                              {expandedSubtopics.has(subtopic.id) && !subtopic.locked && (
                                <div className="ml-6 mt-3 space-y-2">
                                  {subtopic.lessons.map((lesson) => (
                                    <div
                                      key={lesson.id}
                                      className={`flex items-center justify-between p-3 rounded-lg border transition cursor-pointer ${
                                        lesson.locked
                                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                          : lesson.completed
                                          ? 'border-green-200 bg-green-50 hover:border-green-400'
                                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        {lesson.locked ? (
                                          <Lock className="w-4 h-4 text-gray-400" />
                                        ) : lesson.completed ? (
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <PlayCircle className="w-4 h-4 text-blue-500" />
                                        )}
                                        <div className="flex items-center gap-2">
                                          {getLessonIcon(lesson.type)}
                                          <div>
                                            <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                                            {lesson.duration && (
                                              <p className="text-xs text-gray-600">{lesson.duration}</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getLessonTypeColor(lesson.type)}`}>
                                          {lesson.type}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
