'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function HTMLPlaygroundPage() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 5px;
        }
        .button:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Playground 🌐</h1>
        <p>Edit the code on the left and see the result here!</p>
        
        <div class="buttons">
            <button class="button" onclick="alert('Hello!')">Click Me</button>
            <button class="button" onclick="changeColor()">Change Color</button>
        </div>
        
        <div id="message" style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <p>Click the buttons above to interact!</p>
        </div>
    </div>
    
    <script>
        function changeColor() {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.querySelector('.container').style.background = randomColor;
            document.getElementById('message').innerHTML = '<p>Background color changed!</p>';
        }
    </script>
</body>
</html>`);

  const [preview, setPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    runCode();
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setPreview(code);
    setTimeout(() => setIsRunning(false), 500);
  };

  const resetCode = () => {
    setCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 5px;
        }
        .button:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Playground 🌐</h1>
        <p>Edit the code on the left and see the result here!</p>
        
        <div class="buttons">
            <button class="button" onclick="alert('Hello!')">Click Me</button>
            <button class="button" onclick="changeColor()">Change Color</button>
        </div>
        
        <div id="message" style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <p>Click the buttons above to interact!</p>
        </div>
    </div>
    
    <script>
        function changeColor() {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.querySelector('.container').style.background = randomColor;
            document.getElementById('message').innerHTML = '<p>Background color changed!</p>';
        }
    </script>
</body>
</html>`);
    runCode();
  };

  const templates = [
    { name: 'Blank HTML', code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>New Project</title>\n</head>\n<body>\n    \n</body>\n</html>' },
    { name: 'Portfolio', code: `<!DOCTYPE html>
<html>
<head>
    <title>Portfolio</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .hero { background: #333; color: white; padding: 40px; text-align: center; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>My Portfolio</h1>
        <p>Welcome to my personal website</p>
    </div>
</body>
</html>` },
    { name: 'Form', code: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
    <style>
        form { max-width: 400px; margin: 20px auto; }
        input, textarea { width: 100%; padding: 10px; margin: 5px 0; }
        button { background: #007bff; color: white; padding: 10px 20px; }
    </style>
</head>
<body>
    <form>
        <h2>Contact Us</h2>
        <input type="text" placeholder="Name">
        <input type="email" placeholder="Email">
        <textarea placeholder="Message" rows="4"></textarea>
        <button type="submit">Send</button>
    </form>
</body>
</html>` }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">HTML Playground 🌐</h1>
          <p className="text-gray-600">Write HTML, CSS, and JavaScript with live preview</p>
        </div>
        <div className="flex gap-2">
          <Link href="/student/playground/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
          <Button variant="secondary" onClick={resetCode}>Reset</Button>
          <Button variant="primary" onClick={runCode} disabled={isRunning}>
            {isRunning ? 'Running...' : '▶ Run'}
          </Button>
        </div>
      </div>

      {/* Template Selector */}
      <Card className="mb-4">
        <CardBody className="py-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Templates:</span>
            {templates.map((template) => (
              <Button
                key={template.name}
                variant="outline"
                size="sm"
                onClick={() => { setCode(template.code); runCode(); }}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card>
          <CardBody>
            <CardTitle>Code Editor</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">HTML</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">CSS</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">JavaScript</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[500px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              spellCheck={false}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm" onClick={runCode}>Run Code</Button>
              <Button variant="outline" size="sm">Save</Button>
              <Button variant="outline" size="sm">Share</Button>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          </CardBody>
        </Card>

        {/* Preview */}
        <Card>
          <CardBody>
            <CardTitle>Live Preview</CardTitle>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
              <iframe
                srcDoc={preview}
                className="w-full h-[500px]"
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">Open in New Tab</Button>
              <Button variant="outline" size="sm">Inspect Element</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* HTML Features */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>HTML Features</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📝 Semantic Elements</h4>
              <p className="text-sm text-gray-600">Use header, nav, main, article, section, footer for better structure</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎨 Inline CSS</h4>
              <p className="text-sm text-gray-600">Style your elements directly with style attributes or style tags</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">⚡ JavaScript</h4>
              <p className="text-sm text-gray-600">Add interactivity with script tags and event handlers</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
