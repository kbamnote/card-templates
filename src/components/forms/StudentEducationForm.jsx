import React, { useState, useEffect } from 'react';

const StudentEducationForm = ({ onSave, initialData = [] }) => {
  const [education, setEducation] = useState(initialData && initialData.length > 0 ? initialData : [{ degree: '', major: '', school: '', year: '', gpa: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setEducation(initialData);
    }
  }, [initialData]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', major: '', school: '', year: '', gpa: '' }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);
      setEducation(updatedEducation);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(education);
    } catch (error) {
      console.error('Error saving education:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          Add Education
        </button>
      </div>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Bachelor of Science"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Major</label>
              <input
                type="text"
                value={edu.major}
                onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">School *</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., University Name"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Years</label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 2020-2024"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
            <div className="md:col-span-12">
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Remove Education
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Education'}
        </button>
      </div>
    </form>
  );
};

export default StudentEducationForm;