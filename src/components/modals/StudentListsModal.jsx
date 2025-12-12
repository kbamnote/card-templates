import React, { useState } from 'react';
import { 
  studentSkillDelete, 
  studentEducationDelete, 
  studentExperienceDelete, 
  studentProjectDelete, 
  studentAchievementDelete 
} from '../../utils/Api';
import DeleteConfirmModal from './DeleteConfirmModal';

const StudentListsModal = ({ isOpen, onClose, skills, educations, experiences, projects, achievements, onEdit, onRefresh }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: '', id: '', name: '' });

  if (!isOpen) return null;

  const openDeleteModal = (type, id, name) => {
    setDeleteItem({ type, id, name });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteItem({ type: '', id: '', name: '' });
  };

  const handleDelete = async () => {
    try {
      switch (deleteItem.type) {
        case 'skill':
          await studentSkillDelete(deleteItem.id);
          break;
        case 'education':
          await studentEducationDelete(deleteItem.id);
          break;
        case 'experience':
          await studentExperienceDelete(deleteItem.id);
          break;
        case 'project':
          await studentProjectDelete(deleteItem.id);
          break;
        case 'achievement':
          await studentAchievementDelete(deleteItem.id);
          break;
        default:
          return;
      }
      
      // Refresh the data after successful deletion
      if (onRefresh) {
        await onRefresh();
      }
      
      closeDeleteModal();
    } catch (error) {
      console.error(`Error deleting ${deleteItem.type}:`, error);
      alert(`Error deleting ${deleteItem.type}. Please try again.`);
      closeDeleteModal();
    }
  };

  const handleEdit = (type, item) => {
    // Close the ListsModal when opening edit modal
    onClose();
    // Open the edit modal
    onEdit(type, item);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">Manage Your Items</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Skills List */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Skills</h3>
                {skills && skills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skills.map(skill => (
                      <div key={skill._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-100 font-medium truncate">{skill.name}</h4>
                          <p className="text-gray-400 text-sm">Level: {skill.level}%</p>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button 
                            onClick={() => handleEdit('student-skills', skill)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal('skill', skill._id, skill.name)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No skills added yet</p>
                )}
              </div>
              
              {/* Education List */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Education</h3>
                {educations && educations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {educations.map(edu => (
                      <div key={edu._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-100 font-medium truncate">{edu.degree}</h4>
                          <p className="text-gray-400 text-sm truncate">{edu.school}</p>
                          <p className="text-gray-400 text-sm">{edu.year}</p>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button 
                            onClick={() => handleEdit('student-education', edu)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal('education', edu._id, edu.degree)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No education entries added yet</p>
                )}
              </div>
              
              {/* Experience List */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Experience</h3>
                {experiences && experiences.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {experiences.map(exp => (
                      <div key={exp._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-100 font-medium truncate">{exp.position}</h4>
                          <p className="text-gray-400 text-sm truncate">{exp.company}</p>
                          <p className="text-gray-400 text-sm">{exp.duration}</p>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button 
                            onClick={() => handleEdit('student-experience', exp)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal('experience', exp._id, exp.position)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No experience entries added yet</p>
                )}
              </div>
              
              {/* Projects List */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Projects</h3>
                {projects && projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projects.map(project => (
                      <div key={project._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-100 font-medium truncate">{project.title}</h4>
                          <p className="text-gray-400 text-sm truncate">{project.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button 
                            onClick={() => handleEdit('student-projects', project)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal('project', project._id, project.title)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No projects added yet</p>
                )}
              </div>
              
              {/* Achievements List */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Achievements</h3>
                {achievements && achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {achievements.map(ach => (
                      <div key={ach._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-100 font-medium truncate">{ach.title}</h4>
                          <p className="text-gray-400 text-sm truncate">{ach.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button 
                            onClick={() => handleEdit('student-achievements', ach)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal('achievement', ach._id, ach.title)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No achievements added yet</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemType={deleteItem.name || deleteItem.type}
      />
    </>
  );
};

export default StudentListsModal;