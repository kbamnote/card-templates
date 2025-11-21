import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { profileReadPublic, serviceReadPublic, galleryReadPublic, productReadPublic, testimonialReadPublic, apponitmentReadPublic } from '../../utils/Api';
import TemplateRenderer from '../templates/TemplateRenderer';

const PublicProfileView = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [profileResponse, servicesResponse, galleryResponse, productsResponse, testimonialsResponse] = await Promise.all([
          profileReadPublic(userId),
          serviceReadPublic(userId),
          galleryReadPublic(userId),
          productReadPublic(userId),
          testimonialReadPublic(userId)
        ]);

        // Process profile data
        if (profileResponse.data.success) {
          const profile = profileResponse.data.data;
          setProfileData({
            name: profile.name || '',
            profession: profile.profession || '',
            about: profile.about || '',
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
        setError('Error fetching data: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-200 font-medium">No profile data found</div>
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
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <TemplateRenderer 
            templateId={profileData.templateId} 
            profileData={templateData} 
          />
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;