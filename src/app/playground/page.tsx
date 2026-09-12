'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

// File icon based on extension
function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap: Record<string, string> = {
    'js': '📜',
    'jsx': '⚛️',
    'ts': '📘',
    'tsx': '⚛️',
    'css': '🎨',
    'scss': '🎨',
    'html': '🌐',
    'json': '📋',
    'md': '📝',
    'py': '🐍',
    'txt': '📄',
    'svg': '🖼️',
    'png': '🖼️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
  };
  return iconMap[ext || ''] || '📄';
}

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  parentId?: string;
}

export default function PlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Welcome to JoyEdu Playground!
// Write your code here and click "Run" to execute

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('JoyEdu Student'));

// Try some math
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('Sum:', sum);
`);
  const [output, setOutput] = useState<string[]>([]);
  const [htmlPreview, setHtmlPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // React Sandbox State
  const [fileSystem, setFileSystem] = useState<FileNode[]>([
    {
      id: 'folder-1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: 'file-1',
          name: 'App.jsx',
          type: 'file',
          content: `import React from "react";
import Header from './Header';
import Footer from './Footer';

export default function App() {
  return (
    <div>
      <Header />
      <h1>Hello React 🚀</h1>
      <p>App.jsx is working!</p>
      <Footer />
    </div>
  );
}`
        },
        {
          id: 'file-2',
          name: 'Header.jsx',
          type: 'file',
          content: `import React from "react";

export default function Header() {
  return (
    <header style={{ background: '#2563eb', color: 'white', padding: '20px' }}>
      <h2>JoyEdu Header</h2>
    </header>
  );
}`
        },
        {
          id: 'file-3',
          name: 'Footer.jsx',
          type: 'file',
          content: `import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: '#1e293b', color: 'white', padding: '20px', marginTop: '50px' }}>
      <p>© 2024 JoyEdu - All rights reserved</p>
    </footer>
  );
}`
        }
      ]
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [selectedParentFolder, setSelectedParentFolder] = useState<string>('folder-1');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([]));
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [nodeToRename, setNodeToRename] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<FileNode | null>(null);
  const [contextMenu, setContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null);
  const [copiedNode, setCopiedNode] = useState<FileNode | null>(null);
  const [cutNode, setCutNode] = useState<FileNode | null>(null);
  const babelRef = useRef<any>(null);
  const reactRef = useRef<any>(null);
  const reactDOMRef = useRef<any>(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Interactive web programming' },
    { id: 'html', name: 'HTML/CSS', icon: '🌐', description: 'Web markup and styling' },
    { id: 'python', name: 'Python', icon: '🐍', description: 'General-purpose programming' },
    { id: 'typescript', name: 'TypeScript', icon: '📘', description: 'Typed JavaScript' },
    { id: 'react', name: 'React Sandbox', icon: '⚛️', description: 'React with file management' },
  ];

  // Load Babel and React libraries for React Sandbox
  useEffect(() => {
    if (selectedLanguage === 'react') {
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
    }
  }, [selectedLanguage]);

  // File system management functions
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const createFile = (parentId: string, name: string) => {
    const newFile: FileNode = {
      id: `file-${Date.now()}`,
      name,
      type: 'file',
      content: '',
      parentId
    };

    setFileSystem(prev => {
      const addToFile = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === parentId && node.type === 'folder') {
            setExpandedFolders(prev => new Set([...prev, parentId]));
            return { ...node, children: [...(node.children || []), newFile] };
          }
          if (node.children) {
            return { ...node, children: addToFile(node.children) };
          }
          return node;
        });
      };
      return addToFile(prev);
    });
    setSelectedFile(newFile);
  };

  const createFolder = (parentId: string | null, name: string) => {
    const newFolder: FileNode = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      children: [],
      parentId: parentId || undefined
    };

    if (parentId) {
      setFileSystem(prev => {
        const addToFolder = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.id === parentId && node.type === 'folder') {
              return { ...node, children: [...(node.children || []), newFolder] };
            }
            if (node.children) {
              return { ...node, children: addToFolder(node.children) };
            }
            return node;
          });
        };
        return addToFolder(prev);
      });
    } else {
      setFileSystem(prev => [...prev, newFolder]);
    }
    setExpandedFolders(prev => new Set([...prev, newFolder.id]));
  };

  const renameNode = (nodeId: string, newName: string) => {
    setFileSystem(prev => {
      const renameInTree = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, name: newName };
          }
          if (node.children) {
            return { ...node, children: renameInTree(node.children) };
          }
          return node;
        });
      };
      return renameInTree(prev);
    });
    setShowRenameModal(false);
    setNodeToRename(null);
    setRenameValue('');
  };

  const copyNode = (node: FileNode) => {
    setCopiedNode({ ...node, id: `copy-${node.id}` });
    setCutNode(null);
  };

  const handleCutNode = (node: FileNode) => {
    setCutNode(node);
    setCopiedNode(null);
  };

  const pasteNode = (targetParentId: string | null) => {
    if (copiedNode) {
      const newNode: FileNode = {
        ...copiedNode,
        id: `${copiedNode.type}-${Date.now()}`,
        name: `${copiedNode.name} (copy)`,
        parentId: targetParentId || undefined,
        children: copiedNode.children ? copiedNode.children.map(child => ({
          ...child,
          id: `${child.type}-${Date.now()}-${Math.random()}`,
          parentId: undefined
        })) : undefined
      };

      const addToTree = (nodes: FileNode[]): FileNode[] => {
        if (targetParentId) {
          return nodes.map(node => {
            if (node.id === targetParentId && node.type === 'folder') {
              setExpandedFolders(prev => new Set([...prev, targetParentId]));
              return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
              return { ...node, children: addToTree(node.children) };
            }
            return node;
          });
        }
        return [...nodes, newNode];
      };

      setFileSystem(prev => addToTree(prev));
      setCopiedNode(null);
    } else if (cutNode) {
      moveNode(cutNode.id, targetParentId);
      if (targetParentId) {
        setExpandedFolders(prev => new Set([...prev, targetParentId]));
      }
      setCutNode(null);
    }
  };

  const handleMenuAction = (action: string, nodeId?: string) => {
    setContextMenu(null);
    if (!nodeId && contextMenu) nodeId = contextMenu.nodeId;
    
    if (!nodeId) return;
    
    switch (action) {
      case 'rename':
        setNodeToRename(nodeId);
        setRenameValue(fileSystem.find(n => n.id === nodeId)?.name || '');
        setShowRenameModal(true);
        break;
      case 'delete':
        deleteNode(nodeId);
        break;
      case 'copy':
        const nodeToCopy = fileSystem.find(n => n.id === nodeId);
        if (nodeToCopy) copyNode(nodeToCopy);
        break;
      case 'cut':
        const nodeToCut = fileSystem.find(n => n.id === nodeId);
        if (nodeToCut) handleCutNode(nodeToCut);
        break;
      case 'paste':
        pasteNode(nodeId);
        break;
    }
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  const moveNode = (nodeId: string, targetParentId: string | null) => {
    setFileSystem(prev => {
      // Find and remove the node
      let movedNode: FileNode | null = null;
      const removeNode = (nodes: FileNode[]): FileNode[] => {
        const result: FileNode[] = [];
        for (const node of nodes) {
          if (node.id === nodeId) {
            movedNode = { ...node, parentId: targetParentId || undefined };
          } else {
            if (node.children) {
              node.children = removeNode(node.children);
            }
            result.push(node);
          }
        }
        return result;
      };

      const withoutNode = removeNode([...prev]);

      if (!movedNode) return prev;

      // Add the node to the new parent
      if (targetParentId) {
        // Expand the target folder when moving into it
        setExpandedFolders(prev => new Set([...prev, targetParentId]));
        const addToFolder = (nodes: FileNode[]): FileNode[] => {
          const result: FileNode[] = [];
          for (const node of nodes) {
            if (node.id === targetParentId && node.type === 'folder') {
              result.push({ 
                ...node, 
                children: [...(node.children || []), movedNode as FileNode] 
              });
            } else {
              if (node.children) {
                node.children = addToFolder(node.children);
              }
              result.push(node);
            }
          }
          return result;
        };
        return addToFolder(withoutNode);
      } else {
        // Move to root
        return [...withoutNode, movedNode as FileNode];
      }
    });
  };

  const updateFileContent = (fileId: string, content: string) => {
    setFileSystem(prev => {
      const updateFile = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === fileId) {
            return { ...node, content };
          }
          if (node.children) {
            return { ...node, children: updateFile(node.children) };
          }
          return node;
        });
      };
      return updateFile(prev);
    });
  };

  const deleteNode = (nodeId: string) => {
    setFileSystem(prev => {
      const removeNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter(node => {
          if (node.id === nodeId) return false;
          if (node.children) {
            node.children = removeNode(node.children);
          }
          return true;
        });
      };
      return removeNode(prev);
    });
    if (selectedFile?.id === nodeId) {
      setSelectedFile(null);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    try {
      // Capture console.log output
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
        logs.push('ERROR: ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };
      
      console.warn = (...args) => {
        logs.push('WARN: ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      // Execute code based on language
      setTimeout(() => {
        try {
          if (selectedLanguage === 'javascript' || selectedLanguage === 'typescript') {
            // Execute JavaScript/TypeScript directly
            // Override console methods to capture output
            const wrappedCode = `
              try {
                ${code}
              } catch (e) {
                console.error(e.message);
              }
            `;
            
            const result = eval(wrappedCode);
            
            if (result !== undefined && !logs.length) {
              logs.push(`Result: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`);
            }
            
            if (logs.length === 0) {
              logs.push('Code executed successfully (no output)');
            }
          } else if (selectedLanguage === 'python') {
            // Simulate Python execution (would need backend)
            logs.push('Python execution requires backend integration.');
            logs.push('For demo purposes, here are some Python operations:');
            logs.push('');
            logs.push('# Sample Python code would execute:');
            logs.push('print("Hello, JoyEdu!")');
            logs.push('# Output: Hello, JoyEdu!');
            logs.push('');
            logs.push('num1 = 10');
            logs.push('num2 = 20');
            logs.push('print(num1 + num2)');
            logs.push('# Output: 30');
          } else if (selectedLanguage === 'html') {
            // Render HTML/CSS in iframe
            setHtmlPreview(code);
            logs.push('HTML/CSS rendered in preview pane below.');
          } else if (selectedLanguage === 'react') {
            // Execute React code
            if (!selectedFile || !selectedFile.content) {
              logs.push('Please select a file to run.');
            } else {
              try {
                // Process the code to handle imports and exports
                let processedCode = selectedFile.content;
                
                console.log('Original code:', processedCode);
                
                // Helper function to find file content by name
                const findFileContent = (fileName: string): string | null => {
                  const searchInNodes = (nodes: FileNode[]): string | null => {
                    for (const node of nodes) {
                      if (node.type === 'file' && node.name === fileName) {
                        return node.content || '';
                      }
                      if (node.children) {
                        const found = searchInNodes(node.children);
                        if (found) return found;
                      }
                    }
                    return null;
                  };
                  return searchInNodes(fileSystem);
                };
                
                // Handle local imports (e.g., import Header from './Header')
                processedCode = processedCode.replace(/import\s+(\w+)\s+from\s+['"]\.\/(.+?)['']/g, (match, componentName, fileName) => {
                  const fileContent = findFileContent(fileName.includes('.') ? fileName : `${fileName}.jsx`);
                  if (fileContent) {
                    // Process the imported file
                    let importedCode = fileContent
                      .replace(/import React from ["']react["'];?\s*\n?/g, '')
                      .replace(/import.*from ["']react["'];?\s*\n?/g, '')
                      .replace(/export default\s+function\s+(\w+)/, 'const $1 =')
                      .replace(/export default\s+const\s+(\w+)/, 'const $1 =')
                      .replace(/export default\s+let\s+(\w+)/, 'let $1 =')
                      .replace(/export default\s+var\s+(\w+)/, 'var $1 =')
                      .replace(/export default\s+/, '');
                    return importedCode;
                  }
                  return match; // Keep original if file not found
                });
                
                // Remove React and ReactDOM imports (they're available globally)
                processedCode = processedCode.replace(/import React from ["']react["'];?\s*\n?/g, '');
                processedCode = processedCode.replace(/import.*from ["']react["'];?\s*\n?/g, '');
                processedCode = processedCode.replace(/import.*from ["']react-dom["'];?\s*\n?/g, '');
                
                // Simple export default handling - just remove it
                processedCode = processedCode.replace(/export default\s+function\s+App/, 'function App');
                processedCode = processedCode.replace(/export default\s+function/, 'function App');
                processedCode = processedCode.replace(/export default\s+const\s+App/, 'const App');
                processedCode = processedCode.replace(/export default\s+let\s+App/, 'let App');
                processedCode = processedCode.replace(/export default\s+var\s+App/, 'var App');
                processedCode = processedCode.replace(/export default\s+/, '');
                
                console.log('After export removal:', processedCode);
                
                // Ensure we have an App component
                if (!processedCode.includes('function App') && !processedCode.includes('const App') && !processedCode.includes('let App') && !processedCode.includes('var App')) {
                  // Try to find any function and rename it to App
                  const funcMatch = processedCode.match(/function\s+(\w+)/);
                  if (funcMatch) {
                    const funcName = funcMatch[1];
                    processedCode = processedCode.replace(new RegExp(`function\\s+${funcName}`), 'function App');
                  } else {
                    // Wrap everything in App function
                    processedCode = `function App() {\n  return (\n    ${processedCode}\n  );\n}`;
                  }
                }
                
                console.log('After App conversion:', processedCode);
                
                // Ensure ReactDOM.render is called
                if (!processedCode.includes('ReactDOM.render')) {
                  processedCode += '\nReactDOM.render(<App />, document.getElementById("root"));';
                }
                
                console.log('Final code to execute:', processedCode);
                
                const sandboxHtml = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                    <style>
                      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                      #error-display { background: #fee; border: 1px solid #c00; padding: 10px; margin: 10px 0; border-radius: 4px; }
                      #error-display h3 { margin: 0 0 10px 0; color: #c00; }
                      #error-display pre { background: #fff; padding: 10px; border-radius: 4px; overflow: auto; }
                    </style>
                  </head>
                  <body>
                    <div id="error-display" style="display: none;"></div>
                    <div id="root"></div>
                    <script type="text/babel">
                      window.addEventListener('error', function(e) {
                        const errorDisplay = document.getElementById('error-display');
                        errorDisplay.style.display = 'block';
                        errorDisplay.innerHTML = '<h3>Runtime Error</h3><pre>' + e.message + '\\n' + (e.stack || '') + '</pre>';
                      });
                      
                      try {
                        ${processedCode}
                      } catch (error) {
                        const errorDisplay = document.getElementById('error-display');
                        errorDisplay.style.display = 'block';
                        errorDisplay.innerHTML = '<h3>Execution Error</h3><pre>' + error.message + '\\n' + (error.stack || '') + '</pre>';
                        console.error('React execution error:', error);
                      }
                    </script>
                  </body>
                  </html>
                `;
                
                console.log('Sandbox HTML generated, length:', sandboxHtml.length);
                setHtmlPreview(sandboxHtml);
                logs.push('React component rendered in preview pane.');
              } catch (error) {
                console.error('React execution error:', error);
                logs.push(`Error: ${error instanceof Error ? error.message : String(error)}`);
              }
            }
          }

          setOutput(logs);
        } catch (error) {
          setOutput([`Error: ${error instanceof Error ? error.message : String(error)}`]);
        } finally {
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
          setIsRunning(false);
        }
      }, 300);
    } catch (error) {
      setOutput([`Error: ${error instanceof Error ? error.message : String(error)}`]);
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
    setHtmlPreview('');
  };

  const resetCode = () => {
    const defaultCode: Record<string, string> = {
      javascript: `// Welcome to JoyEdu JavaScript Playground!
// Click "Run Code" to execute

// Example 1: String manipulation
const message = "Hello, JoyEdu!";
console.log(message.toUpperCase());
console.log(message.toLowerCase());

// Example 2: Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

const sum = numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);

// Example 3: Object operations
const user = {
  name: "JoyEdu Student",
  level: "Beginner",
  courses: ["JavaScript", "React"]
};
console.log("User:", user);
console.log("Courses:", user.courses.join(", "));

// Example 4: Function
function calculateGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}
console.log("Grade for 85:", calculateGrade(85));
`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JoyEdu HTML/CSS Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    h1 {
      color: #2563eb;
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    
    .subtitle {
      color: #64748b;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
    
    .card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .card h3 {
      margin-bottom: 10px;
    }
    
    .button {
      background: #2563eb;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .button:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 20px;
    }
    
    .feature {
      background: #f1f5f9;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    
    .feature-icon {
      font-size: 2em;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎓 Welcome to JoyEdu</h1>
    <p class="subtitle">Your Interactive Learning Platform</p>
    
    <div class="card">
      <h3>🚀 Start Learning Today</h3>
      <p>Join thousands of students learning to code, design, and build amazing projects.</p>
    </div>
    
    <button class="button" onclick="alert('Welcome to JoyEdu!')">Get Started</button>
    
    <div class="features">
      <div class="feature">
        <div class="feature-icon">📚</div>
        <div>Courses</div>
      </div>
      <div class="feature">
        <div class="feature-icon">💻</div>
        <div>Playground</div>
      </div>
      <div class="feature">
        <div class="feature-icon">🎖️</div>
        <div>Certificates</div>
      </div>
      <div class="feature">
        <div class="feature-icon">👥</div>
        <div>Community</div>
      </div>
    </div>
  </div>
</body>
</html>`,
      python: `# Welcome to JoyEdu Python Playground!
# Note: Python requires backend integration for actual execution
# This is a sample of what Python code would look like

# Example 1: Basic functions
def greet(name):
    return f"Hello, {name}!"

print(greet("JoyEdu Student"))

# Example 2: List comprehension
numbers = [1, 2, 3, 4, 5]
squared = [n ** 2 for n in numbers]
print(f"Squared: {squared}")

# Example 3: Dictionary operations
student = {
    "name": "JoyEdu Student",
    "level": "Beginner",
    "courses": ["Python", "Data Science"]
}
print(f"Student: {student['name']}")
print(f"Courses: {', '.join(student['courses'])}")

# Example 4: Class example
class Course:
    def __init__(self, name, duration):
        self.name = name
        self.duration = duration
    
    def info(self):
        return f"{self.name} ({self.duration} hours)"

course = Course("Python Fundamentals", 40)
print(f"Course: {course.info()}")

# Example 5: Lambda and map
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(f"Doubled: {doubled}")
`,
      typescript: `// Welcome to JoyEdu TypeScript Playground!
// Click "Run Code" to execute

// Example 1: Interface and Types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
}

const user: User = {
  id: 1,
  name: "JoyEdu Student",
  email: "student@joyedu.com",
  role: "student"
};
console.log("User:", user);

// Example 2: Generic function
function identity<T>(arg: T): T {
  return arg;
}

const numberResult = identity<number>(42);
const stringResult = identity<string>("Hello");
console.log("Number:", numberResult);
console.log("String:", stringResult);

// Example 3: Union Types
type ID = string | number;

function processId(id: ID): string {
  if (typeof id === "string") {
    return \`ID: \${id.toUpperCase()}\`;
  }
  return \`ID: #\${id}\`;
}

console.log(processId("abc123"));
console.log(processId(456));

// Example 4: Classes with Type
class Course {
  constructor(
    public title: string,
    public duration: number,
    public level: 'beginner' | 'intermediate' | 'advanced'
  ) {}

  getInfo(): string {
    return \`\${this.title} (\${this.level}, \${this.duration}h)\`;
  }
}

const course = new Course("TypeScript Basics", 20, "beginner");
console.log("Course:", course.getInfo());

// Example 5: Async/Await with Types
async function fetchData<T>(url: string): Promise<T> {
  // Simulated API call
  return { data: "sample" } as T;
}

fetchData<{ data: string }>("/api/data")
  .then(result => console.log("Data:", result))
  .catch(error => console.error("Error:", error));
`,
      react: `// React Sandbox
// Select a file from the file explorer to edit
// Click "Run" to render your React component

import React from "react";
import Header from './Header';
import Footer from './Footer';

export default function App() {
  return (
    <div>
      <Header />
      <h1>Hello React 🚀</h1>
      <p>App.jsx is working!</p>
      <Footer />
    </div>
  );
}`
    };
    setCode(defaultCode[selectedLanguage] || '');
    setOutput([]);
    setHtmlPreview('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-2">Interactive Playground</h1>
                  <p className="text-[var(--joyedu-text-secondary)]">Code and learn in real-time</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[var(--joyedu-text-secondary)]">Simulate Login:</label>
                  <button
                    onClick={() => setIsAuthenticated(!isAuthenticated)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isAuthenticated ? 'bg-[var(--joyedu-success)]' : 'bg-[var(--joyedu-border-300)]'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 transform rounded-full bg-white transition-transform ${
                        isAuthenticated ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Choose Your Environment</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        if (lang.id === 'react' && !isAuthenticated) {
                          alert('React Sandbox requires login. Please toggle "Simulate Login" above.');
                          return;
                        }
                        setSelectedLanguage(lang.id);
                        resetCode();
                        setHtmlPreview('');
                      }}
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        selectedLanguage === lang.id 
                          ? 'border-[var(--joyedu-primary-500)] bg-[var(--joyedu-primary-subtle)]' 
                          : 'border-[var(--joyedu-border-200)] hover:border-[var(--joyedu-border-300)]'
                      } ${lang.id === 'react' && !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="text-2xl mb-2">{lang.icon}</div>
                      <div className="font-semibold text-[var(--joyedu-text-primary)]">{lang.name}</div>
                      <div className="text-xs text-[var(--joyedu-text-secondary)]">{lang.description}</div>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* React Sandbox */}
            {selectedLanguage === 'react' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* File Explorer */}
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle>File Explorer</CardTitle>
                      <div className="flex gap-2">
                        <Button onClick={() => setShowNewFileModal(true)} variant="outline" size="sm">+ File</Button>
                        <Button onClick={() => setShowNewFolderModal(true)} variant="outline" size="sm">+ Folder</Button>
                      </div>
                    </div>
                    <div className="text-xs text-[var(--joyedu-text-muted)] mb-2">
                      💡 Click (...) for options • Drag to move • Right-click for menu
                    </div>
                    <div className="space-y-1 max-h-96 overflow-auto" onClick={() => setContextMenu(null)}>
                      {fileSystem.map((node) => (
                        <FileTreeNode
                          key={node.id}
                          node={node}
                          selectedFile={selectedFile}
                          onSelect={setSelectedFile}
                          onToggle={toggleFolder}
                          expanded={expandedFolders}
                          onUpdate={updateFileContent}
                          onDelete={deleteNode}
                          onCreateFile={createFile}
                          onCreateFolder={createFolder}
                          onMove={moveNode}
                          onCopy={copyNode}
                          onCut={handleCutNode}
                          onPaste={pasteNode}
                          contextMenu={contextMenu}
                          setContextMenu={setContextMenu}
                          copiedNode={copiedNode}
                          cutNodeState={cutNode}
                          draggedNode={draggedNode}
                          setDraggedNode={setDraggedNode}
                        />
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Code Editor */}
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle>Code Editor</CardTitle>
                      <Button onClick={runCode} disabled={isRunning} size="sm">
                        {isRunning ? 'Running...' : 'Run'}
                      </Button>
                    </div>
                    {selectedFile ? (
                      <textarea
                        value={selectedFile.content || ''}
                        onChange={(e) => {
                          setSelectedFile({ ...selectedFile, content: e.target.value });
                          updateFileContent(selectedFile.id, e.target.value);
                        }}
                        className="w-full h-96 font-mono text-sm p-4 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-gray-900 text-green-400 resize-none"
                        spellCheck={false}
                        placeholder="Write your code here..."
                      />
                    ) : (
                      <div className="w-full h-96 flex items-center justify-center text-[var(--joyedu-text-muted)]">
                        Select a file to edit
                      </div>
                    )}
                  </CardBody>
                </Card>

                {/* Preview */}
                <Card>
                  <CardBody>
                    <CardTitle>Preview</CardTitle>
                    <div className="w-full h-96 border border-[var(--joyedu-border-300)] rounded-lg overflow-auto">
                      {htmlPreview ? (
                        <iframe
                          key={htmlPreview}
                          srcDoc={htmlPreview}
                          className="w-full h-full"
                          title="React Preview"
                          sandbox="allow-scripts"
                        />
                      ) : (
                        <div className="w-full h-96 flex items-center justify-center text-[var(--joyedu-text-muted)]">
                          Preview will appear here
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle>Code Editor</CardTitle>
                      <div className="flex gap-2">
                        <Button onClick={resetCode} variant="outline" size="sm">Reset</Button>
                        <Button onClick={runCode} disabled={isRunning} size="sm">
                          {isRunning ? 'Running...' : 'Run Code'}
                        </Button>
                      </div>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-96 font-mono text-sm p-4 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-gray-900 text-green-400 resize-none"
                      spellCheck={false}
                      placeholder="Write your code here..."
                    />
                  </CardBody>
                </Card>

                {/* Output */}
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle>Output</CardTitle>
                      <Button onClick={clearOutput} variant="outline" size="sm">Clear</Button>
                    </div>
                    
                    {htmlPreview ? (
                      <div className="w-full h-96 border border-[var(--joyedu-border-300)] rounded-lg overflow-hidden">
                        <iframe
                          srcDoc={htmlPreview}
                          className="w-full h-full"
                          title="HTML Preview"
                          sandbox="allow-scripts"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-96 p-4 border border-[var(--joyedu-border-300)] rounded-lg bg-gray-900 text-white font-mono text-sm overflow-auto">
                        {output.length === 0 ? (
                          <div className="text-[var(--joyedu-text-muted)]">Output will appear here...</div>
                        ) : (
                          output.map((line, index) => (
                            <div key={index} className="mb-1">
                              <span className="text-[var(--joyedu-primary)]">{index + 1}:</span> {line}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Context Menu */}
            {contextMenu && (
              <div
                className="fixed bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-xl)] border border-[var(--joyedu-border-200)] py-2 z-50 min-w-40"
                style={{ left: contextMenu.x, top: contextMenu.y }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleMenuAction('rename', contextMenu.nodeId)}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--joyedu-bg-tertiary)] text-sm text-[var(--joyedu-text-primary)]"
                >
                  ✏️ Rename
                </button>
                <button
                  onClick={() => handleMenuAction('copy', contextMenu.nodeId)}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--joyedu-bg-tertiary)] text-sm text-[var(--joyedu-text-primary)]"
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => handleMenuAction('cut', contextMenu.nodeId)}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--joyedu-bg-tertiary)] text-sm text-[var(--joyedu-text-primary)]"
                >
                  ✂️ Cut
                </button>
                {(copiedNode || cutNode) && (
                  <button
                    onClick={() => handleMenuAction('paste', contextMenu.nodeId)}
                    className="w-full px-4 py-2 text-left hover:bg-[var(--joyedu-bg-tertiary)] text-sm text-[var(--joyedu-text-primary)]"
                  >
                    📌 Paste
                  </button>
                )}
                <hr className="my-2 border-[var(--joyedu-border-200)]" />
                <button
                  onClick={() => handleMenuAction('delete', contextMenu.nodeId)}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--joyedu-bg-tertiary)] text-sm text-[var(--joyedu-error)]"
                >
                  🗑️ Delete
                </button>
              </div>
            )}

            {/* New File Modal */}
            {showNewFileModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[var(--joyedu-surface-1)] rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--joyedu-text-primary)]">Create New File</h3>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="filename.jsx"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg mb-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Parent Folder</label>
                    <select
                      value={selectedParentFolder}
                      onChange={(e) => setSelectedParentFolder(e.target.value)}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    >
                      {fileSystem.map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => setShowNewFileModal(false)} variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      if (newFileName) {
                        createFile(selectedParentFolder, newFileName);
                        setNewFileName('');
                        setShowNewFileModal(false);
                      }
                    }}>Create</Button>
                  </div>
                </div>
              </div>
            )}

            {/* New Folder Modal */}
            {showNewFolderModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[var(--joyedu-surface-1)] rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--joyedu-text-primary)]">Create New Folder</h3>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="folder-name"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg mb-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => setShowNewFolderModal(false)} variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      if (newFolderName) {
                        createFolder(null, newFolderName);
                        setNewFolderName('');
                        setShowNewFolderModal(false);
                      }
                    }}>Create</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Rename Modal */}
            {showRenameModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[var(--joyedu-surface-1)] rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--joyedu-text-primary)]">Rename</h3>
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="new name"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg mb-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => {
                      setShowRenameModal(false);
                      setNodeToRename(null);
                      setRenameValue('');
                    }} variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      if (renameValue && nodeToRename) {
                        renameNode(nodeToRename, renameValue);
                        setShowRenameModal(false);
                        setNodeToRename(null);
                        setRenameValue('');
                      }
                    }}>Save</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <Card className="mt-6">
              <CardBody>
                <CardTitle>Features</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[var(--joyedu-primary-50)] rounded-lg">
                    <div className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">🚀 Real-time Execution</div>
                    <p className="text-sm text-[var(--joyedu-text-secondary)]">Run your code instantly and see the results</p>
                  </div>
                  <div className="p-4 bg-[var(--joyedu-success-50)] rounded-lg">
                    <div className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">📚 Multiple Languages</div>
                    <p className="text-sm text-[var(--joyedu-text-secondary)]">Support for JavaScript, Python, HTML/CSS, and TypeScript</p>
                  </div>
                  <div className="p-4 bg-[var(--joyedu-accent-50)] rounded-lg">
                    <div className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">🖼️ Live HTML Preview</div>
                    <p className="text-sm text-[var(--joyedu-text-secondary)]">HTML/CSS renders in a live preview pane</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// File Tree Node Component
function FileTreeNode({
  node,
  selectedFile,
  onSelect,
  onToggle,
  expanded,
  onUpdate,
  onDelete,
  onCreateFile,
  onCreateFolder,
  onMove,
  onCopy,
  onCut,
  onPaste,
  contextMenu,
  setContextMenu,
  copiedNode,
  cutNodeState,
  draggedNode,
  setDraggedNode,
  level = 0
}: {
  node: FileNode;
  selectedFile: FileNode | null;
  onSelect: (file: FileNode) => void;
  onToggle: (folderId: string) => void;
  expanded: Set<string>;
  onUpdate: (fileId: string, content: string) => void;
  onDelete: (nodeId: string) => void;
  onCreateFile: (parentId: string, name: string) => void;
  onCreateFolder: (parentId: string | null, name: string) => void;
  onMove: (nodeId: string, targetParentId: string | null) => void;
  onCopy: (node: FileNode) => void;
  onCut: (node: FileNode) => void;
  onPaste: (targetParentId: string | null) => void;
  contextMenu: { nodeId: string; x: number; y: number } | null;
  setContextMenu: (menu: { nodeId: string; x: number; y: number } | null) => void;
  copiedNode: FileNode | null;
  cutNodeState: FileNode | null;
  draggedNode: FileNode | null;
  setDraggedNode: (node: FileNode | null) => void;
  level?: number;
}) {
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedFile?.id === node.id;
  const isDragging = draggedNode?.id === node.id;
  const icon = node.type === 'folder' ? (isExpanded ? '📂' : '📁') : getFileIcon(node.name);
  const isCut = cutNodeState?.id === node.id;

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedNode(node);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNode && draggedNode.id !== node.id) {
      if (node.type === 'folder') {
        onMove(draggedNode.id, node.id);
      }
    }
    setDraggedNode(null);
  };

  const handleDragEnd = () => {
    setDraggedNode(null);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ nodeId: node.id, x: e.clientX, y: e.clientY });
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 group ${
          isSelected ? 'bg-blue-100' : ''
        } ${isDragging ? 'opacity-50' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        onContextMenu={handleRightClick}
        onClick={() => {
          if (node.type === 'folder') {
            onToggle(node.id);
          } else {
            onSelect(node);
          }
        }}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm flex-1">{node.name}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setContextMenu({ nodeId: node.id, x: e.clientX, y: e.clientY });
          }}
          className="text-gray-400 hover:text-gray-600 text-xs opacity-0 group-hover:opacity-100 font-bold"
        >
          ...
        </button>
      </div>
      
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              selectedFile={selectedFile}
              onSelect={onSelect}
              onToggle={onToggle}
              expanded={expanded}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onMove={onMove}
              onCopy={onCopy}
              onCut={onCut}
              onPaste={onPaste}
              contextMenu={contextMenu}
              setContextMenu={setContextMenu}
              copiedNode={copiedNode}
              cutNodeState={cutNodeState}
              draggedNode={draggedNode}
              setDraggedNode={setDraggedNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}