'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import { useState } from 'react';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  views: string;
  likes: number;
  author: string;
  date: string;
  icon: string;
  featured?: boolean;
}

export default function StudentStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: 'From Dropout to Data Scientist: Sarah\'s Journey',
      excerpt: 'Sarah was struggling in college when she discovered online learning. Through dedication and the right courses, she transformed her career and now works at a leading tech company.',
      content: `Sarah was struggling in college when she discovered online learning. Through dedication and the right courses, she transformed her career and now works at a leading tech company. This is her story of perseverance and the power of accessible education.

Chapter 1: The Struggle
Sarah was 22 years old, sitting in her college dorm room, staring at a failing grade in calculus. She had always been a decent student, but the traditional classroom environment wasn't working for her. The pressure was mounting, and she felt like she was falling behind her peers.

"I felt like I wasn't smart enough," Sarah recalls. "Everyone else seemed to understand the material effortlessly, while I was struggling to keep up."

Chapter 2: The Discovery
One evening, while scrolling through social media, Sarah came across an advertisement for a free introductory course on data science. Something about it caught her attention. She decided to give it a try, not expecting much.

To her surprise, the online format worked perfectly for her. She could pause, rewind, and re-watch explanations until she understood. She could learn at her own pace, without the pressure of keeping up with a classroom.

Chapter 3: The Transformation
Over the next six months, Sarah completed over 20 online courses. She spent her evenings and weekends learning Python, statistics, and machine learning. The more she learned, the more confident she became.

Her college grades started improving too. The online courses had given her a different perspective on learning. She realized that everyone learns differently, and that was okay.

Chapter 4: The Breakthrough
Sarah's big break came when she decided to apply for a data science internship at a local tech company. She didn't have a traditional computer science degree, but she had built an impressive portfolio of projects from her online courses.

The interviewers were impressed not just by her technical skills, but by her passion and self-motivation. They offered her the internship on the spot.

Chapter 5: Success Today
Three years later, Sarah is now a senior data scientist at that same company. She mentors other students who are following a similar path, showing them that alternative education routes can lead to incredible success.

"Online learning changed my life," Sarah says. "It showed me that with dedication and the right resources, anyone can achieve their goals, regardless of their background."`,
      category: 'Success Story',
      readTime: '5 min',
      views: '12.5k',
      likes: 890,
      author: 'JoyEdu Team',
      date: 'Jan 10, 2025',
      icon: '📖',
      featured: true
    },
    {
      id: 2,
      title: 'The Future of AI in Education',
      excerpt: 'How artificial intelligence is transforming the way we learn and teach...',
      content: `Artificial intelligence is revolutionizing education in ways we never imagined. From personalized learning paths to intelligent tutoring systems, AI is making education more accessible and effective than ever before.

Personalized Learning
AI algorithms can analyze a student's learning patterns and adapt the curriculum to their individual needs. This means no two students follow the exact same learning path - each gets a customized experience.

Intelligent Tutoring
AI-powered tutors can provide instant feedback and guidance, available 24/7. They can identify knowledge gaps and suggest targeted exercises to help students improve.

Automated Assessment
AI can grade assignments and provide detailed feedback instantly, freeing up teachers to focus on more meaningful interactions with students.

The Future
As AI technology continues to evolve, we can expect even more innovative applications in education. Virtual reality classrooms, language translation in real-time, and predictive analytics for student success are just the beginning.`,
      category: 'Technology',
      readTime: '4 min',
      views: '8.2k',
      likes: 567,
      author: 'Dr. Michael Chen',
      date: 'Jan 8, 2025',
      icon: '🤖'
    },
    {
      id: 3,
      title: 'Learning While Working: Time Management Tips',
      excerpt: 'Practical strategies for balancing full-time work with online education...',
      content: `Balancing a full-time job with online education is challenging, but entirely possible with the right strategies. Here are proven techniques to help you succeed.

Set Clear Goals
Define exactly what you want to achieve from your education. Clear goals will help you stay motivated and focused.

Create a Schedule
Block out specific times for studying in your calendar. Treat these study sessions as non-negotiable appointments.

Use Micro-Learning
Break your study sessions into smaller, manageable chunks. Even 15-20 minutes of focused learning can be effective.

Leverage Commute Time
Use your commute to listen to educational podcasts or review flashcards on your phone.

Take Care of Yourself
Don't sacrifice sleep or exercise. A healthy body supports a healthy mind for learning.

Seek Support
Join online communities of fellow learners. Having a support system can make a huge difference.`,
      category: 'Productivity',
      readTime: '6 min',
      views: '5.7k',
      likes: 423,
      author: 'Emma Wilson',
      date: 'Jan 5, 2025',
      icon: '⏰'
    },
    {
      id: 4,
      title: 'Breaking into Tech Without a CS Degree',
      excerpt: 'Success stories and actionable advice for career changers...',
      content: `The tech industry is full of professionals who didn't study computer science in college. Here's how they did it, and how you can too.

Build a Strong Portfolio
Projects speak louder than degrees. Build real applications that solve real problems. Share your code on GitHub and write about your projects.

Learn the Fundamentals
Even without a degree, you need a solid understanding of computer science fundamentals. Online courses can teach you algorithms, data structures, and system design.

Network Actively
Attend meetups, join online communities, and connect with people in the industry. Many job opportunities come through personal connections.

Consider Bootcamps
Coding bootcamps offer intensive, practical training that can fast-track your entry into tech.

Stay Persistent
Rejection is part of the process. Keep learning, keep building, and keep applying. The right opportunity will come.`,
      category: 'Career',
      readTime: '8 min',
      views: '15.3k',
      likes: 1234,
      author: 'Alex Rivera',
      date: 'Jan 3, 2025',
      icon: '💼'
    },
    {
      id: 5,
      title: 'The Science of Effective Learning',
      excerpt: 'Research-backed techniques to improve retention and understanding...',
      content: `Learning is a skill that can be improved with the right techniques. Here are science-backed strategies to enhance your learning.

Active Recall
Instead of just re-reading material, test yourself. Active recall strengthens neural pathways and improves long-term retention.

Spaced Repetition
Review material at increasing intervals over time. This technique helps move information from short-term to long-term memory.

Interleaving
Mix different topics or types of problems in your study sessions. This improves your ability to distinguish between concepts and apply them in different contexts.

Elaboration
Explain concepts in your own words. Teaching someone else is one of the best ways to solidify your understanding.

Dual Coding
Combine verbal and visual information. Draw diagrams, create mind maps, and use visual aids alongside text.

Sleep and Learning
Sleep is crucial for memory consolidation. Prioritize good sleep to maximize your learning effectiveness.`,
      category: 'Learning',
      readTime: '5 min',
      views: '9.1k',
      likes: 678,
      author: 'Dr. Lisa Park',
      date: 'Dec 28, 2024',
      icon: '🧠'
    },
  ];

  const handleReadStory = (story: Story) => {
    setSelectedStory(story);
  };

  const handleBackToList = () => {
    setSelectedStory(null);
  };

  // Story Detail View
  if (selectedStory) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Stories
          </button>
        </div>

        <Card className="mb-6">
          <CardBody>
            {selectedStory.featured && <Badge variant="info" className="mb-4">Featured</Badge>}
            <div className="text-4xl mb-4">{selectedStory.icon}</div>
            <Badge variant="default" className="mb-3">{selectedStory.category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{selectedStory.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <span>By {selectedStory.author}</span>
              <span>📅 {selectedStory.date}</span>
              <span>⏱️ {selectedStory.readTime} read</span>
              <span>👁️ {selectedStory.views} views</span>
              <span>❤️ {selectedStory.likes} likes</span>
            </div>
            <div className="prose max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedStory.content}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Related Stories</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories
                .filter(s => s.id !== selectedStory.id)
                .slice(0, 2)
                .map((story) => (
                  <div
                    key={story.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer"
                    onClick={() => handleReadStory(story)}
                  >
                    <div className="text-2xl mb-2">{story.icon}</div>
                    <h3 className="font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{story.excerpt}</p>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  // Stories List View
  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Educational Stories</h1>
        <p className="text-gray-600">Discover inspiring stories and educational content</p>
      </div>

      {/* Featured Story */}
      {stories.find(s => s.featured) && (
        <Card className="mb-6 cursor-pointer hover:shadow-lg transition" onClick={() => handleReadStory(stories.find(s => s.featured)!)} >
          <CardBody>
            <div className="text-4xl mb-4">📖</div>
            <Badge variant="info" className="">Featured</Badge>
            <h2 className="text-2xl font-bold mb-3">{stories.find(s => s.featured)!.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {stories.find(s => s.featured)!.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📅 {stories.find(s => s.featured)!.readTime} read</span>
              <span>👁️ {stories.find(s => s.featured)!.views} views</span>
              <span>❤️ {stories.find(s => s.featured)!.likes} likes</span>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.filter(s => !s.featured).map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition cursor-pointer" onClick={() => handleReadStory(story)}>
            <CardBody>
              <div className="text-3xl mb-3">{story.icon}</div>
              <Badge variant="default" className="">{story.category}</Badge>
              <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{story.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📅 {story.readTime} read</span>
                <span>👁️ {story.views} views</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}