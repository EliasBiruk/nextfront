'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorCommunication() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Communication</h1>
        <p className="text-gray-600">Manage messages, discussions, and announcements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/communication/inbox">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-2">📥</div>
                  <CardTitle>Inbox</CardTitle>
                  <p className="text-gray-600 mt-2 text-sm">View and respond to messages</p>
                </div>
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">12</div>
              </div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/communication/discussions">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-2">💭</div>
                  <CardTitle>Course Discussions</CardTitle>
                  <p className="text-gray-600 mt-2 text-sm">Student discussions and Q&A</p>
                </div>
                <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">24</div>
              </div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/communication/announcements">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📢</div>
              <CardTitle>Announcements</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Create course announcements</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/communication/questions">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-2">❓</div>
                  <CardTitle>Student Questions</CardTitle>
                  <p className="text-gray-600 mt-2 text-sm">Answer student questions</p>
                </div>
                <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">6</div>
              </div>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}