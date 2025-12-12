import React, { useState, useEffect } from 'react';
import {
  studentProfileRead,
  studentProfileUpdate,
  uploadStudentProfilePic,
  uploadStudentBannerPic,
  studentSkillsRead,
  studentSkillCreate,
  studentSkillUpdate,
  studentSkillDelete,
  studentEducationsRead,
  studentEducationCreate,
  studentEducationUpdate,
  studentEducationDelete,
  studentExperiencesRead,
  studentExperienceCreate,
  studentExperienceUpdate,
  studentExperienceDelete,
  studentProjectsRead,
  studentProjectCreate,
  studentProjectUpdate,
  studentProjectDelete,
  studentAchievementsRead,
  studentAchievementCreate,
  studentAchievementUpdate,
  studentAchievementDelete
} from '../../utils/Api';
import StudentProfileModal from './StudentProfileModal';
import StudentSkillsModal from './StudentSkillsModal';
import StudentEducationModal from './StudentEducationModal';
import StudentExperienceModal from './StudentExperienceModal';
import StudentProjectsModal from './StudentProjectsModal';
import StudentAchievementsModal from './StudentAchievementsModal';

const StudentEditModal = ({ isOpen, onClose, modalType, itemData }) => {
  const [profileData, setProfileData] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);

  // Load profile data when modal opens
  useEffect(() => {
    if (isOpen) {
      switch (modalType) {
        case 'student-profile':
          loadProfileData();
          break;
        case 'student-skills':
          loadSkillsData();
          break;
        case 'student-education':
          loadEducationData();
          break;
        case 'student-experience':
          loadExperienceData();
          break;
        case 'student-projects':
          loadProjectsData();
          break;
        case 'student-achievements':
          loadAchievementsData();
          break;
        default:
          break;
      }
    }
  }, [isOpen, modalType]);

  const loadProfileData = async () => {
    try {
      const response = await studentProfileRead();
      setProfileData(response.data.data);
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const loadSkillsData = async () => {
    try {
      const response = await studentSkillsRead();
      setSkillsData(response.data.data || []);
    } catch (error) {
      console.error('Error loading skills data:', error);
    }
  };

  const loadEducationData = async () => {
    try {
      const response = await studentEducationsRead();
      setEducationData(response.data.data || []);
    } catch (error) {
      console.error('Error loading education data:', error);
    }
  };

  const loadExperienceData = async () => {
    try {
      const response = await studentExperiencesRead();
      setExperienceData(response.data.data || []);
    } catch (error) {
      console.error('Error loading experience data:', error);
    }
  };

  const loadProjectsData = async () => {
    try {
      const response = await studentProjectsRead();
      setProjectsData(response.data.data || []);
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  };

  const loadAchievementsData = async () => {
    try {
      const response = await studentAchievementsRead();
      setAchievementsData(response.data.data || []);
    } catch (error) {
      console.error('Error loading achievements data:', error);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      // Prepare profile data object (excluding image fields)
      const profileDataToSend = {
        fullName: profileData.fullName,
        email: profileData.email,
        about: profileData.about,
        phone1: profileData.phone1,
        phone2: profileData.phone2,
        location: profileData.location,
        dob: profileData.dob,
        templateId: profileData.templateId,
        // Add socialMedia object
        socialMedia: {
          facebook: profileData.facebook || '',
          instagram: profileData.instagram || '',
          twitter: profileData.twitter || '',
          linkedin: profileData.linkedin || '',
          youtube: profileData.youtube || '',
          github: profileData.github || ''
        }
      };
      
      // Remove empty fields (except socialMedia which is an object)
      Object.keys(profileDataToSend).forEach(key => {
        if (profileDataToSend[key] === '' && key !== 'socialMedia') {
          delete profileDataToSend[key];
        }
      });
      
      // Only update profile data if there are actual changes
      if (Object.keys(profileDataToSend).length > 0) {
        await studentProfileUpdate(profileDataToSend);
      }
      
      // Handle profile image update if provided
      if (profileData.profilePic && profileData.profilePic instanceof File) {
        const profilePicFormData = new FormData();
        profilePicFormData.append('profilePic', profileData.profilePic);
        try {
          await uploadStudentProfilePic(profilePicFormData);
        } catch (error) {
          console.error('Error uploading profile image:', error.response?.data || error.message);
          throw new Error(`Profile image upload failed: ${error.response?.data?.message || error.message}`);
        }
      } else if (profileData.profilePic) {
        console.warn('Profile image is not a File object:', profileData.profilePic);
      }
      
      // Handle banner image update if provided
      if (profileData.bannerPic && profileData.bannerPic instanceof File) {
        const bannerPicFormData = new FormData();
        bannerPicFormData.append('bannerPic', profileData.bannerPic);
        try {
          await uploadStudentBannerPic(bannerPicFormData);
        } catch (error) {
          console.error('Error uploading banner image:', error.response?.data || error.message);
          throw new Error(`Banner image upload failed: ${error.response?.data?.message || error.message}`);
        }
      } else if (profileData.bannerPic) {
        console.warn('Banner image is not a File object:', profileData.bannerPic);
      }
      
      onClose();
      // Reload the page to reflect template changes
      if (profileData.templateId) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const handleSaveSkills = async (skillsData) => {
    try {
      // For simplicity, we'll delete all existing skills and create new ones
      // In a production app, you might want to implement proper update/delete logic
      
      // First, get existing skills to delete them
      const existingSkills = await studentSkillsRead();
      if (existingSkills.data.success && existingSkills.data.data) {
        // Delete all existing skills
        for (const skill of existingSkills.data.data) {
          try {
            await studentSkillDelete(skill._id);
          } catch (error) {
            console.error('Error deleting skill:', error);
          }
        }
      }
      
      // Create new skills
      for (const skill of skillsData) {
        try {
          await studentSkillCreate(skill);
        } catch (error) {
          console.error('Error creating skill:', error);
        }
      }
      
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving skills data:', error);
    }
  };

  const handleSaveEducation = async (educationData) => {
    try {
      // For simplicity, we'll delete all existing education and create new ones
      // In a production app, you might want to implement proper update/delete logic
      
      // First, get existing education to delete them
      const existingEducation = await studentEducationsRead();
      if (existingEducation.data.success && existingEducation.data.data) {
        // Delete all existing education
        for (const edu of existingEducation.data.data) {
          try {
            await studentEducationDelete(edu._id);
          } catch (error) {
            console.error('Error deleting education:', error);
          }
        }
      }
      
      // Create new education
      for (const edu of educationData) {
        try {
          await studentEducationCreate(edu);
        } catch (error) {
          console.error('Error creating education:', error);
        }
      }
      
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving education data:', error);
    }
  };

  const handleSaveExperience = async (experienceData) => {
    try {
      // For simplicity, we'll delete all existing experience and create new ones
      // In a production app, you might want to implement proper update/delete logic
      
      // First, get existing experience to delete them
      const existingExperience = await studentExperiencesRead();
      if (existingExperience.data.success && existingExperience.data.data) {
        // Delete all existing experience
        for (const exp of existingExperience.data.data) {
          try {
            await studentExperienceDelete(exp._id);
          } catch (error) {
            console.error('Error deleting experience:', error);
          }
        }
      }
      
      // Create new experience
      for (const exp of experienceData) {
        try {
          await studentExperienceCreate(exp);
        } catch (error) {
          console.error('Error creating experience:', error);
        }
      }
      
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving experience data:', error);
    }
  };

  const handleSaveProjects = async (projectsData) => {
    try {
      // For simplicity, we'll delete all existing projects and create new ones
      // In a production app, you might want to implement proper update/delete logic
      
      // First, get existing projects to delete them
      const existingProjects = await studentProjectsRead();
      if (existingProjects.data.success && existingProjects.data.data) {
        // Delete all existing projects
        for (const project of existingProjects.data.data) {
          try {
            await studentProjectDelete(project._id);
          } catch (error) {
            console.error('Error deleting project:', error);
          }
        }
      }
      
      // Create new projects
      for (const project of projectsData) {
        try {
          await studentProjectCreate(project);
        } catch (error) {
          console.error('Error creating project:', error);
        }
      }
      
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving projects data:', error);
    }
  };

  const handleSaveAchievements = async (achievementsData) => {
    try {
      // For simplicity, we'll delete all existing achievements and create new ones
      // In a production app, you might want to implement proper update/delete logic
      
      // First, get existing achievements to delete them
      const existingAchievements = await studentAchievementsRead();
      if (existingAchievements.data.success && existingAchievements.data.data) {
        // Delete all existing achievements
        for (const achievement of existingAchievements.data.data) {
          try {
            await studentAchievementDelete(achievement._id);
          } catch (error) {
            console.error('Error deleting achievement:', error);
          }
        }
      }
      
      // Create new achievements
      for (const achievement of achievementsData) {
        try {
          await studentAchievementCreate(achievement);
        } catch (error) {
          console.error('Error creating achievement:', error);
        }
      }
      
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving achievements data:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <StudentProfileModal
        isOpen={isOpen && modalType === 'student-profile'}
        onClose={onClose}
        profileData={profileData}
        onSave={handleSaveProfile}
      />
      
      <StudentSkillsModal
        isOpen={isOpen && modalType === 'student-skills'}
        onClose={onClose}
        skillsData={skillsData}
        onSave={handleSaveSkills}
      />
      
      <StudentEducationModal
        isOpen={isOpen && modalType === 'student-education'}
        onClose={onClose}
        educationData={educationData}
        onSave={handleSaveEducation}
      />
      
      <StudentExperienceModal
        isOpen={isOpen && modalType === 'student-experience'}
        onClose={onClose}
        experienceData={experienceData}
        onSave={handleSaveExperience}
      />
      
      <StudentProjectsModal
        isOpen={isOpen && modalType === 'student-projects'}
        onClose={onClose}
        projectsData={projectsData}
        onSave={handleSaveProjects}
      />
      
      <StudentAchievementsModal
        isOpen={isOpen && modalType === 'student-achievements'}
        onClose={onClose}
        achievementsData={achievementsData}
        onSave={handleSaveAchievements}
      />
    </>
  );
};

export default StudentEditModal;