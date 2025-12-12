import React, { useState, useEffect } from 'react';

const StudentProjectsModal = ({ isOpen, onClose, projectsData, onSave }) => {
  const [projects, setProjects] = useState(projectsData && projectsData.length > 0 ? projectsData : [{ title: '', desc: '', tech: '', link: '', category: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      setProjects(projectsData);
    } else {
      setProjects([{ title: '', desc: '', tech: '', link: '', category: '' }]);
    }
  }, [projectsData]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', desc: '', tech: '', link: '', category: '' }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(projects);
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Error saving projects: ' + error.message);
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
            <h2 className="text-2xl font-bold text-gray-100">Manage Projects</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 mb-6">
              {projects.map((project, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-800 rounded-lg">
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., E-commerce Website"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
                    <input
                      type="text"
                      value={project.tech}
                      onChange={(e) => handleProjectChange(index, 'tech', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="md:col-span-12">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={project.desc}
                      onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe the project and your contributions..."
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Link</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="https://project-link.com"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input
                      type="text"
                      value={project.category}
                      onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Web Development"
                    />
                  </div>
                  <div className="md:col-span-12">
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Remove Project
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={addProject}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Project
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
                {loading ? 'Saving...' : 'Save Projects'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectsModal;