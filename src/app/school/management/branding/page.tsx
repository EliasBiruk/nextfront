import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function SchoolBranding() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Branding</h1>
        <p className="text-gray-600">Customize your school's visual identity and branding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branding Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <CardTitle>Logo & Visual Identity</CardTitle>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="w-32 h-32 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-4xl">🏫</span>
                    </div>
                    <p className="text-gray-600 mb-2">Current school logo</p>
                    <Button variant="outline" size="sm">Upload New Logo</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 border-2 border-gray-300"></div>
                    <input type="text" defaultValue="#2563EB" placeholder="#2563EB" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <span className="text-gray-600">Blue</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-green-600 border-2 border-gray-300"></div>
                    <input type="text" defaultValue="#16A34A" placeholder="#16A34A" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <span className="text-gray-600">Green</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-orange-500 border-2 border-gray-300"></div>
                    <input type="text" defaultValue="#F97316" placeholder="#F97316" className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <span className="text-gray-600">Orange</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>School Motto & Tagline</CardTitle>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Motto</label>
                  <input type="text" defaultValue="Excellence in Education, Character in Life" placeholder="Enter school motto" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                  <input type="text" defaultValue="Building Tomorrow's Leaders Today" placeholder="Enter school tagline" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    placeholder="Enter mission statement"
                    defaultValue="To provide a world-class education that nurtures intellectual curiosity, fosters critical thinking, and develops character in a supportive and inclusive environment."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    placeholder="Enter vision statement"
                    defaultValue="To be recognized as a leading educational institution that prepares students to become responsible global citizens and innovative leaders of the future."
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>Social Media & Contact</CardTitle>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                  <input type="url" defaultValue="https://facebook.com/springfieldacademy" placeholder="Enter Facebook URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                  <input type="url" defaultValue="https://twitter.com/springfieldacad" placeholder="Enter Twitter URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                  <input type="url" defaultValue="https://instagram.com/springfieldacademy" placeholder="Enter Instagram URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input type="url" defaultValue="https://linkedin.com/company/springfieldacademy" placeholder="Enter LinkedIn URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                  <input type="url" defaultValue="https://youtube.com/springfieldacademy" placeholder="Enter YouTube URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="flex gap-4">
            <Button>Save Branding Settings</Button>
            <Button variant="outline">Preview Branding</Button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <Card>
            <CardBody>
              <CardTitle>Branding Preview</CardTitle>
              <div className="space-y-4">
                <div className="p-4 bg-blue-600 text-white rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      SA
                    </div>
                    <div>
                      <div className="font-bold">Springfield Academy</div>
                      <div className="text-xs text-blue-100">Excellence in Education</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Color Palette</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600" title="Primary"></div>
                    <div className="w-8 h-8 rounded bg-green-600" title="Secondary"></div>
                    <div className="w-8 h-8 rounded bg-orange-500" title="Accent"></div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Typography</div>
                  <div className="text-xs text-gray-600">Primary: Inter, Sans-serif</div>
                  <div className="text-xs text-gray-600">Headings: Poppins, Sans-serif</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}