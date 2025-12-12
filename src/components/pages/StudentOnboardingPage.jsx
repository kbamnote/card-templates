import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  studentProfileCreate, 
  studentProfileRead, 
  studentProfileUpdate,
  uploadStudentProfilePic, 
  uploadStudentBannerPic
} from '../../utils/Api';
import StudentProfileForm from '../forms/StudentProfileForm';
import Cookies from 'js-cookie';
import logo from '../../assets/br-logo.png'

const StudentOnboardingPage = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if student has completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Check if user is logged in
      const token = Cookies.get('card-token');
      if (!token) {
        // If not logged in, redirect to login
        navigate('/login');
        return;
      }

      try {
        const response = await studentProfileRead();
        if (response.data.success) {
          const profile = response.data.data;
          
          // Check if essential fields are filled (fullName and email)
          if (profile.fullName && profile.email) {
            // Student has completed onboarding, redirect to landing page
            navigate('/');
            return;
          } else {
            // Load existing partial profile data
            setProfileData(profile);
          }
        }
        // If profile doesn't exist or is incomplete, continue with onboarding
        setLoading(false);
      } catch (err) {
        // If it's a 404 error, that's expected for new users without profiles
        if (err.response && err.response.status === 404) {
          setLoading(false);
        } else {
          setError('Error checking onboarding status: ' + (err.response?.data?.message || err.message));
          setLoading(false);
        }
      }
    };

    checkOnboardingStatus();
  }, [navigate]);

  const handleProfileSubmit = async (data, profileImageUrl, bannerImageUrl) => {
    try {
      setLoading(true);
      // Include image URLs in the profile data if they exist
      const profileDataWithImages = {
        ...data,
        ...(profileImageUrl && { profilePic: profileImageUrl }),
        ...(bannerImageUrl && { bannerPic: bannerImageUrl })
      };
      
      // Check if profile already exists
      try {
        const readResponse = await studentProfileRead();
        if (readResponse.data.success) {
          // Profile exists, update it
          const updateResponse = await studentProfileUpdate(profileDataWithImages);
          if (updateResponse.data.success) {
            // Successfully updated, redirect to landing page
            navigate('/student');
          } else {
            setError(updateResponse.data.message || 'Failed to update profile');
          }
        }
      } catch (readErr) {
        // Profile doesn't exist, create it
        if (readErr.response && readErr.response.status === 404) {
          const createResponse = await studentProfileCreate(profileDataWithImages);
          if (createResponse.data.success) {
            // Successfully created, redirect to landing page
            navigate('/student');
          } else {
            setError(createResponse.data.message || 'Failed to create profile');
          }
        } else {
          setError(readErr.response?.data?.message || 'Error checking profile status');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (file) => {
    // Retry mechanism for image uploads
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('profilePic', file);
        
        const response = await uploadStudentProfilePic(formData);
        if (response.data.success) {
          return response.data.data.profilePic;
        }
        throw new Error(response.data.message || 'Error uploading profile image');
      } catch (err) {
        console.error(`Profile image upload attempt ${attempt} failed:`, err);
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          if (err.response?.data?.message) {
            throw new Error(`Profile image upload failed: ${err.response.data.message}`);
          } else if (err.response?.status) {
            throw new Error(`Profile image upload failed with status ${err.response.status}`);
          } else {
            throw new Error('Error uploading profile image. Please try again.');
          }
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  };

  const handleBannerImageUpload = async (file) => {
    // Retry mechanism for image uploads
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('bannerPic', file);
        
        const response = await uploadStudentBannerPic(formData);
        if (response.data.success) {
          return response.data.data.bannerPic;
        }
        throw new Error(response.data.message || 'Error uploading banner image');
      } catch (err) {
        console.error(`Banner image upload attempt ${attempt} failed:`, err);
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          if (err.response?.data?.message) {
            throw new Error(`Banner image upload failed: ${err.response.data.message}`);
          } else if (err.response?.status) {
            throw new Error(`Banner image upload failed with status ${err.response.status}`);
          } else {
            throw new Error('Error uploading banner image. Please try again.');
          }
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
            <img src={logo} alt="Loading" className="h-8 w-8 absolute inset-0 m-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-300 font-medium">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Student Profile Setup</h1>
          <p className="text-gray-400">Complete your student profile to get started</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <StudentProfileForm 
            onSubmit={handleProfileSubmit}
            onProfileImageUpload={handleProfileImageUpload}
            onBannerImageUpload={handleBannerImageUpload}
            initialData={profileData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentOnboardingPage;