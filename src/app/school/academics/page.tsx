'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { schoolsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function SchoolAcademics() {
  const { currentUser, currentSchoolContext } = useAuth();
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  const schoolName = currentSchoolContext?.schoolName || currentUser?.firstName || 'School';

  useEffect(() => {
    async function loadAcademicData() {
      if (!currentUser) return;
      try {
        const [yearsData, termsData, classesData, subjectsData] = await Promise.all([
          schoolsService().getAcademicYears(currentUser.id),
          schoolsService().getTerms(currentUser.id),
          schoolsService().getClasses(currentUser.id),
          schoolsService().getSubjects(currentUser.id),
        ]);
        setAcademicYears(yearsData.data || []);
        setTerms(termsData.data || []);
        setClasses(classesData.data || []);
        setSubjects(subjectsData.data || []);
        if (yearsData.data && yearsData.data.length > 0) {
          setSelectedYear(yearsData.data[0].id);
        }
      } catch (error) {
        console.error('Failed to load academic data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAcademicData();
  }, [currentUser]);

  const filteredTerms = terms.filter(term => term.yearId === selectedYear);

  const handleActivateYear = (yearId: string) => {
    setAcademicYears(prev => prev.map(year => ({
      ...year,
      status: year.id === yearId ? 'Active' : 'Completed'
    })));
  };

  const handleActivateTerm = (termId: string) => {
    setTerms(prev => prev.map(term => ({
      ...term,
      status: term.id === termId ? 'Active' : 'Upcoming'
    })));
  };

  const totalClasses = classes.reduce((sum, c) => sum + (c.classes || 0), 0);
  const totalStudents = classes.reduce((sum, c) => sum + (c.students || 0), 0);
  const avgPassRate = subjects.length > 0 ? Math.round(subjects.reduce((sum, s) => sum + (s.passRate || 0), 0) / subjects.length) : 0;
  const avgScore = subjects.length > 0 ? Math.round(subjects.reduce((sum, s) => sum + (s.avgScore || 0), 0) / subjects.length) : 0;

  return (
    <DashboardLayout actor="school" userName={schoolName}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Academics</h1>
        <p className="text-gray-600">Manage academic structure, classes, subjects, and academic performance</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading academic data...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Button onClick={() => setShowAddYearModal(true)}>+ Add Academic Year</Button>
              <Button onClick={() => setShowAddSubjectModal(true)}>+ Add Subject</Button>
            </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {academicYears.map(year => (
              <option key={year.id} value={year.id}>{year.name}</option>
            ))}
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {filteredTerms.map(term => (
              <option key={term.id} value={term.id}>{term.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Academic Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalClasses}</div>
            <p className="text-gray-600 text-sm">Total Classes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{subjects.length}</div>
            <p className="text-gray-600 text-sm">Subjects</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{avgPassRate}%</div>
            <p className="text-gray-600 text-sm">Pass Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{avgScore}%</div>
            <p className="text-gray-600 text-sm">Avg. Score</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{classes.length}</div>
            <p className="text-gray-600 text-sm">Grade Levels</p>
          </CardBody>
        </Card>
      </div>

      {/* Academic Years */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Academic Years</CardTitle>
          <div className="space-y-3">
            {academicYears.map((year) => (
              <div key={year.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📅
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{year.name}</h3>
                        <Badge variant={year.status === 'Active' ? 'success' : 'default'}>{year.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{year.startDate} - {year.endDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {year.status !== 'Active' && (
                      <Button variant="outline" size="sm" onClick={() => handleActivateYear(year.id)}>
                        Activate
                      </Button>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Terms */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Terms/Semesters</CardTitle>
          <div className="space-y-3">
            {filteredTerms.map((term) => (
              <div key={term.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-lg font-bold text-green-600">
                      📊
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{term.name}</h3>
                        <Badge variant={term.status === 'Active' ? 'success' : 'info'}>{term.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{term.startDate} - {term.endDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {term.status !== 'Active' && (
                      <Button variant="outline" size="sm" onClick={() => handleActivateTerm(term.id)}>
                        Activate
                      </Button>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Classes Overview */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Classes Overview</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((grade) => (
              <div key={grade.grade} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <h3 className="font-semibold text-lg mb-2">{grade.grade}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classes:</span>
                    <span className="font-medium">{grade.classes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sections:</span>
                    <span className="font-medium">{grade.sections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{grade.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coordinator:</span>
                    <span className="font-medium">{grade.coordinator}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">View Details</Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Subject Performance */}
      <Card>
        <CardBody>
          <CardTitle>Subject Performance</CardTitle>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.code} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{subject.subject}</span>
                    <span className="text-sm text-gray-600 ml-2">• {subject.teacher}</span>
                    <Badge size="sm" className="ml-2">{subject.code}</Badge>
                  </div>
                  <span className="text-gray-600">{subject.passRate}% pass rate • {subject.avgScore}% avg score</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${subject.passRate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Add Academic Year Modal */}
      {showAddYearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Add Academic Year</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 2025-2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddYearModal(false)}>Cancel</Button>
                <Button variant="outline">Create Year</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Add Subject</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Physics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., PHY106"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Dr. Johnson"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddSubjectModal(false)}>Cancel</Button>
                <Button>Add Subject</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
        </>
      )}
    </DashboardLayout>
  );
}