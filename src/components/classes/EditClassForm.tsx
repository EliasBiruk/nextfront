'use client';

import { useState, useEffect } from 'react';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockTeachers, mockSubjects, mockStudents } from '@/data/mockData';

interface EditClassFormProps {
  classData: any;
  onSave: (classData: any) => void;
  onCancel: () => void;
}

export default function EditClassForm({ classData, onSave, onCancel }: EditClassFormProps) {
  const [formData, setFormData] = useState({
    grade: classData.grade,
    section: classData.section,
    room: classData.room,
    classTeacherId: classData.classTeacherId,
    capacity: classData.capacity,
    academicYear: classData.academicYear,
    subjectIds: classData.subjectIds || [],
    studentIds: classData.studentIds || [],
    status: classData.status,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const grades = ['5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C'];
  const academicYears = ['2024-2025', '2025-2026', '2026-2027'];

  useEffect(() => {
    const hasUnsavedChanges = 
      formData.grade !== classData.grade ||
      formData.section !== classData.section ||
      formData.room !== classData.room ||
      formData.classTeacherId !== classData.classTeacherId ||
      formData.capacity !== classData.capacity ||
      formData.status !== classData.status;
    setHasChanges(hasUnsavedChanges);
  }, [formData, classData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.room.trim()) newErrors.room = 'Room number is required';
    if (!formData.classTeacherId) newErrors.classTeacherId = 'Class teacher is required';
    if (formData.capacity < 1) newErrors.capacity = 'Capacity must be at least 1';
    if (formData.subjectIds.length === 0) newErrors.subjectIds = 'At least one subject is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSave({
      ...formData,
      id: classData.id,
      schoolId: classData.schoolId,
      currentStudents: classData.currentStudents,
      timetable: classData.timetable,
    });

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const toggleSubject = (subjectId: string) => {
    setFormData({
      ...formData,
      subjectIds: formData.subjectIds.includes(subjectId)
        ? formData.subjectIds.filter((s: string) => s !== subjectId)
        : [...formData.subjectIds, subjectId],
    });
  };

  const toggleStudent = (studentId: string) => {
    setFormData({
      ...formData,
      studentIds: formData.studentIds.includes(studentId)
        ? formData.studentIds.filter((s: string) => s !== studentId)
        : [...formData.studentIds, studentId],
    });
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>Edit Class</CardTitle>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sections.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Number *</label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.room ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 201"
              />
              {errors.room && <p className="text-sm text-red-600 mt-1">{errors.room}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher *</label>
              <select
                value={formData.classTeacherId}
                onChange={(e) => setFormData({ ...formData, classTeacherId: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.classTeacherId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Teacher</option>
                {mockTeachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName} ({teacher.department})
                  </option>
                ))}
              </select>
              {errors.classTeacherId && <p className="text-sm text-red-600 mt-1">{errors.classTeacherId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.capacity && <p className="text-sm text-red-600 mt-1">{errors.capacity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year *</label>
              <select
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {academicYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subjects *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {mockSubjects.map(subject => (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => toggleSubject(subject.id)}
                    className={`px-3 py-2 rounded-lg text-sm border ${
                      formData.subjectIds.includes(subject.id)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
              {errors.subjectIds && <p className="text-sm text-red-600 mt-1">{errors.subjectIds}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enrolled Students</label>
              <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockStudents.map(student => (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => toggleStudent(student.id)}
                      className={`px-3 py-2 rounded-lg text-sm border text-left ${
                        formData.studentIds.includes(student.id)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {student.firstName} {student.lastName} (Grade {student.grade})
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{formData.studentIds.length} students selected</p>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
