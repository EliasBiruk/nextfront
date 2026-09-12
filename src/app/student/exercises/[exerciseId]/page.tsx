import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function ExercisePage({ params }: { params: { exerciseId: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="student" userName="John Smith" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Exercise Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Event Listeners Exercise</h1>
              <p className="text-gray-600">Practice adding event listeners to DOM elements</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <span>⏱️</span>
                <span className="font-medium">Time Remaining: 14:32</span>
              </div>
            </div>

            {/* Exercise Progress */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Step 2 of 3</span>
                  <span className="text-gray-600">67% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </CardBody>
            </Card>

            {/* Instructions */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📝</span>
                  <div>
                    <div className="font-medium mb-2">Instructions</div>
                    <p className="text-gray-600">
                      Create a button that changes its background color when clicked. Use the <code className="bg-gray-100 px-1 py-0.5 rounded">addEventListener()</code> method to attach a click event handler to the button.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Exercise Problem */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Exercise 2: Interactive Button</CardTitle>
                <p className="text-gray-600 mb-4">
                  Write JavaScript code to create a button that changes its background color from blue to green when clicked. The button should have the ID "colorButton".
                </p>

                {/* Code Workspace */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Code
                  </label>
                  <textarea
                    className="w-full h-48 px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="// Write your JavaScript code here

const button = document.getElementById('colorButton');

// Add your event listener here

"
                  ></textarea>
                </div>

                {/* Preview */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <button 
                      id="colorButton" 
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                      Click Me
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  💡 Hint
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  ▶ Run Code
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Submit Answer
              </button>
            </div>

            {/* Attempts */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
                  <div className="text-sm text-gray-600">Attempts Used</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1</div>
                  <div className="text-sm text-gray-600">Attempts Remaining</div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}