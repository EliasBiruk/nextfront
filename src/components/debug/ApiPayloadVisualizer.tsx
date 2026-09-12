'use client';

import { useState } from 'react';

interface ApiPayloadVisualizerProps {
  request?: any;
  response?: any;
  error?: any;
  title?: string;
}

export default function ApiPayloadVisualizer({ 
  request, 
  response, 
  error, 
  title = 'API Payload' 
}: ApiPayloadVisualizerProps) {
  const [activeTab, setActiveTab] = useState<'request' | 'response' | 'error'>('request');
  const [isExpanded, setIsExpanded] = useState(false);

  if (!request && !response && !error) {
    return null;
  }

  const hasRequest = request !== undefined && request !== null;
  const hasResponse = response !== undefined && response !== null;
  const hasError = error !== undefined && error !== null;

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
      <div 
        className="bg-gray-100 px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium text-sm">{title}</span>
        <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="bg-gray-50">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-300">
            {hasRequest && (
              <button
                onClick={() => setActiveTab('request')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'request' 
                    ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Request
              </button>
            )}
            {hasResponse && (
              <button
                onClick={() => setActiveTab('response')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'response' 
                    ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Response
              </button>
            )}
            {hasError && (
              <button
                onClick={() => setActiveTab('error')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'error' 
                    ? 'bg-white border-b-2 border-red-500 text-red-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Error
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'request' && hasRequest && (
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                {formatJson(request)}
              </pre>
            )}
            {activeTab === 'response' && hasResponse && (
              <pre className="text-xs bg-gray-900 text-blue-400 p-4 rounded overflow-x-auto">
                {formatJson(response)}
              </pre>
            )}
            {activeTab === 'error' && hasError && (
              <pre className="text-xs bg-red-900 text-red-100 p-4 rounded overflow-x-auto">
                {formatJson(error)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
