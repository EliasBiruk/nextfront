'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useState } from 'react';

interface Note {
  id: number;
  title: string;
  course: string;
  content: string;
  date: string;
  color: string;
}

export default function StudentNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'JavaScript DOM Manipulation',
      course: 'JavaScript Fundamentals',
      content: 'Key concepts: querySelector, addEventListener, element manipulation. The DOM (Document Object Model) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.',
      date: '2 days ago',
      color: 'blue'
    },
    {
      id: 2,
      title: 'React State Management',
      course: 'React Development',
      content: 'useState, useEffect, context API patterns and best practices. State management in React is crucial for building interactive applications. useState hook allows functional components to have state, while useEffect handles side effects.',
      date: '3 days ago',
      color: 'green'
    },
    {
      id: 3,
      title: 'Python Data Structures',
      course: 'Python for Data Science',
      content: 'Lists, dictionaries, sets, tuples - when to use each. Python provides several built-in data structures that are essential for data manipulation and analysis.',
      date: '5 days ago',
      color: 'yellow'
    },
    {
      id: 4,
      title: 'CSS Flexbox Guide',
      course: 'Web Development Basics',
      content: 'Flex container properties, aligning items, responsive layouts. Flexbox is a one-dimensional layout method for laying out items in rows or columns.',
      date: '1 week ago',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Async JavaScript Patterns',
      course: 'JavaScript Fundamentals',
      content: 'Promises, async/await, handling errors in async code. Asynchronous JavaScript is essential for operations like fetching data from APIs without blocking the main thread.',
      date: '1 week ago',
      color: 'red'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      course: 'Data Science with Python',
      content: 'Supervised vs unsupervised learning, model evaluation. Machine learning algorithms can be categorized based on the type of learning signal they receive.',
      date: '2 weeks ago',
      color: 'indigo'
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Note>>({});

  const handleCreateNote = () => {
    setIsCreating(true);
    setSelectedNote(null);
  };

  const handleSaveNote = () => {
    if (editForm.title && editForm.content) {
      const newNote: Note = {
        id: Date.now(),
        title: editForm.title,
        course: editForm.course || 'General',
        content: editForm.content,
        date: 'Just now',
        color: 'blue'
      };
      setNotes([newNote, ...notes]);
      setIsCreating(false);
      setEditForm({});
    }
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setEditForm(note);
    setIsEditing(true);
  };

  const handleUpdateNote = () => {
    if (selectedNote && editForm.title && editForm.content) {
      setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, ...editForm } as Note : n));
      setIsEditing(false);
      setSelectedNote(null);
      setEditForm({});
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleBackToList = () => {
    setSelectedNote(null);
    setIsCreating(false);
    setIsEditing(false);
    setEditForm({});
  };

  // Create Note View
  if (isCreating) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Notes
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Note</h1>
          <p className="text-gray-600">Add a new note to your collection</p>
        </div>

        <Card>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter note title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course (Optional)</label>
                <input
                  type="text"
                  value={editForm.course || ''}
                  onChange={(e) => setEditForm({...editForm, course: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Related course"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your note content here..."
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleSaveNote}>Save Note</Button>
                <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  // Edit Note View
  if (isEditing && selectedNote) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Notes
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Note</h1>
          <p className="text-gray-600">Update your note</p>
        </div>

        <Card>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={editForm.course || ''}
                  onChange={(e) => setEditForm({...editForm, course: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleUpdateNote}>Update Note</Button>
                <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  // Note Detail View
  if (selectedNote) {
    return (
      <DashboardLayout actor="student" userName="Kapi">
        <div className="mb-6">
          <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Notes
          </button>
        </div>

        <Card className="mb-6">
          <CardBody>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedNote.title}</h1>
                <p className="text-sm text-blue-600">{selectedNote.course}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditNote(selectedNote)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Edit
                </button>
                <button onClick={() => handleDeleteNote(selectedNote.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">{selectedNote.date}</div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedNote.content}</p>
            </div>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  // Notes List View
  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Notes</h1>
          <p className="text-gray-600">Personal notes and highlights from your learning</p>
        </div>
        <Button onClick={handleCreateNote}>+ New Note</Button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition cursor-pointer" onClick={() => handleViewNote(note)}>
            <CardBody>
              <div className={`h-2 w-12 rounded-full mb-4 bg-${note.color}-500`}></div>
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
              <p className="text-sm text-blue-600 mb-2">{note.course}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{note.content.substring(0, 100)}...</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{note.date}</span>
                <span>→</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {notes.length === 0 && (
        <Card className="mt-6">
          <CardBody className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Create Your First Note</h3>
            <p className="text-gray-600 mb-4">Take notes while learning to remember important concepts</p>
            <Button onClick={handleCreateNote}>Create Note</Button>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
}