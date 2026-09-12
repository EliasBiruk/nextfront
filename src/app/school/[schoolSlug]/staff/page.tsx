'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { mockSchools } from '@/data/mockData';

export default function StaffDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Staff Portal</h1>
        <p className="text-gray-600">General Staff Dashboard • {school.name}</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Staff Portal - Coming Soon</CardTitle>
          <p className="text-gray-600 mt-4">This portal will provide common staff features.</p>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
