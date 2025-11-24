import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateRenderer from '../templates/TemplateRenderer';
import logo from '../../assets/br-logo.png'
import { profileRead, serviceRead, galleryRead, productRead, testimonialRead } from '../../utils/Api';

const LandingPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [profileResponse, servicesResponse, galleryResponse, productsResponse, testimonialsResponse] = await Promise.all([
        profileRead(),
        serviceRead(),
        galleryRead(),
        productRead(),
        testimonialRead()
      ]);

      // Process profile data
      if (profileResponse.data.success) {
        const profile = profileResponse.data.data;
        
        // Check if essential fields are filled
        if (!profile.name || !profile.profession) {
          // Redirect to onboarding if essential fields are missing
          navigate('/onboarding');
          return;
        }
        
        setProfileData({
          name: profile.name || '',
          profession: profile.profession || '',
          about: profile.about || '',
          email: profile.userId?.email || '',
          phone1: profile.phone1 || '',
          phone2: profile.phone2 || '',
          location: profile.location || '',
          dob: profile.dob || '',
          websiteLink: profile.websiteLink || '',
          appLink: profile.appLink || '',
          socialMedia: {
            facebook: profile.socialMedia?.facebook || '',
            instagram: profile.socialMedia?.instagram || '',
            twitter: profile.socialMedia?.twitter || '',
            linkedin: profile.socialMedia?.linkedin || '',
            youtube: profile.socialMedia?.youtube || '',
            whatsapp: profile.socialMedia?.whatsapp || ''
          },
          profileImg: profile.profileImg || '',
          bannerImg: profile.bannerImg || '',
          templateId: profile.templateId || 'template1'
        });
      } else {
        setError('Failed to fetch profile data');
        // Redirect to onboarding if no profile data
        navigate('/onboarding');
        return;
      }

      // Process services data
      if (servicesResponse.data.success) {
        setServicesData(servicesResponse.data.data || []);
      }

      // Process gallery data - transform to match template expectations
      if (galleryResponse.data.success) {
        const transformedGallery = (galleryResponse.data.data || []).map(item => ({
          src: item.imageUrl || '',
          fallback: 'https://picsum.photos/seed/gallery/800/600'
        }));
        setGalleryData(transformedGallery);
      }

      // Process products data - transform to match template expectations
      if (productsResponse.data.success) {
        const transformedProducts = (productsResponse.data.data || []).map(item => ({
          name: item.productName || '',
          price: item.price ? `$${item.price.toFixed(2)}` : '',
          img: {
            src: item.productPhoto || '',
            fallback: 'https://picsum.photos/seed/product/800/600'
          },
          details: item.details || ''
        }));
        setProductsData(transformedProducts);
      }

      // Process testimonials data
      if (testimonialsResponse.data.success) {
        setTestimonialsData(testimonialsResponse.data.data || []);
      }
    } catch (err) {
      // If it's a 404 error, redirect to onboarding as the user doesn't have a profile yet
      if (err.response && err.response.status === 404) {
        navigate('/onboarding');
      } else {
        setError('Error fetching data: ' + (err.response?.data?.message || err.message));
        // Redirect to onboarding if there's an error fetching data
        navigate('/onboarding');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (templateId) => {
    console.log('Template selected:', templateId);
    setProfileData(prev => ({
      ...prev,
      templateId
    }));
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
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-200 font-medium">No profile data found</div>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Combine all data for templates
  const templateData = {
    ...profileData,
    services: servicesData,
    gallery: galleryData,
    products: productsData,
    testimonials: testimonialsData
  };

  return (
    <div className="min-h-screen bg-zinc-900 md:py-6">
      <div className="md:max-w-6xl md:mx-auto md:px-6 lg:px-8">
        
        {/* Template Preview */}
        <div className="bg-white overflow-hidden mb-4">
          <TemplateRenderer 
            templateId={profileData.templateId} 
            profileData={templateData} 
          />
        </div>
        
        
      </div>
    </div>
  );
};

export default LandingPage;