'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';

export default function SchoolDetail() {
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  // Mock school data - will come from backend
  const school = {
    id: 1,
    name: 'Springfield Academy',
    logo: '🏫',
    location: 'California, USA',
    type: 'K-12',
    description: 'A premier K-12 institution providing world-class education with modern facilities and innovative teaching methods. We prepare students for success in college and beyond.',
    students: 2450,
    teachers: 180,
    courses: 45,
    rating: 4.7,
    established: '1995',
    programs: ['STEM', 'Arts', 'Athletics', 'Technology', 'Languages'],
    features: [
      { 
        title: 'Student Management', 
        description: 'Complete student information system with enrollment, attendance, academic records, and parent portal access.',
        icon: '👥',
        details: {
          overview: 'Comprehensive student lifecycle management from admission to graduation.',
          capabilities: [
            'Student enrollment and registration',
            'Demographic and contact information management',
            'Family and guardian profiles',
            'Student ID generation and management',
            'Academic records and transcripts',
            'Disciplinary records tracking',
            'Parent/guardian portal access',
            'Student health and medical records',
            'Transportation management',
            'Document management (certificates, reports)'
          ],
          benefits: 'Streamline administrative processes and provide 360-degree view of each student'
        }
      },
      { 
        title: 'Academic Management', 
        description: 'Curriculum planning, class scheduling, gradebook, and academic performance tracking.',
        icon: '📚',
        details: {
          overview: 'End-to-end academic management from curriculum design to grade reporting.',
          capabilities: [
            'Curriculum planning and mapping',
            'Subject and course management',
            'Class scheduling and timetabling',
            'Teacher assignment and workload distribution',
            'Gradebook management',
            'Assessment and exam scheduling',
            'Academic calendar management',
            'Credit system and GPA calculation',
            'Promotion and retention policies',
            'Transcript generation'
          ],
          benefits: 'Ensure academic excellence with systematic planning and monitoring'
        }
      },
      { 
        title: 'Finance & Fees', 
        description: 'Fee collection, payment processing, financial reporting, and budget management.',
        icon: '💰',
        details: {
          overview: 'Complete financial management system for educational institutions.',
          capabilities: [
            'Fee structure creation and management',
            'Online payment processing',
            'Payment gateway integration',
            'Invoice generation and tracking',
            'Scholarship and discount management',
            'Financial reporting and analytics',
            'Budget planning and tracking',
            'Expense management',
            'Salary and payroll processing',
            'Tax compliance and reporting'
          ],
          benefits: 'Automate financial operations and ensure transparency in all transactions'
        }
      },
      { 
        title: 'Attendance & Timetable', 
        description: 'Automated attendance tracking, class scheduling, and timetable management.',
        icon: '📅',
        details: {
          overview: 'Smart attendance system with flexible timetable management.',
          capabilities: [
            'Daily attendance tracking',
            'Biometric and RFID integration',
            'Mobile attendance for field trips',
            'Automatic attendance reports',
            'Timetable conflict detection',
            'Substitute teacher management',
            'Room allocation optimization',
            'Exam scheduling',
            'Event calendar management',
            'SMS/email notifications to parents'
          ],
          benefits: 'Reduce manual work and improve attendance accuracy'
        }
      },
      { 
        title: 'Assignments & Gradebook', 
        description: 'Assignment creation, submission tracking, grading, and academic record management.',
        icon: '📋',
        details: {
          overview: 'Digital assignment management with comprehensive grading system.',
          capabilities: [
            'Assignment creation and distribution',
            'Online submission portal',
            'Plagiarism detection integration',
            'Grading rubrics and criteria',
            'Gradebook with automatic calculations',
            'Weighted grade management',
            'Feedback and annotation tools',
            'Late submission policies',
            'Grade analytics and trends',
            'Report card generation'
          ],
          benefits: 'Streamline assessment process and provide timely feedback to students'
        }
      },
      { 
        title: 'Library & Resources', 
        description: 'Digital library management, book tracking, and resource allocation.',
        icon: '📖',
        details: {
          overview: 'Modern library management with digital resource integration.',
          capabilities: [
            'Book catalog and inventory',
            'Barcode/RFID book tracking',
            'Member management and lending',
            'Digital library and e-books',
            'Resource reservation system',
            'Fine and penalty calculation',
            'Library analytics and usage reports',
            'Multi-branch library support',
            'Reading recommendations',
            'Integration with academic curriculum'
          ],
          benefits: 'Modernize library operations and improve resource accessibility'
        }
      },
      { 
        title: 'Communication', 
        description: 'Parent-teacher communication, announcements, and messaging system.',
        icon: '💬',
        details: {
          overview: 'Unified communication platform for all stakeholders.',
          capabilities: [
            'School-wide announcements',
            'Class-specific notifications',
            'Parent-teacher messaging',
            'Email and SMS integration',
            'Mobile app notifications',
            'Discussion forums',
            'Video conferencing integration',
            'Event invitations and RSVPs',
            'Survey and feedback forms',
            'Communication analytics'
          ],
          benefits: 'Enhance engagement and ensure timely information delivery'
        }
      },
      { 
        title: 'Analytics & Reports', 
        description: 'Comprehensive analytics, performance tracking, and customizable reports.',
        icon: '📊',
        details: {
          overview: 'Data-driven insights for informed decision making.',
          capabilities: [
            'Student performance analytics',
            'Teacher effectiveness metrics',
            'Financial dashboards',
            'Attendance trends analysis',
            'Custom report builder',
            'Automated report scheduling',
            'Data visualization tools',
            'Comparative analysis',
            'Predictive analytics',
            'Export to multiple formats (PDF, Excel, CSV)'
          ],
          benefits: 'Make data-driven decisions and identify areas for improvement'
        }
      }
    ],
    contact: {
      email: 'info@springfield.edu',
      phone: '+1 (555) 123-4567',
      address: '123 Education Boulevard, Springfield, CA 90210'
    }
  };

  const openFeatureModal = (feature: any) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-gray-50">
        {/* School Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-4">{school.logo}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{school.name}</h1>
              <p className="text-xl text-orange-100 mb-6">{school.location}</p>
              <Badge variant="default" className="inline-block mb-6">{school.type}</Badge>
              <p className="text-lg text-orange-100 max-w-2xl mx-auto">{school.description}</p>
              <div className="flex items-center justify-center gap-6 text-sm mt-8">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">{school.rating}</span>
                </div>
                <span>•</span>
                <span>Est. {school.established}</span>
                <span>•</span>
                <span>{school.students.toLocaleString()} students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="text-center">
                <CardBody>
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-gray-900">{school.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </CardBody>
              </Card>
              <Card className="text-center">
                <CardBody>
                  <div className="text-3xl mb-2">👨‍🏫</div>
                  <div className="text-2xl font-bold text-gray-900">{school.teachers}</div>
                  <div className="text-sm text-gray-600">Teachers</div>
                </CardBody>
              </Card>
              <Card className="text-center">
                <CardBody>
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-2xl font-bold text-gray-900">{school.courses}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </CardBody>
              </Card>
              <Card className="text-center">
                <CardBody>
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-gray-900">{school.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </CardBody>
              </Card>
            </div>

            {/* Programs */}
            <Card className="mb-12">
              <CardBody>
                <CardTitle>Programs Offered</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {school.programs.map((program, index) => (
                    <Badge key={index} variant="default" className="">{program}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* ERP Features */}
            <Card className="mb-12">
              <CardBody>
                <CardTitle>Everything Your School Needs</CardTitle>
                <p className="text-gray-600 mb-6">Comprehensive school management features powered by JoyEdu</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {school.features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => openFeatureModal(feature)}
                      className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200 hover:border-orange-500"
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <div className="font-semibold text-sm mb-1">{feature.title}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{feature.description}</div>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Contact */}
            <Card>
              <CardBody>
                <CardTitle>Contact Information</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">{school.contact.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-gray-600">{school.contact.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-gray-600">{school.contact.address}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link href="/contact" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
                    Request More Information
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      {/* Feature Modal */}
      {showFeatureModal && selectedFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedFeature.icon}</div>
                  <h2 className="text-2xl font-bold">{selectedFeature.title}</h2>
                </div>
                <button
                  onClick={() => setShowFeatureModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-6">
                <p className="text-gray-700">{selectedFeature.description}</p>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-gray-600">{selectedFeature.details.overview}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Key Capabilities</h3>
                  <ul className="space-y-2">
                    {selectedFeature.details.capabilities.map((capability: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <p className="text-gray-600">{selectedFeature.details.benefits}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={() => setShowFeatureModal(false)}>Close</Button>
                  <Link href="/contact" className="flex-1 text-center">
                    <Button variant="outline" className="w-full">Request Demo</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}