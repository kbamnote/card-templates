import React, { useState } from 'react';

const ProfileForm = ({ onSubmit, onProfileImageUpload, onBannerImageUpload, initialData, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    profession: initialData.profession || '',
    about: initialData.about || '',
    phone1: initialData.phone1 || '',
    phone2: initialData.phone2 || '',
    location: initialData.location || '',
    dob: initialData.dob || '',
    websiteLink: initialData.websiteLink || '',
    appLink: initialData.appLink || '',
    facebook: initialData.socialMedia?.facebook || '',
    instagram: initialData.socialMedia?.instagram || '',
    twitter: initialData.socialMedia?.twitter || '',
    linkedin: initialData.socialMedia?.linkedin || '',
    youtube: initialData.socialMedia?.youtube || '',
    whatsapp: initialData.socialMedia?.whatsapp || ''
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(initialData.profileImg || null);
  const [bannerImagePreview, setBannerImagePreview] = useState(initialData.bannerImg || null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!formData.name || !formData.profession) {
      setError('Name and Profession are required');
      return;
    }
    
    try {
      // Upload images first if they exist
      let profileImageUrl = null;
      let bannerImageUrl = null;
      
      if (profileImage) {
        profileImageUrl = await onProfileImageUpload(profileImage);
      }
      
      if (bannerImage) {
        bannerImageUrl = await onBannerImageUpload(bannerImage);
      }
      
      // Submit profile data with image URLs
      const profileData = {
        name: formData.name,
        profession: formData.profession,
        about: formData.about,
        phone1: formData.phone1,
        phone2: formData.phone2,
        location: formData.location,
        dob: formData.dob,
        websiteLink: formData.websiteLink,
        appLink: formData.appLink,
        socialMedia: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          whatsapp: formData.whatsapp
        }
      };
      
      await onSubmit(profileData, profileImageUrl, bannerImageUrl);
    } catch (err) {
      setError(err.message || 'Error submitting profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image Upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
          <div className="flex items-center space-x-6">
            {profileImagePreview && (
              <div className="flex-shrink-0">
                <img 
                  className="h-16 w-16 rounded-full object-cover" 
                  src={profileImagePreview} 
                  alt="Profile preview" 
                />
              </div>
            )}
            <div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-600 file:text-white
                    hover:file:bg-indigo-700"
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Banner Image Upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image</label>
          <div className="flex items-center space-x-6">
            {bannerImagePreview && (
              <div className="flex-shrink-0">
                <img 
                  className="h-16 w-32 object-cover rounded" 
                  src={bannerImagePreview} 
                  alt="Banner preview" 
                />
              </div>
            )}
            <div>
              <label className="block">
                <span className="sr-only">Choose banner image</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-600 file:text-white
                    hover:file:bg-indigo-700"
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
          />
        </div>
        
        {/* Profession */}
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-1">
            Profession *
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your profession"
          />
        </div>
        
        {/* About */}
        <div className="md:col-span-2">
          <label htmlFor="about" className="block text-sm font-medium text-gray-300 mb-1">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about yourself"
          />
        </div>
        
        {/* Phone Numbers */}
        <div>
          <label htmlFor="phone1" className="block text-sm font-medium text-gray-300 mb-1">
            Primary Phone
          </label>
          <input
            type="tel"
            id="phone1"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter primary phone number"
          />
        </div>
        
        <div>
          <label htmlFor="phone2" className="block text-sm font-medium text-gray-300 mb-1">
            Secondary Phone
          </label>
          <input
            type="tel"
            id="phone2"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter secondary phone number"
          />
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your location"
          />
        </div>
        
        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        {/* Website Link */}
        <div>
          <label htmlFor="websiteLink" className="block text-sm font-medium text-gray-300 mb-1">
            Website
          </label>
          <input
            type="url"
            id="websiteLink"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://yourwebsite.com"
          />
        </div>
        
        {/* App Link */}
        <div>
          <label htmlFor="appLink" className="block text-sm font-medium text-gray-300 mb-1">
            App Link
          </label>
          <input
            type="url"
            id="appLink"
            name="appLink"
            value={formData.appLink}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://yourapp.com"
          />
        </div>
      </div>
      
      {/* Social Media Links */}
      <div className="border-t border-gray-700 pt-6 mt-6">
        <h3 className="text-lg font-medium text-white mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-300 mb-1">
              Facebook
            </label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://facebook.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://instagram.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
              Twitter
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <label htmlFor="youtube" className="block text-sm font-medium text-gray-300 mb-1">
              YouTube
            </label>
            <input
              type="url"
              id="youtube"
              name="youtube"
              value={formData.youtube}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://youtube.com/channel"
            />
          </div>
          
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
              WhatsApp
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+1234567890"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;