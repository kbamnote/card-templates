import React, { useState, useEffect } from 'react';

const StudentProjectForm = ({ onSave, initialData = [] }) => {
  const [projects, setProjects] = useState(initialData && initialData.length > 0 ? initialData : [{ title: '', desc: '', tech: '', link: '', category: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setProjects(initialData);
    }
  }, [initialData]);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          Add Project
        </button>
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., E-commerce Website"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
              <input
                type="text"
                value={project.tech}
                onChange={(e) => handleProjectChange(index, 'tech', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            <div className="md:col-span-12">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={project.desc}
                onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe the project and your contributions..."
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://project-link.com"
              />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <input
                type="text"
                value={project.category}
                onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Projects'}
        </button>
      </div>
    </form>
  );
};

export default StudentProjectForm;