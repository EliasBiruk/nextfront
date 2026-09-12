'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

declare global {
  interface Window {
    Babel?: any;
    React?: any;
    ReactDOM?: any;
  }
}

export default function ReactPlaygroundPage() {
  const [code, setCode] = useState(`import React from 'react';

function App() {
    const [count, setCount] = React.useState(0);
    const [message, setMessage] = React.useState('');

    const handleClick = () => {
        setCount(count + 1);
        setMessage(\`Clicked \${count + 1} times!\`);
    };

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
                React Playground ⚛️
            </h1>
            <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                Build React components with live preview
            </p>
            
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                color: '#333'
            }}>
                <h2 style={{ marginBottom: '15px' }}>Counter: {count}</h2>
                <button 
                    onClick={handleClick}
                    style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '15px 30px',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Click Me!
                </button>
                {message && (
                    <p style={{ marginTop: '20px', color: '#667eea', fontWeight: 'bold' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;`);

  const [preview, setPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const babelRef = useRef<any>(null);
  const reactRef = useRef<any>(null);
  const reactDOMRef = useRef<any>(null);

  useEffect(() => {
    const loadScript = (src: string, ref: React.RefObject<any>) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        if (ref.current) ref.current = window;
      };
      document.head.appendChild(script);
    };

    loadScript('https://unpkg.com/react@18/umd/react.development.js', reactRef);
    loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js', reactDOMRef);
    loadScript('https://unpkg.com/@babel/standalone/babel.min.js', babelRef);
  }, []);

  useEffect(() => {
    if (window.Babel && window.React && window.ReactDOM) {
      runCode();
    }
  }, [code]);

  const runCode = () => {
    setIsRunning(true);
    setError('');

    try {
      if (!window.Babel || !window.React || !window.ReactDOM) {
        setError('Loading React libraries...');
        setIsRunning(false);
        return;
      }

      const transformedCode = window.Babel.transform(code, {
        presets: ['react']
      }).code;

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script>
              window.React = parent.React;
              window.ReactDOM = parent.ReactDOM;
              ${transformedCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(App));
            </script>
          </body>
          </html>
        `);
        iframeDoc.close();

        setTimeout(() => {
          setPreview(iframeDoc.documentElement.outerHTML);
          document.body.removeChild(iframe);
          setIsRunning(false);
        }, 100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(`import React from 'react';

function App() {
    const [count, setCount] = React.useState(0);
    const [message, setMessage] = React.useState('');

    const handleClick = () => {
        setCount(count + 1);
        setMessage(\`Clicked \${count + 1} times!\`);
    };

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
                React Playground ⚛️
            </h1>
            <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                Build React components with live preview
            </p>
            
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                color: '#333'
            }}>
                <h2 style={{ marginBottom: '15px' }}>Counter: {count}</h2>
                <button 
                    onClick={handleClick}
                    style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '15px 30px',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Click Me!
                </button>
                {message && (
                    <p style={{ marginTop: '20px', color: '#667eea', fontWeight: 'bold' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;`);
    runCode();
  };

  const templates = [
    { name: 'Counter', code: `import React from 'react';

function App() {
    const [count, setCount] = React.useState(0);
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default App;` },
    { name: 'Todo List', code: `import React from 'react';

function App() {
    const [todos, setTodos] = React.useState([]);
    const [input, setInput] = React.useState('');
    
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput('');
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Todo List</h1>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo, i) => (
                    <li key={i}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;` },
    { name: 'Form', code: `import React from 'react';

function App() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h1>Contact Form</h1>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default App;` }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">React Playground ⚛️</h1>
          <p className="text-gray-600">Build React components with live preview</p>
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

      {/* Error Display */}
      {error && (
        <Card className="mb-4 border-red-500">
          <CardBody className="bg-red-50">
            <p className="text-red-700 font-semibold">Error: {error}</p>
          </CardBody>
        </Card>
      )}

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card>
          <CardBody>
            <CardTitle>Component Editor</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
              <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded">JSX</span>
              <span className="text-xs text-gray-500">Hooks supported</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[500px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              spellCheck={false}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm" onClick={runCode}>Run Component</Button>
              <Button variant="outline" size="sm">Save</Button>
              <Button variant="outline" size="sm">Share</Button>
              <Button variant="outline" size="sm">Copy Code</Button>
            </div>
          </CardBody>
        </Card>

        {/* Preview */}
        <Card>
          <CardBody>
            <CardTitle>Live Preview</CardTitle>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
              {preview ? (
                <iframe
                  srcDoc={preview}
                  className="w-full h-[500px]"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="w-full h-[500px] flex items-center justify-center bg-gray-50">
                  <p className="text-gray-500">Click "Run" to see preview</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">Open in New Tab</Button>
              <Button variant="outline" size="sm">Full Screen</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* React Features */}
      <Card className="mt-4">
        <CardBody>
          <CardTitle>React Features</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">⚛️ Components</h4>
              <p className="text-sm text-gray-600">Functional components with hooks</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎣 useState</h4>
              <p className="text-sm text-gray-600">State management in components</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">⏰ useEffect</h4>
              <p className="text-sm text-gray-600">Side effects and lifecycle</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎨 JSX</h4>
              <p className="text-sm text-gray-600">HTML-like syntax in JavaScript</p>
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
              <h4 className="font-semibold mb-2">Common Hooks</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">useState()</code> - State</li>
                <li><code className="bg-gray-100 px-1 rounded">useEffect()</code> - Effects</li>
                <li><code className="bg-gray-100 px-1 rounded">useContext()</code> - Context</li>
                <li><code className="bg-gray-100 px-1 rounded">useRef()</code> - Refs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Component Patterns</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Functional components</li>
                <li>Props destructuring</li>
                <li>Conditional rendering</li>
                <li>List rendering with map</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Event Handlers</h4>
              <ul className="text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">onClick</code> - Click</li>
                <li><code className="bg-gray-100 px-1 rounded">onChange</code> - Input</li>
                <li><code className="bg-gray-100 px-1 rounded">onSubmit</code> - Form</li>
                <li><code className="bg-gray-100 px-1 rounded">onHover</code> - Hover</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
