'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function CSSPlaygroundPage() {
  const [cssCode, setCssCode] = useState(`/* CSS Playground - Style this element! */
.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.box {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

h1 {
    color: #333;
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

p {
    color: #666;
    font-size: 1.1em;
    line-height: 1.6;
}

.button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    margin: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.button:active {
    transform: scale(0.98);
}`);

  const [htmlContent] = useState(`<div class="container">
    <div class="box">
        <h1>CSS Playground 🎨</h1>
        <p>Edit the CSS on the left to style this element!</p>
        <button class="button">Hover Me</button>
        <button class="button">Click Me</button>
    </div>
</div>`);

  const [preview, setPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    runCode();
  }, []);

  const runCode = () => {
    setIsRunning(true);
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        ${cssCode}
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
    setPreview(fullHtml);
    setTimeout(() => setIsRunning(false), 500);
  };

  const resetCode = () => {
    setCssCode(`/* CSS Playground - Style this element! */
.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.box {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

h1 {
    color: #333;
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

p {
    color: #666;
    font-size: 1.1em;
    line-height: 1.6;
}

.button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    margin: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.button:active {
    transform: scale(0.98);
}`);
    runCode();
  };

  const templates = [
    { name: 'Basic', code: `.element {\n    background: #fff;\n    padding: 20px;\n    border-radius: 5px;\n}` },
    { name: 'Gradient', code: `.element {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    padding: 30px;\n    border-radius: 15px;\n}` },
    { name: 'Animation', code: `@keyframes pulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n}\n.element {\n    animation: pulse 2s infinite;\n    background: #667eea;\n    padding: 30px;\n    border-radius: 15px;\n}` },
    { name: 'Card', code: `.card {\n    background: white;\n    border-radius: 10px;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n    padding: 20px;\n    transition: transform 0.3s;\n}\n.card:hover {\n    transform: translateY(-5px);\n}` }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CSS Playground 🎨</h1>
          <p className="text-gray-600">Experiment with CSS styling and animations</p>
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
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm font-medium text-gray-700">Templates:</span>
            {templates.map((template) => (
              <Button
                key={template.name}
                variant="outline"
                size="sm"
                onClick={() => { setCssCode(template.code); runCode(); }}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CSS Editor */}
        <Card>
          <CardBody>
            <CardTitle>CSS Editor</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">CSS</span>
              <span className="text-xs text-gray-500">Syntax highlighting enabled</span>
            </div>
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="w-full h-[500px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              spellCheck={false}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm" onClick={runCode}>Apply Styles</Button>
              <Button variant="outline" size="sm">Save</Button>
              <Button variant="outline" size="sm">Share</Button>
              <Button variant="outline" size="sm">Copy CSS</Button>
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
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">Open in New Tab</Button>
              <Button variant="outline" size="sm">Full Screen</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* CSS Features */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>CSS Features</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎨 Flexbox</h4>
              <p className="text-sm text-gray-600">display: flex for flexible layouts</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📐 Grid</h4>
              <p className="text-sm text-gray-600">display: grid for 2D layouts</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">✨ Animations</h4>
              <p className="text-sm text-gray-600">@keyframes for motion</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🌈 Gradients</h4>
              <p className="text-sm text-gray-600">linear-gradient and radial-gradient</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Reference */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>Quick Reference</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Common Properties</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">color</code> - Text color</li>
                <li><code className="bg-gray-100 px-1 rounded">background</code> - Background color/image</li>
                <li><code className="bg-gray-100 px-1 rounded">padding</code> - Inner spacing</li>
                <li><code className="bg-gray-100 px-1 rounded">margin</code> - Outer spacing</li>
                <li><code className="bg-gray-100 px-1 rounded">border</code> - Border styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Layout Properties</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">display</code> - Display type</li>
                <li><code className="bg-gray-100 px-1 rounded">position</code> - Positioning</li>
                <li><code className="bg-gray-100 px-1 rounded">flex</code> - Flexbox properties</li>
                <li><code className="bg-gray-100 px-1 rounded">grid</code> - Grid properties</li>
                <li><code className="bg-gray-100 px-1 rounded">transform</code> - Transforms</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
