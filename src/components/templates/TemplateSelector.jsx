import React from 'react';

const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'template1', name: 'CEO Executive', thumbnail: 'ceo' },
    { id: 'template2', name: 'Developer', thumbnail: 'developer' },
    { id: 'template3', name: 'Doctor', thumbnail: 'doctor' },
    { id: 'template4', name: 'Event Manager', thumbnail: 'event' },
    { id: 'template5', name: 'Hair Dresser', thumbnail: 'hair' },
    { id: 'template6', name: 'Handyman', thumbnail: 'handyman' },
    { id: 'template7', name: 'Interior Design', thumbnail: 'interior' },
    { id: 'template8', name: 'Lawyer', thumbnail: 'lawyer' },
    { id: 'template9', name: 'Music Portfolio', thumbnail: 'music' },
    { id: 'template10', name: 'Taxi Service', thumbnail: 'taxi' },
    { id: 'template11', name: 'UI Designer', thumbnail: 'ui' }
  ];

  return (
    <div className="template-selector">
      <h3 className="text-xl font-semibold mb-4">Choose Your Template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`border-2 rounded-lg p-3 transition-all ${
              currentTemplate === template.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <p className="mt-2 text-center text-sm font-medium">{template.name}</p>
            <div className="mt-2">
              <button
                onClick={() => onTemplateChange(template.id)}
                className={`w-full py-1 text-xs rounded ${
                  currentTemplate === template.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {currentTemplate === template.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;