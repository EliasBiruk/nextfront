'use client';

import { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockSchools, mockStudents } from '@/data/mockData';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  status: 'Available' | 'Checked Out' | 'Reserved' | 'Lost' | 'Damaged';
}

interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
  fine?: number;
}

interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  reservationDate: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
}

export default function LibraryDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('books');
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBorrow, setSelectedBorrow] = useState<BorrowRecord | null>(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';
  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  // Mock library data
  const [books, setBooks] = useState<Book[]>([
    {
      id: 'book-1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      category: 'Computer Science',
      totalCopies: 5,
      availableCopies: 3,
      location: 'Section A, Shelf 1',
      status: 'Available',
    },
    {
      id: 'book-2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Programming',
      totalCopies: 3,
      availableCopies: 0,
      location: 'Section A, Shelf 2',
      status: 'Checked Out',
    },
    {
      id: 'book-3',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '978-0201633610',
      category: 'Software Engineering',
      totalCopies: 4,
      availableCopies: 2,
      location: 'Section B, Shelf 1',
      status: 'Available',
    },
    {
      id: 'book-4',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      category: 'Programming',
      totalCopies: 6,
      availableCopies: 4,
      location: 'Section A, Shelf 3',
      status: 'Available',
    },
    {
      id: 'book-5',
      title: 'Structure and Interpretation of Computer Programs',
      author: 'Harold Abelson',
      isbn: '978-0070004849',
      category: 'Computer Science',
      totalCopies: 2,
      availableCopies: 1,
      location: 'Section B, Shelf 2',
      status: 'Available',
    },
  ]);

  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([
    {
      id: 'borrow-1',
      bookId: 'book-2',
      bookTitle: 'Clean Code',
      studentId: 'student-1',
      studentName: 'Alex Thompson',
      borrowDate: '2024-02-15',
      dueDate: '2024-03-15',
      status: 'Active',
    },
    {
      id: 'borrow-2',
      bookId: 'book-1',
      bookTitle: 'Introduction to Algorithms',
      studentId: 'student-2',
      studentName: 'Emma Thompson',
      borrowDate: '2024-01-20',
      dueDate: '2024-02-20',
      returnDate: '2024-02-18',
      status: 'Returned',
    },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'res-1',
      bookId: 'book-2',
      bookTitle: 'Clean Code',
      studentId: 'student-3',
      studentName: 'Jake Thompson',
      reservationDate: '2024-03-01',
      status: 'Pending',
    },
  ]);

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(b => b.availableCopies > 0).length,
    totalCopies: books.reduce((sum, b) => sum + b.totalCopies, 0),
    borrowedCopies: books.reduce((sum, b) => sum + (b.totalCopies - b.availableCopies), 0),
    activeBorrows: borrowRecords.filter(b => b.status === 'Active').length,
    overdueBorrows: borrowRecords.filter(b => b.status === 'Overdue').length,
    pendingReservations: reservations.filter(r => r.status === 'Pending').length,
  };

  const handleBorrow = (book: Book) => {
    if (book.availableCopies <= 0) return;
    setSelectedBook(book);
    setSelectedStudent('');
    setShowBorrowModal(true);
  };

  const processBorrow = async () => {
    if (!selectedBook || !selectedStudent) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const student = mockStudents.find(s => s.id === selectedStudent);
    if (!student) {
      setIsProcessing(false);
      return;
    }

    // Create borrow record
    const newBorrow: BorrowRecord = {
      id: `borrow-${Date.now()}`,
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      studentId: selectedStudent,
      studentName: `${student.firstName} ${student.lastName}`,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active',
    };
    
    setBorrowRecords([...borrowRecords, newBorrow]);
    
    // Update book availability
    setBooks(books.map(book => 
      book.id === selectedBook.id 
        ? { ...book, availableCopies: book.availableCopies - 1, status: book.availableCopies - 1 === 0 ? 'Checked Out' : 'Available' }
        : book
    ));
    
    setIsProcessing(false);
    setShowBorrowModal(false);
    setSelectedBook(null);
  };

  const handleReturn = (borrow: BorrowRecord) => {
    setSelectedBorrow(borrow);
    setShowReturnModal(true);
  };

  const processReturn = async () => {
    if (!selectedBorrow) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update borrow record
    setBorrowRecords(borrowRecords.map(borrow => 
      borrow.id === selectedBorrow.id 
        ? { ...borrow, status: 'Returned' as const, returnDate: new Date().toISOString().split('T')[0] }
        : borrow
    ));
    
    // Update book availability
    setBooks(books.map(book => 
      book.id === selectedBorrow.bookId 
        ? { ...book, availableCopies: book.availableCopies + 1, status: 'Available' }
        : book
    ));
    
    // Fulfill any pending reservations
    const pendingReservation = reservations.find(r => r.bookId === selectedBorrow.bookId && r.status === 'Pending');
    if (pendingReservation) {
      setReservations(reservations.map(r => 
        r.id === pendingReservation.id 
          ? { ...r, status: 'Fulfilled' as const }
          : r
      ));
    }
    
    setIsProcessing(false);
    setShowReturnModal(false);
    setSelectedBorrow(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Returned':
      case 'Fulfilled':
        return <Badge variant="success">{status}</Badge>;
      case 'Checked Out':
      case 'Active':
      case 'Pending':
        return <Badge variant="warning">{status}</Badge>;
      case 'Overdue':
      case 'Lost':
      case 'Damaged':
      case 'Cancelled':
        return <Badge variant="danger">{status}</Badge>;
      case 'Reserved':
        return <Badge variant="info">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderBooks = () => (
    <div className="space-y-6">
      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-blue-100 mb-1">Total Books</div>
            <div className="text-3xl font-bold">{stats.totalBooks}</div>
            <div className="text-sm text-blue-100 mt-1">{stats.totalCopies} total copies</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-green-100 mb-1">Available</div>
            <div className="text-3xl font-bold">{stats.availableBooks}</div>
            <div className="text-sm text-green-100 mt-1">{stats.borrowedCopies} borrowed</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-yellow-100 mb-1">Active Borrows</div>
            <div className="text-3xl font-bold">{stats.activeBorrows}</div>
            <div className="text-sm text-yellow-100 mt-1">{stats.overdueBorrows} overdue</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-purple-100 mb-1">Reservations</div>
            <div className="text-3xl font-bold">{stats.pendingReservations}</div>
            <div className="text-sm text-purple-100 mt-1">Pending requests</div>
          </CardBody>
        </Card>
      </div>

      {/* Book Catalog */}
      <Card>
        <CardBody>
          <CardTitle>Book Catalog</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {books.map((book) => (
              <div key={book.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                  {getStatusBadge(book.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>ISBN: {book.isbn}</div>
                  <div>Category: {book.category}</div>
                  <div>Location: {book.location}</div>
                  <div>Copies: {book.availableCopies}/{book.totalCopies} available</div>
                </div>
                {book.availableCopies > 0 && (
                  <Button 
                    onClick={() => handleBorrow(book)} 
                    size="sm" 
                    className="w-full mt-3"
                  >
                    Borrow Book
                  </Button>
                )}
                {book.availableCopies === 0 && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3"
                    disabled
                  >
                    Not Available
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderBorrowing = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Active Borrow Records</CardTitle>
          <div className="space-y-3 mt-4">
            {borrowRecords.filter(b => b.status === 'Active').map((borrow) => (
              <div key={borrow.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{borrow.bookTitle}</div>
                  <div className="text-sm text-gray-500">Borrowed by: {borrow.studentName}</div>
                  <div className="text-xs text-gray-400">Borrowed: {borrow.borrowDate} • Due: {borrow.dueDate}</div>
                </div>
                <div className="text-right">
                  {getStatusBadge(borrow.status)}
                  <Button 
                    onClick={() => handleReturn(borrow)} 
                    size="sm" 
                    className="mt-2"
                  >
                    Return Book
                  </Button>
                </div>
              </div>
            ))}
            {borrowRecords.filter(b => b.status === 'Active').length === 0 && (
              <div className="text-center py-8 text-gray-500">No active borrow records</div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>Borrow History</CardTitle>
          <div className="space-y-3 mt-4">
            {borrowRecords.filter(b => b.status === 'Returned').map((borrow) => (
              <div key={borrow.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{borrow.bookTitle}</div>
                  <div className="text-sm text-gray-500">Borrowed by: {borrow.studentName}</div>
                  <div className="text-xs text-gray-400">Borrowed: {borrow.borrowDate} • Returned: {borrow.returnDate}</div>
                </div>
                <div className="text-right">
                  {getStatusBadge(borrow.status)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderReservations = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Book Reservations</CardTitle>
          <div className="space-y-3 mt-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{reservation.bookTitle}</div>
                  <div className="text-sm text-gray-500">Reserved by: {reservation.studentName}</div>
                  <div className="text-xs text-gray-400">Reserved: {reservation.reservationDate}</div>
                </div>
                <div className="text-right">
                  {getStatusBadge(reservation.status)}
                  {reservation.status === 'Pending' && (
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        Notify
                      </Button>
                      <Button size="sm" variant="danger">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {reservations.length === 0 && (
              <div className="text-center py-8 text-gray-500">No reservations</div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Library Dashboard</h1>
        <p className="text-gray-600">Library Management • {school.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'books' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Books
        </button>
        <button
          onClick={() => setActiveTab('borrowing')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'borrowing' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Borrowing
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'reservations' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Reservations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'books' && renderBooks()}
      {activeTab === 'borrowing' && renderBorrowing()}
      {activeTab === 'reservations' && renderReservations()}

      {/* Borrow Modal */}
      {showBorrowModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Borrow Book</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book
                  </label>
                  <div className="text-gray-900 font-medium">{selectedBook.title}</div>
                  <div className="text-sm text-gray-500">{selectedBook.author}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student *
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a student</option>
                    {mockStudents.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} ({student.grade})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Due date will be 14 days from borrow date. Late returns may incur fines.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={processBorrow} 
                    disabled={isProcessing || !selectedStudent}
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Borrow'}
                  </Button>
                  <Button 
                    onClick={() => setShowBorrowModal(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && selectedBorrow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Return Book</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book
                  </label>
                  <div className="text-gray-900 font-medium">{selectedBorrow.bookTitle}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Borrowed by
                  </label>
                  <div className="text-gray-900">{selectedBorrow.studentName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Borrow Date
                  </label>
                  <div className="text-gray-900">{selectedBorrow.borrowDate}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <div className="text-gray-900">{selectedBorrow.dueDate}</div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={processReturn} 
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Return'}
                  </Button>
                  <Button 
                    onClick={() => setShowReturnModal(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
