import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, User, GraduationCap, Briefcase, Code, Award } from 'lucide-react';

const StudentProfileForm = ({ onSubmit, onProfileImageUpload, onBannerImageUpload, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    about: '',
    phone1: '',
    phone2: '',
    location: '',
    dob: '',
    profilePic: '',
    bannerPic: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: '',
      github: ''
    },
    skills: [
      { name: '', level: 0 }
    ],
    projects: [
      { title: '', desc: '', tech: '', link: '' }
    ],
    education: [
      { degree: '', major: '', school: '', year: '', gpa: '' }
    ],
    experience: [
      { role: '', company: '', duration: '', desc: '', startDate: '', endDate: '' }
    ],
    interests: [''],
    achievements: [
      { title: '', desc: '', date: '' }
    ],
    ...initialData
  });

  const [profileImagePreview, setProfileImagePreview] = useState(initialData.profilePic || '');
  const [bannerImagePreview, setBannerImagePreview] = useState(initialData.bannerPic || '');

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        socialMedia: {
          ...prev.socialMedia,
          ...initialData.socialMedia
        },
        skills: initialData.skills && initialData.skills.length > 0 ? initialData.skills : [{ name: '', level: 0 }],
        projects: initialData.projects && initialData.projects.length > 0 ? initialData.projects : [{ title: '', desc: '', tech: '', link: '' }],
        education: initialData.education && initialData.education.length > 0 ? initialData.education : [{ degree: '', major: '', school: '', year: '', gpa: '' }],
        experience: initialData.experience && initialData.experience.length > 0 ? initialData.experience : [{ role: '', company: '', duration: '', desc: '', startDate: '', endDate: '' }],
        interests: initialData.interests && initialData.interests.length > 0 ? initialData.interests : [''],
        achievements: initialData.achievements && initialData.achievements.length > 0 ? initialData.achievements : [{ title: '', desc: '', date: '' }]
      }));
      setProfileImagePreview(initialData.profilePic || '');
      setBannerImagePreview(initialData.bannerPic || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleSkillsChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleProjectsChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const handleInterestsChange = (index, value) => {
    const updatedInterests = [...formData.interests];
    updatedInterests[index] = value;
    setFormData(prev => ({
      ...prev,
      interests: updatedInterests
    }));
  };

  const handleAchievementsChange = (index, field, value) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index][field] = value;
    setFormData(prev => ({
      ...prev,
      achievements: updatedAchievements
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 0 }]
    }));
  };

  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const updatedSkills = [...formData.skills];
      updatedSkills.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        skills: updatedSkills
      }));
    }
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', desc: '', tech: '', link: '' }]
    }));
  };

  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = [...formData.projects];
      updatedProjects.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        projects: updatedProjects
      }));
    }
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', major: '', school: '', year: '', gpa: '' }]
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        education: updatedEducation
      }));
    }
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { role: '', company: '', duration: '', desc: '', startDate: '', endDate: '' }]
    }));
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      const updatedExperience = [...formData.experience];
      updatedExperience.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        experience: updatedExperience
      }));
    }
  };

  const addInterest = () => {
    setFormData(prev => ({
      ...prev,
      interests: [...prev.interests, '']
    }));
  };

  const removeInterest = (index) => {
    if (formData.interests.length > 1) {
      const updatedInterests = [...formData.interests];
      updatedInterests.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        interests: updatedInterests
      }));
    }
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', desc: '', date: '' }]
    }));
  };

  const removeAchievement = (index) => {
    if (formData.achievements.length > 1) {
      const updatedAchievements = [...formData.achievements];
      updatedAchievements.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        achievements: updatedAchievements
      }));
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await onProfileImageUpload(file);
        setProfileImagePreview(imageUrl);
        setFormData(prev => ({
          ...prev,
          profilePic: imageUrl
        }));
      } catch (error) {
        console.error('Error uploading profile image:', error);
        alert('Error uploading profile image: ' + error.message);
      }
    }
  };

  const handleBannerImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await onBannerImageUpload(file);
        setBannerImagePreview(imageUrl);
        setFormData(prev => ({
          ...prev,
          bannerPic: imageUrl
        }));
      } catch (error) {
        console.error('Error uploading banner image:', error);
        alert('Error uploading banner image: ' + error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, formData.profilePic, formData.bannerPic);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="john@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone 1</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone 2</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+1 (555) 987-6543"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="City, Country"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Profile Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {profileImagePreview && (
                <img src={profileImagePreview} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              )}
              <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image</label>
            <div className="flex items-center space-x-4">
              {bannerImagePreview && (
                <img src={bannerImagePreview} alt="Banner" className="w-16 h-16 rounded object-cover" />
              )}
              <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Social Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(formData.socialMedia).map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{platform}</label>
              <input
                type="url"
                value={formData.socialMedia[platform]}
                onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={`https://${platform}.com/username`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Skills</h2>
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Add Skill
          </button>
        </div>
        <div className="space-y-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillsChange(index, 'name', e.target.value)}
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
                  onChange={(e) => handleSkillsChange(index, 'level', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{skill.level}%</div>
              </div>
              <div className="md:col-span-2">
                {formData.skills.length > 1 && (
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
      </div>

      {/* Education */}
      <div className="bg-gray-800 rounded-xl p-6">
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
          {formData.education.map((edu, index) => (
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
                {formData.education.length > 1 && (
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
      </div>

      {/* Experience */}
      <div className="bg-gray-800 rounded-xl p-6">
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
          {formData.experience.map((exp, index) => (
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
                {formData.experience.length > 1 && (
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
      </div>

      {/* Projects */}
      <div className="bg-gray-800 rounded-xl p-6">
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
          {formData.projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectsChange(index, 'title', e.target.value)}
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
                  onChange={(e) => handleProjectsChange(index, 'tech', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={project.desc}
                  onChange={(e) => handleProjectsChange(index, 'desc', e.target.value)}
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
                  onChange={(e) => handleProjectsChange(index, 'link', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://project-link.com"
                />
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={project.category}
                  onChange={(e) => handleProjectsChange(index, 'category', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Web Development"
                />
              </div>
              <div className="md:col-span-12">
                {formData.projects.length > 1 && (
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
      </div>

      {/* Interests */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Interests</h2>
          <button
            type="button"
            onClick={addInterest}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Add Interest
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.interests.map((interest, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={interest}
                onChange={(e) => handleInterestsChange(index, e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Photography"
              />
              {formData.interests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInterest(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Achievements</h2>
          <button
            type="button"
            onClick={addAchievement}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Add Achievement
          </button>
        </div>
        <div className="space-y-6">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Title *</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => handleAchievementsChange(index, 'title', e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Dean's List"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={achievement.date}
                  onChange={(e) => handleAchievementsChange(index, 'date', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={achievement.desc}
                  onChange={(e) => handleAchievementsChange(index, 'desc', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the achievement..."
                />
              </div>
              <div className="md:col-span-12">
                {formData.achievements.length > 1 && (
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default StudentProfileForm;