'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useAuth } from '@/context/AuthContext';

interface ProfileField {
  value: string;
  visibility: 'public' | 'private';
}

export default function InstructorProfile() {
  const { currentUser } = useAuth();
  
  const [profile, setProfile] = useState({
    displayName: 'Dr. Sarah Smith',
    headline: 'JavaScript & React Expert',
    bio: 'Passionate about teaching web development with 10+ years of industry experience.',
    website: 'https://sarahsmith.dev',
    location: 'San Francisco, CA',
    firstName: 'Sarah',
    lastName: 'Smith',
    title: 'Senior Software Engineer & Instructor',
    experience: '10+ years',
    professionalBio: 'Experienced software engineer and educator passionate about making web development accessible to everyone.',
  });

  const [visibility, setVisibility] = useState({
    displayName: 'public' as 'public' | 'private',
    headline: 'public' as 'public' | 'private',
    bio: 'public' as 'public' | 'private',
    website: 'public' as 'public' | 'private',
    location: 'public' as 'public' | 'private',
    firstName: 'private' as 'public' | 'private',
    lastName: 'private' as 'public' | 'private',
    title: 'public' as 'public' | 'private',
    experience: 'public' as 'public' | 'private',
    professionalBio: 'public' as 'public' | 'private',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility(prev => ({
      ...prev,
      [field]: prev[field] === 'public' ? 'private' : 'public'
    }));
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your instructor profile with visibility controls for each field</p>
      </div>

      <div className="max-w-4xl">
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Public Profile Information</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Public</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full ml-2"></span>
                <span>Private</span>
              </div>
            </div>
            
            <div className="space-y-6 mt-6">
              {[
                { key: 'displayName' as const, label: 'Display Name', required: true },
                { key: 'headline' as const, label: 'Headline', required: false },
                { key: 'bio' as const, label: 'Bio', required: false, textarea: true },
                { key: 'website' as const, label: 'Website', required: false, type: 'url' },
                { key: 'location' as const, label: 'Location', required: false },
              ].map((field) => (
                <div key={field.key} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && '*'}
                    </label>
                    <button
                      onClick={() => toggleVisibility(field.key)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        visibility[field.key] === 'public'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {visibility[field.key] === 'public' ? '🌐 Public' : '🔒 Private'}
                    </button>
                  </div>
                  {field.textarea ? (
                    <textarea
                      rows={4}
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Tell students about your ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.label}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <CardTitle>Professional Information</CardTitle>
            
            <div className="space-y-6 mt-6">
              {[
                { key: 'firstName' as const, label: 'First Name', required: true },
                { key: 'lastName' as const, label: 'Last Name', required: true },
                { key: 'title' as const, label: 'Professional Title', required: false },
                { key: 'experience' as const, label: 'Years of Experience', required: false },
                { key: 'professionalBio' as const, label: 'Professional Bio', required: false, textarea: true },
              ].map((field) => (
                <div key={field.key} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && '*'}
                    </label>
                    <button
                      onClick={() => toggleVisibility(field.key)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        visibility[field.key] === 'public'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {visibility[field.key] === 'public' ? '🌐 Public' : '🔒 Private'}
                    </button>
                  </div>
                  {field.textarea ? (
                    <textarea
                      rows={4}
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Describe your ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.label}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}