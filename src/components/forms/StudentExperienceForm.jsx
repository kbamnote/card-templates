import React, { useState, useEffect } from 'react';

const StudentExperienceForm = ({ onSave, initialData = [] }) => {
  const [experience, setExperience] = useState(initialData && initialData.length > 0 ? initialData : [{ role: '', company: '', duration: '', desc: '', startDate: '', endDate: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setExperience(initialData);
    }
  }, [initialData]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([...experience, { role: '', company: '', duration: '', desc: '', startDate: '', endDate: '' }]);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      const updatedExperience = [...experience];
      updatedExperience.splice(index, 1);
      setExperience(updatedExperience);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(experience);
    } catch (error) {
      console.error('Error saving experience:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Work Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          Add Experience
        </button>
      </div>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Company Name"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Jan 2022 - Present"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Start & End Date</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="md:col-span-12">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={exp.desc}
                onChange={(e) => handleExperienceChange(index, 'desc', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
            <div className="md:col-span-12">
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Remove Experience
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
          {loading ? 'Saving...' : 'Save Experience'}
        </button>
      </div>
    </form>
  );
};

export default StudentExperienceForm;