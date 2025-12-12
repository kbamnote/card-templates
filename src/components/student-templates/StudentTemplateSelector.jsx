import React from 'react';

const StudentTemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'template111', name: 'Student Base Template', thumbnail: 'student1' },
    { id: 'template112', name: 'Student Portfolio', thumbnail: 'student2' },
    { id: 'template113', name: 'Student Minimal', thumbnail: 'student3' },
    { id: 'template114', name: 'Student Creative', thumbnail: 'student4' },
    { id: 'template115', name: 'Student Dark', thumbnail: 'student5' }
  ];

  const handleTemplateSelect = (templateId) => {
    onTemplateChange(templateId);
  };

  return (
    <div className="template-selector">
      <h3 className="text-xl font-bold mb-4 text-gray-600">Choose Your Student Template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`border-2 rounded-lg p-3 transition-all cursor-pointer transform hover:scale-105 ${
              currentTemplate === template.id 
                ? 'border-blue-500 bg-blue-900 shadow-lg' 
                : 'border-gray-600 hover:border-gray-400 bg-zinc-800'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
              <span className="text-xs text-gray-400">{template.thumbnail}</span>
            </div>
            <p className="mt-2 text-center text-sm font-medium text-gray-200">{template.name}</p>
            <div className="mt-2">
              <button
                className={`w-full py-1 text-xs rounded ${
                  currentTemplate === template.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {currentTemplate === template.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          More student templates coming soon! Select a template to customize your digital card.
        </p>
      </div>
    </div>
  );
};

export default StudentTemplateSelector;