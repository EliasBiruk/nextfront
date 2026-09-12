'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function JavaScriptPlaygroundPage() {
  const [code, setCode] = useState(`// Welcome to JavaScript Playground ⚡
// Write your code here and click "Run" to execute

// Basic function example
function greet(name) {
    return \`Hello, \${name}! Welcome to JavaScript Playground.\`;
}

console.log(greet('Kapi'));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled numbers:', doubled);

// Object example
const person = {
    name: 'Kapi',
    role: 'Student',
    skills: ['JavaScript', 'React', 'Python']
};

console.log('Person:', person);
console.log('Skills:', person.skills.join(', '));

// Try some math
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('Sum of numbers:', sum);

// Async example simulation
console.log('Starting async operation...');
setTimeout(() => {
    console.log('Async operation completed!');
}, 1000);`);

  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    runCode();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    console.error = (...args) => {
      logs.push('❌ ERROR: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    console.warn = (...args) => {
      logs.push('⚠️ WARN: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    try {
      setTimeout(() => {
        try {
          const wrappedCode = `
            try {
              ${code}
            } catch (e) {
              console.error(e.message);
            }
          `;
          
          const result = eval(wrappedCode);
          
          if (result !== undefined && !logs.length) {
            logs.push(`➡️ Result: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`);
          }
          
          if (logs.length === 0) {
            logs.push('✅ Code executed successfully (no output)');
          }
        } catch (error) {
          logs.push(`❌ Syntax Error: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        setOutput(logs);
        setIsRunning(false);
      }, 100);
    } catch (error) {
      logs.push(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      setOutput(logs);
      setIsRunning(false);
    }

    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  };

  const resetCode = () => {
    setCode(`// Welcome to JavaScript Playground ⚡
// Write your code here and click "Run" to execute

// Basic function example
function greet(name) {
    return \`Hello, \${name}! Welcome to JavaScript Playground.\`;
}

console.log(greet('Kapi'));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled numbers:', doubled);

// Object example
const person = {
    name: 'Kapi',
    role: 'Student',
    skills: ['JavaScript', 'React', 'Python']
};

console.log('Person:', person);
console.log('Skills:', person.skills.join(', '));

// Try some math
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('Sum of numbers:', sum);

// Async example simulation
console.log('Starting async operation...');
setTimeout(() => {
    console.log('Async operation completed!');
}, 1000);`);
    runCode();
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const templates = [
    { name: 'Hello World', code: `console.log('Hello, World!');` },
    { name: 'Functions', code: `function add(a, b) {\n    return a + b;\n}\n\nconsole.log(add(5, 3));` },
    { name: 'Arrays', code: `const fruits = ['apple', 'banana', 'orange'];\nfruits.forEach(fruit => console.log(fruit));` },
    { name: 'Objects', code: `const user = {\n    name: 'Kapi',\n    age: 20\n};\nconsole.log(user);` },
    { name: 'Async', code: `async function fetchData() {\n    console.log('Fetching data...');\n    await new Promise(r => setTimeout(r, 1000));\n    console.log('Data fetched!');\n}\n\nfetchData();` }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">JavaScript Playground ⚡</h1>
          <p className="text-gray-600">Write and execute JavaScript code with real-time output</p>
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
                onClick={() => { setCode(template.code); runCode(); }}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Editor and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card>
          <CardBody>
            <CardTitle>Code Editor</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">JavaScript</span>
              <span className="text-xs text-gray-500">ES6+ supported</span>
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
              <Button variant="outline" size="sm">Copy Code</Button>
            </div>
          </CardBody>
        </Card>

        {/* Console Output */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-3">
              <CardTitle>Console Output</CardTitle>
              <Button variant="outline" size="sm" onClick={clearOutput}>Clear</Button>
            </div>
            <div
              ref={outputRef}
              className="w-full h-[500px] font-mono text-sm p-4 border border-gray-300 rounded-lg bg-gray-900 text-green-400 overflow-y-auto"
            >
              {output.length === 0 ? (
                <p className="text-gray-500">Output will appear here...</p>
              ) : (
                output.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <span className="text-xs text-gray-500">{output.length} lines</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* JavaScript Features */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>JavaScript Features</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">⚡ ES6+ Syntax</h4>
              <p className="text-sm text-gray-600">Arrow functions, destructuring, spread operator</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🔄 Async/Await</h4>
              <p className="text-sm text-gray-600">Modern asynchronous programming</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📦 Array Methods</h4>
              <p className="text-sm text-gray-600">map, filter, reduce, forEach</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Objects</h4>
              <p className="text-sm text-gray-600">Object literals, destructuring, methods</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Reference */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>Quick Reference</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Console Methods</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">console.log()</code> - Output</li>
                <li><code className="bg-gray-100 px-1 rounded">console.error()</code> - Error</li>
                <li><code className="bg-gray-100 px-1 rounded">console.warn()</code> - Warning</li>
                <li><code className="bg-gray-100 px-1 rounded">console.table()</code> - Table</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Array Methods</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">.map()</code> - Transform</li>
                <li><code className="bg-gray-100 px-1 rounded">.filter()</code> - Filter</li>
                <li><code className="bg-gray-100 px-1 rounded">.reduce()</code> - Reduce</li>
                <li><code className="bg-gray-100 px-1 rounded">.find()</code> - Find</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">String Methods</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">.toUpperCase()</code> - Uppercase</li>
                <li><code className="bg-gray-100 px-1 rounded">.toLowerCase()</code> - Lowercase</li>
                <li><code className="bg-gray-100 px-1 rounded">.split()</code> - Split</li>
                <li><code className="bg-gray-100 px-1 rounded">.join()</code> - Join</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
