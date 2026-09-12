import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolWebsite() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Website</h1>
        <p className="text-gray-600">Manage school website pages, homepage, news, events, gallery, programs, admissions, and contact information</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Create Page</Button>
          <Button variant="outline">Add News</Button>
          <Button variant="outline">Publish Event</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Sections</option>
            <option>Homepage</option>
            <option>News</option>
            <option>Events</option>
            <option>Gallery</option>
            <option>Programs</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Website Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Pages</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">120</div>
            <p className="text-gray-600 text-sm">News Articles</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">85</div>
            <p className="text-gray-600 text-sm">Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">450</div>
            <p className="text-gray-600 text-sm">Gallery Images</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12K</div>
            <p className="text-gray-600 text-sm">Monthly Visitors</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏠</div>
            <div className="font-semibold">Homepage</div>
            <div className="text-sm text-gray-600">Main page editing</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📰</div>
            <div className="font-semibold">News</div>
            <div className="text-sm text-gray-600">News management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-semibold">Gallery</div>
            <div className="text-sm text-gray-600">Image gallery</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Programs</div>
            <div className="text-sm text-gray-600">Academic programs</div>
          </CardBody>
        </Card>
      </div>

      {/* Website Content */}
      <Card>
        <CardBody>
          <CardTitle>Website Content Management</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Homepage - Welcome Banner',
                section: 'Homepage',
                type: 'Banner Content',
                lastEdited: '2024-08-25',
                status: 'Published',
                views: 4500,
                editor: 'Marketing Team'
              },
              {
                name: 'News - Back to School 2024',
                section: 'News',
                type: 'News Article',
                lastEdited: '2024-08-24',
                status: 'Published',
                views: 890,
                editor: 'Administration'
              },
              {
                name: 'Events - Fall Festival 2024',
                section: 'Events',
                type: 'Event Page',
                lastEdited: '2024-08-23',
                status: 'Published',
                views: 560,
                editor: 'Event Coordinator'
              },
              {
                name: 'Gallery - Sports Day 2024',
                section: 'Gallery',
                type: 'Image Gallery',
                lastEdited: '2024-08-22',
                status: 'Published',
                views: 1200,
                editor: 'Media Team'
              },
              {
                name: 'Programs - STEM Program',
                section: 'Programs',
                type: 'Program Page',
                lastEdited: '2024-08-21',
                status: 'Draft',
                views: 0,
                editor: 'Academic Affairs'
              },
            ].map((content) => (
              <div key={content.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🌐
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{content.name}</h3>
                        <Badge variant="outline" size="sm">{content.section}</Badge>
                        <Badge variant={
                          content.status === 'Published' ? 'success' : 'warning'
                        }>
                          {content.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{content.type} • Edited by: {content.editor}</p>
                      <p className="text-xs text-gray-400 mt-1">Last Edited: {content.lastEdited} • Views: {content.views.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}