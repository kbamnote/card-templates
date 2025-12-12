import React, { useState, useEffect } from 'react';

const StudentAchievementsModal = ({ isOpen, onClose, achievementsData, onSave }) => {
  const [achievements, setAchievements] = useState(achievementsData && achievementsData.length > 0 ? achievementsData : [{ title: '', desc: '', date: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (achievementsData && achievementsData.length > 0) {
      setAchievements(achievementsData);
    } else {
      setAchievements([{ title: '', desc: '', date: '' }]);
    }
  }, [achievementsData]);

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index][field] = value;
    setAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: '', desc: '', date: '' }]);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      const updatedAchievements = [...achievements];
      updatedAchievements.splice(index, 1);
      setAchievements(updatedAchievements);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(achievements);
    } catch (error) {
      console.error('Error saving achievements:', error);
      alert('Error saving achievements: ' + error.message);
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
            <h2 className="text-2xl font-bold text-gray-100">Manage Achievements</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 mb-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-800 rounded-lg">
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Title *</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Dean's List"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="md:col-span-12">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={achievement.desc}
                      onChange={(e) => handleAchievementChange(index, 'desc', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe the achievement..."
                    />
                  </div>
                  <div className="md:col-span-12">
                    {achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Remove Achievement
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={addAchievement}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Achievement
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
                {loading ? 'Saving...' : 'Save Achievements'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAchievementsModal;