'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import ProgressBar from '@/components/shared/ProgressBar';
import Badge from '@/components/shared/Badge';
import { useAuth } from '@/context/AuthContext';
import { coursesService, enrollmentsService, progressService } from '@/services';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'exercise' | 'summary';
  duration: string;
  completed: boolean;
  content?: string;
  locked?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  progress: number;
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourseData() {
      if (!currentUser) return;
      try {
        const courseData = await coursesService().getCourseById(courseId);
        const enrollmentData = await enrollmentsService().getEnrollment({
          userId: currentUser.id,
          courseId,
        });
        
        // Generate detailed course structure with topics and subtopics
        const generatedCourse: Course = {
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          progress: enrollmentData?.progress || 0,
          chapters: [
            {
              id: 'ch1',
              title: 'Chapter 1: Fundamentals',
              lessons: [
                { id: 'l1', title: 'Introduction', type: 'video', duration: '15:00', completed: false, locked: false },
                { id: 'l2', title: 'Getting Started', type: 'text', duration: '10:00', completed: false, locked: false },
                { id: 'l3', title: 'Quiz: Fundamentals', type: 'quiz', duration: '10:00', completed: false, locked: false },
              ],
            },
            {
              id: 'ch2',
              title: 'Chapter 2: Core Concepts',
              lessons: [
                { id: 'l4', title: 'Understanding Core Concepts', type: 'video', duration: '20:00', completed: false, locked: true },
                { id: 'l5', title: 'Practice Exercise', type: 'exercise', duration: '30:00', completed: false, locked: true },
                { id: 'l6', title: 'Chapter Summary', type: 'summary', duration: '5:00', completed: false, locked: true },
              ],
            },
          {
            id: 'ch3',
            title: 'Chapter 3: Advanced Topics',
            lessons: [
              { id: 'l7', title: 'Advanced Concepts', type: 'video', duration: '25:00', completed: false, locked: true },
              { id: 'l8', title: 'Final Quiz', type: 'quiz', duration: '15:00', completed: false, locked: true },
              { id: 'l9', title: 'Course Summary', type: 'summary', duration: '5:00', completed: false, locked: true },
            ],
          },
        ],
      };
      setCourse(generatedCourse);
      setEnrollment(enrollmentData);
    } catch (error) {
      console.error('Failed to load course data:', error);
    } finally {
      setIsLoading(false);
    }
  }
  loadCourseData();
}, [courseId, currentUser]);

  const currentChapter = course?.chapters[currentChapterIndex];
  const currentLesson = currentChapter?.lessons[currentLessonIndex];

  const handleCompleteLesson = async () => {
    if (!course || !currentChapter || !currentLesson || !currentUser) return;

    try {
      // Update lesson progress
      await progressService().updateLessonProgress({
        userId: currentUser.id,
        courseId,
        lessonId: currentLesson.id,
        completed: true,
      });

      // Mark lesson as completed and update progress
      const updatedCourse = { ...course };
      updatedCourse.chapters[currentChapterIndex].lessons[currentLessonIndex].completed = true;
      
      // Unlock next lesson
      const nextLessonIndex = currentLessonIndex + 1;
      if (nextLessonIndex < currentChapter.lessons.length) {
        updatedCourse.chapters[currentChapterIndex].lessons[nextLessonIndex].locked = false;
      }
      
      setCourse(updatedCourse);
      
      // Move to next lesson
      if (nextLessonIndex < currentChapter.lessons.length) {
        setCurrentLessonIndex(nextLessonIndex);
      } else if (currentChapterIndex < course.chapters.length - 1) {
        setCurrentChapterIndex(currentChapterIndex + 1);
        setCurrentLessonIndex(0);
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    }
  };

  const handleNextLesson = () => {
    if (!course || !currentChapter) return;
    
    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
      if (!nextLesson.locked) {
        setCurrentLessonIndex(prev => prev + 1);
      }
    } else if (currentChapterIndex < course.chapters.length - 1) {
      const nextChapter = course.chapters[currentChapterIndex + 1];
      if (nextChapter.lessons.length > 0 && !nextChapter.lessons[0].locked) {
        setCurrentChapterIndex(prev => prev + 1);
        setCurrentLessonIndex(0);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (!course) return;
    
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setCurrentLessonIndex(course.chapters[currentChapterIndex - 1].lessons.length - 1);
    }
  };

  const handleLessonClick = (chapterIdx: number, lessonIdx: number) => {
    const targetLesson = course?.chapters[chapterIdx].lessons[lessonIdx];
    if (targetLesson && !targetLesson.locked) {
      setCurrentChapterIndex(chapterIdx);
      setCurrentLessonIndex(lessonIdx);
    }
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

  const renderLessonContent = () => {
    if (!currentLesson) return <div>Loading lesson...</div>;

    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-lg">Video Player Placeholder</p>
              <p className="text-sm text-gray-400">{currentLesson.title}</p>
              <p className="text-sm text-gray-400 mt-2">Duration: {currentLesson.duration}</p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-300">In a real implementation, this would be an actual video player with controls, progress tracking, and interactive features.</p>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                This lesson covers important concepts that you need to understand before moving forward.
                In a real implementation, this would contain rich text content with examples, diagrams, and interactive elements.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">📖 Learning Objectives</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Understand the core concepts</li>
                  <li>Apply knowledge through examples</li>
                  <li>Prepare for the quiz</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Example</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`// Example code would go here
const example = "This is a code example";
console.log(example);

// More complex examples
function processData(data) {
  return data.map(item => ({
    ...item,
    processed: true
  }));
}`}</code>
                </pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important Note</h4>
                <p className="text-sm text-yellow-800">Pay attention to the details in this lesson as they will be tested in the upcoming quiz.</p>
              </div>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-bold mb-2">Quiz: {currentLesson.title}</h3>
            <p className="text-gray-600 mb-4">Test your knowledge with this quiz</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                This quiz will test your understanding of the material covered in this chapter.
                Remember: Revealing answers counts as NOT ANSWERED.
              </p>
            </div>
            <Button onClick={() => router.push(`/student/quizzes/${currentLesson.id}?courseId=${courseId}`)}>
              Start Quiz
            </Button>
          </div>
        );
      case 'exercise':
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2">Exercise: {currentLesson.title}</h3>
            <p className="text-gray-600 mb-4">Practice your skills with this hands-on exercise</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                This exercise will help you apply what you've learned through practical coding exercises.
              </p>
            </div>
            <Button onClick={() => router.push('/student/playground')}>
              Open Playground
            </Button>
          </div>
        );
      case 'summary':
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">📝 Chapter Summary</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                In this chapter, we covered the essential concepts and skills you need to master.
              </p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">🎯 Key Takeaways</h4>
                <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                  <li>Core concepts and terminology</li>
                  <li>Practical applications and examples</li>
                  <li>Best practices and common pitfalls</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📚 Next Steps</h4>
                <p className="text-sm text-gray-700">
                  Review the material if needed, then proceed to the next chapter or take the quiz to test your knowledge.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Lesson content not available</div>;
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="student" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading course...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showCertificate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="student" />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <Card>
              <CardBody>
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-gray-600 mb-6">
                    You have successfully completed the course "{course.title}"!
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                      Your certificate has been issued and is now available in your certificates section.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button onClick={() => router.push('/student/certificates')} className="w-full">
                      View Certificate
                    </Button>
                    <Button onClick={() => setShowCertificate(false)} variant="outline" className="w-full">
                      Continue to Course
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="student" />
      
      <main className="flex-1 flex">
        {/* Sidebar - Course Content */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} border-r border-gray-200 bg-white overflow-hidden transition-all duration-300`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg">Course Content</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ✕
                </button>
              </div>
              <ProgressBar progress={course.progress} />
              <p className="text-xs text-gray-500 mt-1">{course.progress}% Complete</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {course.chapters.map((chapter, chapterIdx) => (
                <div key={chapter.id} className="mb-6">
                  <h3 className="font-medium text-sm text-gray-700 mb-2">{chapter.title}</h3>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson, lessonIdx) => {
                      const isCurrent = chapterIdx === currentChapterIndex && lessonIdx === currentLessonIndex;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(chapterIdx, lessonIdx)}
                          disabled={lesson.locked}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                            lesson.locked
                              ? 'opacity-50 cursor-not-allowed bg-gray-50'
                              : isCurrent
                              ? 'bg-blue-50 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                          </div>
                          {lesson.locked && <span className="text-gray-400">🔒</span>}
                          {lesson.completed && !lesson.locked && <span className="text-green-600">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="border-b border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    ☰
                  </button>
                )}
                <div>
                  <h1 className="font-bold text-lg">{course.title}</h1>
                  <p className="text-sm text-gray-500">
                    {currentChapter?.title} • {currentLesson?.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                  <span className="text-purple-600 font-semibold text-sm">Level 18</span>
                  <span className="text-purple-600">⭐</span>
                  <span className="text-purple-600 text-sm">4,820 XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{currentLesson?.duration}</span>
                  <span className="text-lg">{getLessonIcon(currentLesson?.type || 'text')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardBody>
                  {renderLessonContent()}
                </CardBody>
              </Card>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  onClick={handlePreviousLesson}
                  variant="outline"
                  disabled={currentChapterIndex === 0 && currentLessonIndex === 0}
                >
                  ← Previous Lesson
                </Button>
                
                <div className="flex items-center gap-4">
                  {currentLesson && !currentLesson.completed && !currentLesson.locked && (
                    <Button onClick={handleCompleteLesson}>
                      ✓ Mark Complete
                    </Button>
                  )}
                  {currentLesson && currentLesson.locked && (
                    <Badge variant="warning">Locked - Complete previous lesson</Badge>
                  )}
                  <Button 
                    onClick={handleNextLesson}
                    disabled={currentLesson?.locked}
                  >
                    {currentChapterIndex === course.chapters.length - 1 && 
                     currentLessonIndex === currentChapter.lessons.length - 1
                      ? 'Complete Course'
                      : 'Next Lesson →'
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
