import React, { useState, useEffect } from 'react';

const StudentProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    about: '',
    phone1: '',
    phone2: '',
    location: '',
    dob: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    github: '',
    profilePic: null,
    bannerPic: null,
    templateId: 'template111'
  });
  const [loading, setLoading] = useState(false);
  const [previewProfileImage, setPreviewProfileImage] = useState('');
  const [previewBannerImage, setPreviewBannerImage] = useState('');

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullName: profileData.fullName || '',
        email: profileData.email || '',
        about: profileData.about || '',
        phone1: profileData.phone1 || '',
        phone2: profileData.phone2 || '',
        location: profileData.location || '',
        dob: profileData.dob ? profileData.dob.split('T')[0] : '',
        facebook: profileData.socialMedia?.facebook || '',
        instagram: profileData.socialMedia?.instagram || '',
        twitter: profileData.socialMedia?.twitter || '',
        linkedin: profileData.socialMedia?.linkedin || '',
        youtube: profileData.socialMedia?.youtube || '',
        github: profileData.socialMedia?.github || '',
        profilePic: profileData.profilePic || null,
        bannerPic: profileData.bannerPic || null,
        templateId: profileData.templateId || 'template111'
      });
      
      // Set preview images if they exist
      if (profileData.profilePic) {
        setPreviewProfileImage(profileData.profilePic);
      }
      if (profileData.bannerPic) {
        setPreviewBannerImage(profileData.bannerPic);
      }
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (name === 'profilePic') {
          setPreviewProfileImage(e.target.result);
        } else if (name === 'bannerPic') {
          setPreviewBannerImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile: ' + error.message);
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
            <h2 className="text-2xl font-bold text-gray-100">Edit Student Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone 1</label>
                <input
                  type="tel"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone 2</label>
                <input
                  type="tel"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://facebook.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                  <input
                    type="url"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://youtube.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  {previewProfileImage && (
                    <img 
                      src={previewProfileImage} 
                      alt="Profile Preview" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
                    Choose File
                    <input
                      type="file"
                      name="profilePic"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image</label>
                <div className="flex items-center space-x-4">
                  {previewBannerImage && (
                    <img 
                      src={previewBannerImage} 
                      alt="Banner Preview" 
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                  <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
                    Choose File
                    <input
                      type="file"
                      name="bannerPic"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Template</label>
              <select
                name="templateId"
                value={formData.templateId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="template111">Student Template 1</option>
                <option value="template112">Student Template 2</option>
                <option value="template113">Student Template 3</option>
              </select>
            </div>
            
            {/* Action Buttons */}
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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;