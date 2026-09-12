'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function PythonPlaygroundPage() {
  const [code, setCode] = useState(`# Welcome to Python Playground 🐍
# Write your Python code here and click "Run" to execute

# Basic function example
def greet(name):
    return f"Hello, {name}! Welcome to Python Playground."

print(greet("Kapi"))

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(f"Doubled numbers: {doubled}")

# Dictionary example
person = {
    "name": "Kapi",
    "role": "Student",
    "skills": ["Python", "JavaScript", "React"]
}

print(f"Person: {person}")
print(f"Skills: {', '.join(person['skills'])}")

# Try some math
total = sum(numbers)
print(f"Sum of numbers: {total}")

# Loop example
print("\\nCounting to 5:")
for i in range(1, 6):
    print(f"  {i}")

# Class example
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(f"\\n5 + 3 = {calc.add(5, 3)}")
print(f"5 * 3 = {calc.multiply(5, 3)}")`);

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

    try {
      // Simulate Python execution (in real app, this would call a backend)
      setTimeout(() => {
        const lines = code.split('\n');
        let result: string[] = [];
        
        // Simple simulation of Python print statements
        lines.forEach(line => {
          if (line.trim().startsWith('print(')) {
            const match = line.match(/print\((.*)\)/);
            if (match) {
              let content = match[1];
              // Handle f-strings
              if (content.startsWith('f"') || content.startsWith("f'")) {
                content = content.slice(2, -1);
                content = content.replace(/\{([^}]+)\}/g, (match, expr) => {
                  // Simple variable substitution simulation
                  if (expr.includes('"') || expr.includes("'")) {
                    return expr.replace(/['"]/g, '');
                  }
                  if (expr === 'name') return 'Kapi';
                  if (expr === 'doubled') return '[2, 4, 6, 8, 10]';
                  if (expr === 'person') return "{'name': 'Kapi', 'role': 'Student', 'skills': ['Python', 'JavaScript', 'React']}";
                  if (expr === "person['skills']") return "['Python', 'JavaScript', 'React']";
                  if (expr.includes('.join')) return 'Python, JavaScript, React';
                  if (expr === 'total') return '15';
                  if (expr.includes('calc.add')) return '8';
                  if (expr.includes('calc.multiply')) return '15';
                  return expr;
                });
              }
              // Handle regular strings
              else if (content.startsWith('"') || content.startsWith("'")) {
                content = content.slice(1, -1);
              }
              // Handle expressions
              else {
                content = content.replace(/['"]/g, '');
              }
              result.push(content);
            }
          }
        });

        if (result.length === 0) {
          result.push('✅ Code executed successfully (no output)');
          result.push('');
          result.push('Note: This is a simulated Python environment.');
          result.push('In production, this would connect to a Python backend.');
        }

        setOutput(result);
        setIsRunning(false);
      }, 500);
    } catch (error) {
      setOutput([`❌ Error: ${error instanceof Error ? error.message : String(error)}`]);
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(`# Welcome to Python Playground 🐍
# Write your Python code here and click "Run" to execute

# Basic function example
def greet(name):
    return f"Hello, {name}! Welcome to Python Playground."

print(greet("Kapi"))

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(f"Doubled numbers: {doubled}")

# Dictionary example
person = {
    "name": "Kapi",
    "role": "Student",
    "skills": ["Python", "JavaScript", "React"]
}

print(f"Person: {person}")
print(f"Skills: {', '.join(person['skills'])}")

# Try some math
total = sum(numbers)
print(f"Sum of numbers: {total}")

# Loop example
print("\\nCounting to 5:")
for i in range(1, 6):
    print(f"  {i}")

# Class example
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(f"\\n5 + 3 = {calc.add(5, 3)}")
print(f"5 * 3 = {calc.multiply(5, 3)}")`);
    runCode();
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const templates = [
    { name: 'Hello World', code: `print("Hello, World!")` },
    { name: 'Functions', code: `def add(a, b):\n    return a + b\n\nprint(add(5, 3))` },
    { name: 'Lists', code: `fruits = ["apple", "banana", "orange"]\nfor fruit in fruits:\n    print(fruit)` },
    { name: 'Dictionaries', code: `user = {\n    "name": "Kapi",\n    "age": 20\n}\nprint(user)` },
    { name: 'Classes', code: `class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f"Hello, I'm {self.name}"\n\np = Person("Kapi")\nprint(p.greet())` }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Python Playground 🐍</h1>
          <p className="text-gray-600">Write and execute Python code with real-time output</p>
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
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Python</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Python 3</span>
              <span className="text-xs text-gray-500">Simulated execution</span>
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

      {/* Python Features */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>Python Features</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🐍 Clean Syntax</h4>
              <p className="text-sm text-gray-600">Readable and concise code</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📦 Data Structures</h4>
              <p className="text-sm text-gray-600">Lists, dictionaries, sets, tuples</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 OOP Support</h4>
              <p className="text-sm text-gray-600">Classes and inheritance</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🔧 Rich Libraries</h4>
              <p className="text-sm text-gray-600">Extensive standard library</p>
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
              <h4 className="font-semibold mb-2">Data Types</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">str</code> - Strings</li>
                <li><code className="bg-gray-100 px-1 rounded">int</code> - Integers</li>
                <li><code className="bg-gray-100 px-1 rounded">float</code> - Floats</li>
                <li><code className="bg-gray-100 px-1 rounded">bool</code> - Booleans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Structures</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">list</code> - Ordered list</li>
                <li><code className="bg-gray-100 px-1 rounded">dict</code> - Key-value pairs</li>
                <li><code className="bg-gray-100 px-1 rounded">set</code> - Unique items</li>
                <li><code className="bg-gray-100 px-1 rounded">tuple</code> - Immutable list</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Functions</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">print()</code> - Output</li>
                <li><code className="bg-gray-100 px-1 rounded">len()</code> - Length</li>
                <li><code className="bg-gray-100 px-1 rounded">range()</code> - Range</li>
                <li><code className="bg-gray-100 px-1 rounded">type()</code> - Type</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Note about backend */}
      <Card className="mt-4 border-yellow-500">
        <CardBody className="bg-yellow-50">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> This is a simulated Python environment for demonstration purposes. 
            In production, this would connect to a Python backend service for actual code execution.
          </p>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
