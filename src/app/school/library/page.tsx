'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolLibrary() {
  const [books, setBooks] = useState([
    {
      id: 'book-1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      category: 'Fiction',
      status: 'Borrowed',
      borrower: 'John Smith (STU2024001)',
      borrowDate: '2024-08-20',
      dueDate: '2024-09-03',
    },
    {
      id: 'book-2',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '978-0553380163',
      category: 'Science',
      status: 'Overdue',
      borrower: 'Emma Johnson (STU2024002)',
      borrowDate: '2024-08-18',
      dueDate: '2024-09-01',
    },
    {
      id: 'book-3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0061120084',
      category: 'Fiction',
      status: 'Available',
      borrower: null,
      borrowDate: null,
      dueDate: null,
    },
    {
      id: 'book-4',
      title: 'Introduction to Psychology',
      author: 'James W. Kalat',
      isbn: '978-1305271555',
      category: 'Reference',
      status: 'Borrowed',
      borrower: 'Sarah Williams (STU2024004)',
      borrowDate: '2024-08-22',
      dueDate: '2024-09-05',
    },
    {
      id: 'book-5',
      title: 'The Art of War',
      author: 'Sun Tzu',
      isbn: '978-1599869773',
      category: 'History',
      status: 'Available',
      borrower: null,
      borrowDate: null,
      dueDate: null,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleReturn = (bookId: string) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        return { ...book, status: 'Available', borrower: null, borrowDate: null, dueDate: null };
      }
      return book;
    }));
  };

  const handleSendReminder = (bookId: string) => {
    alert(`Reminder sent for overdue book ${bookId}`);
  };

  const handleDelete = (bookId: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(b => b.id !== bookId));
    }
  };

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Library</h1>
        <p className="text-gray-600">Manage library books, borrowing, and resources</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ Add Book</Button>
          <Button variant="outline">Register Member</Button>
          <Button variant="outline">Process Return</Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Reference">Reference</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Library Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{books.length}</div>
            <p className="text-gray-600 text-sm">Total Books</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {books.filter(b => b.status === 'Available').length}
            </div>
            <p className="text-gray-600 text-sm">Available</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {books.filter(b => b.status === 'Borrowed').length}
            </div>
            <p className="text-gray-600 text-sm">Borrowed</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {books.filter(b => b.status === 'Overdue').length}
            </div>
            <p className="text-gray-600 text-sm">Overdue</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">3,240</div>
            <p className="text-gray-600 text-sm">Members</p>
          </CardBody>
        </Card>
      </div>

      {/* Books List */}
      <Card>
        <CardBody>
          <CardTitle>Library Books ({filteredBooks.length} books)</CardTitle>
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📖
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{book.title}</h3>
                        <Badge variant={
                          book.status === 'Available' ? 'success' : 
                          book.status === 'Borrowed' ? 'warning' : 
                          book.status === 'Overdue' ? 'danger' : 'default'
                        }>
                          {book.status}
                        </Badge>
                        <Badge variant="default" size="sm">{book.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">By: {book.author}</p>
                      <p className="text-xs text-gray-400 mt-1">ISBN: {book.isbn}</p>
                      {book.borrower && (
                        <>
                          <p className="text-sm text-gray-600 mt-1">Borrower: {book.borrower}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-gray-600">Borrowed: <span className="font-semibold">{book.borrowDate}</span></span>
                            <span className="text-gray-600">Due: <span className="font-semibold">{book.dueDate}</span></span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {book.status === 'Borrowed' && (
                      <Button variant="outline" size="sm" onClick={() => handleReturn(book.id)}>
                        Return
                      </Button>
                    )}
                    {book.status === 'Overdue' && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleReturn(book.id)}>
                          Return
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSendReminder(book.id)}>
                          Send Reminder
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDelete(book.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredBooks.length === 0 && (
              <div className="text-center py-8 text-gray-500">No books found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>Add New Book</CardTitle>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Add book form would go here with fields for:</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  <li>Title</li>
                  <li>Author</li>
                  <li>ISBN</li>
                  <li>Category</li>
                  <li>Publisher</li>
                  <li>Publication Year</li>
                  <li>Quantity</li>
                </ul>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline">Add Book</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}