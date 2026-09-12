'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockSchools } from '@/data/mockData';

export default function ManagementDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Management Dashboard</h1>
        <p className="text-gray-600">School Leadership Overview • {school.name}</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Management Dashboard - Coming Soon</CardTitle>
          <p className="text-gray-600 mt-4">This dashboard will provide strategic oversight for school leadership.</p>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
