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
    { id: 'template11', name: 'UI Designer', thumbnail: 'ui' },
    { id: 'template12', name: 'Photographer', thumbnail: 'photo' },
    { id: 'template13', name: 'Restaurant', thumbnail: 'rest' },
    { id: 'template14', name: 'Fitness Trainer', thumbnail: 'fit' },
    { id: 'template15', name: 'Real Estate Agent', thumbnail: 'real' },
    { id: 'template20', name: 'Fashion Boutique', thumbnail: 'fashion' },
    { id: 'template21', name: 'Tech Consultant', thumbnail: 'techcon' },
    { id: 'template22', name: 'Wellness Coach', thumbnail: 'wellness' },
    { id: 'template23', name: 'Creative Studio', thumbnail: 'studio' }
  ];

  const handleTemplateSelect = (templateId) => {
    onTemplateChange(templateId);
  };

  return (
    <div className="template-selector">
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
          Click on any template to select it. The page will automatically refresh with your new template.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;