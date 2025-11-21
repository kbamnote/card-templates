import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileRead, profileCreate, uploadProfileImg, uploadBannerImg, serviceCreate, uploadGalleryImg, uploadProductDetails } from '../../utils/Api';
import ProfileForm from '../forms/ProfileForm';
import ServicesForm from '../forms/ServicesForm';
import GalleryForm from '../forms/GalleryForm';
import ProductsForm from '../forms/ProductsForm';
import Cookies from 'js-cookie';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({});
  const [servicesData, setServicesData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user has completed onboarding
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
        const response = await profileRead();
        if (response.data.success) {
          const profile = response.data.data;
          
          // Check if essential fields are filled
          if (profile.name && profile.profession) {
            // User has completed onboarding, redirect to home
            navigate('/');
            return;
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
        ...(profileImageUrl && { profileImg: profileImageUrl }),
        ...(bannerImageUrl && { bannerImg: bannerImageUrl })
      };
      
      const response = await profileCreate(profileDataWithImages);
      if (response.data.success) {
        setProfileData(response.data.data);
        setCurrentStep(2);
      } else {
        setError(response.data.message || 'Failed to save profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await uploadProfileImg(formData);
      if (response.data.success) {
        return response.data.data.profileImg;
      }
      throw new Error(response.data.message || 'Error uploading profile image');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error uploading profile image');
    }
  };

  const handleBannerImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('bannerImage', file);
      const response = await uploadBannerImg(formData);
      if (response.data.success) {
        return response.data.data.bannerImg;
      }
      throw new Error(response.data.message || 'Error uploading banner image');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error uploading banner image');
    }
  };

  const handleServiceSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await serviceCreate(data);
      if (response.data.success) {
        setServicesData(prev => [...prev, response.data.data]);
        // Move to next step after a short delay
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);
      } else {
        setError(response.data.message || 'Failed to save service');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryImageUpload = async (files) => {
    try {
      setLoading(true);
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('galleryImage', file);
        return uploadGalleryImg(formData);
      });

      const responses = await Promise.all(uploadPromises);
      const newImages = responses.map(res => res.data.data);
      setGalleryData(prev => [...prev, ...newImages]);
      
      // Move to next step after a short delay
      setTimeout(() => {
        setCurrentStep(4);
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      const response = await uploadProductDetails(formData);
      if (response.data.success) {
        setProductsData(prev => [...prev, response.data.data]);
        // Complete onboarding after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to save product');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking onboarding status...</p>
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
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Elite Digital Cards</h1>
          <p className="text-gray-400">Complete your profile to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === step 
                      ? 'bg-indigo-600 text-white' 
                      : currentStep > step 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                <div className="text-sm text-gray-400">
                  {step === 1 && 'Profile'}
                  {step === 2 && 'Services'}
                  {step === 3 && 'Gallery'}
                  {step === 4 && 'Products'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {currentStep === 1 && (
            <ProfileForm 
              onSubmit={handleProfileSubmit}
              onProfileImageUpload={handleProfileImageUpload}
              onBannerImageUpload={handleBannerImageUpload}
              initialData={profileData}
              loading={loading}
            />
          )}

          {currentStep === 2 && (
            <ServicesForm 
              onSubmit={handleServiceSubmit}
              loading={loading}
            />
          )}

          {currentStep === 3 && (
            <GalleryForm 
              onSubmit={handleGalleryImageUpload}
              loading={loading}
            />
          )}

          {currentStep === 4 && (
            <ProductsForm 
              onSubmit={handleProductSubmit}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;