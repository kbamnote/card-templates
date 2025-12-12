import React, { useState, useEffect } from 'react';

const StudentSkillsModal = ({ isOpen, onClose, skillsData, onSave }) => {
  const [skills, setSkills] = useState(skillsData && skillsData.length > 0 ? skillsData : [{ name: '', level: 0 }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skillsData && skillsData.length > 0) {
      setSkills(skillsData);
    } else {
      setSkills([{ name: '', level: 0 }]);
    }
  }, [skillsData]);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '', level: 0 }]);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(skills);
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Error saving skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">Manage Skills</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {skills.map((skill, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-gray-800 rounded-lg">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency Level</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-right text-sm text-gray-400">{skill.level}%</div>
                  </div>
                  <div className="md:col-span-2">
                    {skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Skill
              </button>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Skills'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSkillsModal;