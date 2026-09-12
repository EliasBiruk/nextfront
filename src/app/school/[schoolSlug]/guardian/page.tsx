'use client';

import { use, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import ProgressBar from '@/components/shared/ProgressBar';
import Badge from '@/components/shared/Badge';
import { mockSchools, mockGuardians, mockStudents, mockFees, mockAnnouncements, mockGrades, mockTeachers, mockClasses, mockAttendance } from '@/data/mockData';

export default function GuardianDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  
  const currentPersona = searchParams.get('persona') || 'persona-guardian';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const guardian = mockGuardians.find(g => g.id === 'guardian-1') || mockGuardians[0];
  const myChildren = mockStudents.filter(s => guardian.studentIds.includes(s.id));
  const selectedChild = selectedChildId 
    ? myChildren.find(c => c.id === selectedChildId) 
    : myChildren[0];
  
  // Get data for selected child
  const childFees = selectedChild ? mockFees.filter(f => f.studentId === selectedChild.id) : [];
  const childGrades = selectedChild ? mockGrades.filter(g => g.studentId === selectedChild.id) : [];
  const schoolAnnouncements = mockAnnouncements.filter(a => a.schoolId === school.id);
  const childClass = selectedChild ? mockClasses.find(c => c.id === selectedChild.classId) : null;
  const childTeachers = childClass ? mockTeachers.filter(t => childClass.subjectIds?.includes(t.subjects?.[0] || '')) : mockTeachers.slice(0, 2);
  const childAttendance = selectedChild ? mockAttendance.filter(a => a.studentId === selectedChild.id) : [];

  const handleChildSelect = (childId: string) => {
    setSelectedChildId(childId);
  };

  const calculateAverageGrade = () => {
    if (!childGrades.length) return 0;
    const sum = childGrades.reduce((acc, g) => acc + g.score, 0);
    return Math.round(sum / childGrades.length);
  };

  const handlePayment = async (fee: any) => {
    setSelectedFee(fee);
    setPaymentAmount(fee.balance.toString());
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const processPayment = async () => {
    setIsProcessingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update fee status in mock data
    const feeIndex = mockFees.findIndex(f => f.id === selectedFee.id);
    if (feeIndex !== -1) {
      mockFees[feeIndex].paidAmount += parseFloat(paymentAmount);
      mockFees[feeIndex].balance -= parseFloat(paymentAmount);
      if (mockFees[feeIndex].balance <= 0) {
        mockFees[feeIndex].balance = 0;
        mockFees[feeIndex].status = 'Paid';
      }
    }
    
    setIsProcessingPayment(false);
    setPaymentSuccess(true);
    setShowPaymentModal(false);
  };

  const handleCommunication = (teacher: any) => {
    setSelectedTeacher(teacher);
    setMessage('');
    setShowCommunicationModal(true);
    setMessageSuccess(false);
  };

  const sendMessage = async () => {
    setIsSendingMessage(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSendingMessage(false);
    setMessageSuccess(true);
    setShowCommunicationModal(false);
    setMessage('');
  };

  const calculateAttendanceRate = () => {
    if (!childAttendance.length) return 0;
    const presentDays = childAttendance.filter(a => a.status === 'Present').length;
    return Math.round((presentDays / childAttendance.length) * 100);
  };

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Guardian Portal</h1>
        <p className="text-gray-600">Parent Dashboard • {school.name}</p>
      </div>

      {/* My Children - Child Switcher */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>My Children</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {myChildren.map(child => {
              const isSelected = selectedChild?.id === child.id;
              return (
                <div 
                  key={child.id} 
                  onClick={() => handleChildSelect(child.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {child.firstName[0]}{child.lastName[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{child.firstName} {child.lastName}</div>
                      <div className="text-sm text-gray-600">Grade {child.grade}{child.section}</div>
                    </div>
                    {isSelected && (
                      <Badge variant="success">Viewing</Badge>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">GPA: <span className="font-medium text-gray-900">{child.gpa}</span></span>
                    <span className="text-gray-500">Attendance: <span className="font-medium text-green-600">{child.attendanceRate}%</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {selectedChild && (
        <>
          {/* Academic Overview for Selected Child */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Academic Overview: {selectedChild.firstName} {selectedChild.lastName}
            </h2>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody>
                <div className="text-sm text-gray-600 mb-1">Attendance</div>
                <div className="text-3xl font-bold text-gray-900">{selectedChild.attendanceRate}%</div>
                <div className="text-sm mt-1">
                  <Badge variant={selectedChild.attendanceRate >= 90 ? 'success' : 'warning'}>
                    {selectedChild.attendanceRate >= 90 ? 'Excellent' : 'Needs Improvement'}
                  </Badge>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-sm text-gray-600 mb-1">GPA</div>
                <div className="text-3xl font-bold text-gray-900">{selectedChild.gpa}</div>
                <div className="text-sm mt-1">
                  <Badge variant={selectedChild.gpa >= 3.5 ? 'success' : selectedChild.gpa >= 3.0 ? 'warning' : 'danger'}>
                    {selectedChild.gpa >= 3.5 ? 'Excellent' : selectedChild.gpa >= 3.0 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-sm text-gray-600 mb-1">Pending Fees</div>
                <div className="text-3xl font-bold text-gray-900">${childFees.reduce((sum, f) => sum + f.balance, 0)}</div>
                <div className="text-sm text-green-600 mt-1">{childFees.filter(f => f.balance === 0).length} Paid</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-sm text-gray-600 mb-1">Average Grade</div>
                <div className="text-3xl font-bold text-gray-900">{calculateAverageGrade()}%</div>
                <div className="text-sm text-gray-500 mt-1">{childGrades.length} subjects</div>
              </CardBody>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Subject Performance</CardTitle>
              <div className="space-y-4 mt-4">
                {childGrades.length > 0 ? childGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center gap-4">
                    <div className="w-32 font-medium text-gray-900">{grade.subject}</div>
                    <div className="flex-1">
                      <ProgressBar progress={grade.score} />
                    </div>
                    <div className="w-16 text-right font-semibold">{grade.score}%</div>
                    <Badge variant={grade.score >= 70 ? 'success' : grade.score >= 50 ? 'warning' : 'danger'}>
                      {grade.score >= 70 ? 'Pass' : grade.score >= 50 ? 'Average' : 'Fail'}
                    </Badge>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">No grades available yet</div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Fee Status */}
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Fee Status</CardTitle>
              <div className="space-y-3 mt-4">
                {childFees.length > 0 ? childFees.map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{fee.academicYear} Academic Year</div>
                      <div className="text-sm text-gray-500">Due: {fee.dueDate}</div>
                      <div className="text-xs text-gray-400 mt-1">Total: ${fee.totalAmount} | Paid: ${fee.paidAmount}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${fee.balance}</div>
                      <Badge variant={fee.balance === 0 ? 'success' : 'warning'}>
                        {fee.balance === 0 ? 'Paid' : 'Pending'}
                      </Badge>
                      {fee.balance > 0 && (
                        <Button 
                          onClick={() => handlePayment(fee)} 
                          size="sm" 
                          className="mt-2"
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">No fee records found</div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Teacher Communication */}
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Teacher Communication</CardTitle>
              <div className="space-y-3 mt-4">
                {childTeachers.length > 0 ? childTeachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{teacher.firstName} {teacher.lastName}</div>
                      <div className="text-sm text-gray-500">{teacher.department} • {teacher.subjects.join(', ')}</div>
                      <div className="text-xs text-gray-400 mt-1">{teacher.email}</div>
                    </div>
                    <Button 
                      onClick={() => handleCommunication(teacher)} 
                      size="sm"
                    >
                      Send Message
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">No teachers assigned</div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Detailed Attendance */}
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Attendance Details</CardTitle>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">Overall Attendance Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{calculateAttendanceRate()}%</div>
                </div>
                <div className="space-y-2">
                  {childAttendance.slice(0, 10).map((attendance) => (
                    <div key={attendance.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-900">{attendance.date}</div>
                      <Badge variant={attendance.status === 'Present' ? 'success' : 'danger'}>
                        {attendance.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Quick Access</CardTitle>
            <div className="space-y-2 mt-4">
              <Button 
                className="w-full text-left justify-start" 
                onClick={() => router.push(`/school/${schoolSlug}/gradebook`)}
              >
                📊 View Grades
              </Button>
              <Button 
                className="w-full text-left justify-start"
                onClick={() => router.push(`/school/${schoolSlug}/attendance`)}
              >
                📅 View Attendance
              </Button>
              <Button 
                className="w-full text-left justify-start"
                onClick={() => router.push(`/school/${schoolSlug}/assignments`)}
              >
                📝 View Assignments
              </Button>
              <Button 
                className="w-full text-left justify-start"
                onClick={() => router.push(`/school/${schoolSlug}/finance`)}
              >
                💰 Fee Payments
              </Button>
              <Button 
                className="w-full text-left justify-start"
                onClick={() => router.push(`/school/${schoolSlug}/communication`)}
              >
                📧 Communicate with Teachers
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Recent Announcements</CardTitle>
            <div className="space-y-3 mt-4">
              {schoolAnnouncements.length > 0 ? schoolAnnouncements.slice(0, 3).map(announcement => (
                <div key={announcement.id} className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">{announcement.title}</div>
                  <div className="text-sm text-gray-600">{announcement.content}</div>
                  <div className="text-xs text-gray-400 mt-1">{announcement.createdAt}</div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">No announcements</div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Pay Fees</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fee Type
                  </label>
                  <div className="text-gray-900 font-medium">{selectedFee.academicYear} Fees</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outstanding Balance
                  </label>
                  <div className="text-2xl font-bold text-gray-900">${selectedFee.balance}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount *
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    max={selectedFee.balance}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This is a payment simulation. In a real implementation, this would connect to a payment gateway.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessingPayment || !paymentAmount || parseFloat(paymentAmount) <= 0}
                    className="flex-1"
                  >
                    {isProcessingPayment ? 'Processing...' : 'Pay Now'}
                  </Button>
                  <Button 
                    onClick={() => setShowPaymentModal(false)} 
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

      {/* Communication Modal */}
      {showCommunicationModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Send Message to Teacher</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="text-gray-900 font-medium">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{selectedTeacher.subjects.join(', ')}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={sendMessage} 
                    disabled={isSendingMessage || !message.trim()}
                    className="flex-1"
                  >
                    {isSendingMessage ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Button 
                    onClick={() => setShowCommunicationModal(false)} 
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

      {/* Payment Success Notification */}
      {paymentSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-center gap-3">
            <div className="text-green-600 text-2xl">✓</div>
            <div>
              <div className="font-medium text-green-900">Payment Successful</div>
              <div className="text-sm text-green-800">Your payment has been processed.</div>
            </div>
            <button 
              onClick={() => setPaymentSuccess(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Message Success Notification */}
      {messageSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-center gap-3">
            <div className="text-green-600 text-2xl">✓</div>
            <div>
              <div className="font-medium text-green-900">Message Sent</div>
              <div className="text-sm text-green-800">Your message has been sent to the teacher.</div>
            </div>
            <button 
              onClick={() => setMessageSuccess(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </SchoolShell>
  );
}
