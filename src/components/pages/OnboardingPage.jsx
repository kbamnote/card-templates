import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  profileCreate, 
  profileRead, 
  profileUpdate,
  uploadProfileImg, 
  uploadBannerImg,
  serviceCreate, 
  uploadGalleryImg, 
  uploadProductDetails 
} from '../../utils/Api';
import ProfileForm from '../forms/ProfileForm';
import ServicesForm from '../forms/ServicesForm';
import GalleryForm from '../forms/GalleryForm';
import ProductsForm from '../forms/ProductsForm';
import Cookies from 'js-cookie';
import logo from '../../assets/br-logo.png'

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
          // For clients, check name and profession
          const isCompleted = profile.name && profile.profession;
          if (isCompleted) {
            // User has completed onboarding, redirect to dashboard
            navigate('/dashboard');
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
    // Retry mechanism for image uploads
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('profileImg', file);
        
        const response = await uploadProfileImg(formData);
        if (response.data.success) {
          return response.data.data.profileImg;
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
        formData.append('bannerImg', file);
        
        const response = await uploadBannerImg(formData);
        if (response.data.success) {
          return response.data.data.bannerImg;
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
        formData.append('image', file);
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
      // The data is already a FormData object from ProductsForm, so we can send it directly
      const response = await uploadProductDetails(data);
      if (response.data.success) {
        setProductsData(prev => [...prev, response.data.data]);
        // Complete onboarding after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Product submission error:', err);
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.response?.status === 400) {
        setError('Please make sure all required fields are filled and a product image is selected.');
      } else {
        setError('Error saving product. Please try again.');
      }
    } finally {
      setLoading(false);
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
                      ? 'bg-green-600 text-white' 
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
              className="h-full bg-green-600 rounded-full transition-all duration-300"
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