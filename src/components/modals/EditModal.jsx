import React, { useState, useEffect } from 'react';
import {
  profileRead,
  profileUpdate,
  updateBannerImg,
  updateProfileImg,
  serviceRead,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  galleryRead,
  uploadGalleryImg,
  galleryReadById,
  galleryDelete,
  productRead,
  uploadProductDetails,
  productReadById,
  updateProductDetails,
  productDelete,
  testimonialRead,
  testimonialCreate,
  testimonialUpdate,
  testimonialDelete
} from '../../utils/Api';
import ProfileModal from './ProfileModal';
import ServiceModal from './ServiceModal';
import GalleryModal from './GalleryModal';
import ProductModal from './ProductModal';
import TestimonialModal from './TestimonialModal';

const EditModal = ({ isOpen, onClose, modalType, itemData }) => {
  const [profileData, setProfileData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [testimonialData, setTestimonialData] = useState(null);

  // Load profile data when modal opens
  useEffect(() => {
    if (isOpen && modalType === 'profile') {
      loadProfileData();
    }
  }, [isOpen, modalType]);

  const loadProfileData = async () => {
    try {
      const response = await profileRead();
      setProfileData(response.data.data);
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      // Prepare profile data object (excluding image fields)
      const profileDataToSend = {
        name: profileData.name,
        profession: profileData.profession,
        about: profileData.about,
        phone1: profileData.phone1,
        phone2: profileData.phone2,
        location: profileData.location,
        dob: profileData.dob,
        websiteLink: profileData.websiteLink,
        appLink: profileData.appLink,
        templateId: profileData.templateId,
        // Add socialMedia object
        socialMedia: {
          facebook: profileData.facebook || '',
          instagram: profileData.instagram || '',
          twitter: profileData.twitter || '',
          linkedin: profileData.linkedin || '',
          youtube: profileData.youtube || '',
          whatsapp: profileData.whatsapp || ''
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
        await profileUpdate(profileDataToSend);
      }
      
      // Handle profile image update if provided
      if (profileData.profileImg && profileData.profileImg instanceof File) {
        const profileImgFormData = new FormData();
        profileImgFormData.append('profileImg', profileData.profileImg);
        // Log the form data for debugging
        for (let pair of profileImgFormData.entries()) {
          console.log('Profile image form data:', pair[0], pair[1]);
        }
        try {
          await updateProfileImg(profileImgFormData);
        } catch (error) {
          console.error('Error uploading profile image:', error.response?.data || error.message);
          throw new Error(`Profile image upload failed: ${error.response?.data?.message || error.message}`);
        }
      } else if (profileData.profileImg) {
        console.warn('Profile image is not a File object:', profileData.profileImg);
      }
      
      // Handle banner image update if provided
      if (profileData.bannerImg && profileData.bannerImg instanceof File) {
        const bannerImgFormData = new FormData();
        bannerImgFormData.append('bannerImg', profileData.bannerImg);
        // Log the form data for debugging
        for (let pair of bannerImgFormData.entries()) {
          console.log('Banner image form data:', pair[0], pair[1]);
        }
        try {
          await updateBannerImg(bannerImgFormData);
        } catch (error) {
          console.error('Error uploading banner image:', error.response?.data || error.message);
          throw new Error(`Banner image upload failed: ${error.response?.data?.message || error.message}`);
        }
      } else if (profileData.bannerImg) {
        console.warn('Banner image is not a File object:', profileData.bannerImg);
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

  const handleSaveService = async (serviceData, serviceId) => {
    try {
      if (serviceId) {
        // Update existing service
        await serviceUpdate(serviceId, serviceData);
      } else {
        // Create new service
        await serviceCreate(serviceData);
      }
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving service data:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await serviceDelete(serviceId);
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSaveGalleryItem = async (galleryData, galleryId) => {
    try {
      const formData = new FormData();
      formData.append('caption', galleryData.caption);
      if (galleryData.image) {
        formData.append('image', galleryData.image);
      }
      
      if (galleryId) {
        // For now, we'll delete and recreate since the API doesn't seem to have an update endpoint
        await galleryDelete(galleryId);
        await uploadGalleryImg(formData);
      } else {
        // Create new gallery item
        await uploadGalleryImg(formData);
      }
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving gallery data:', error);
    }
  };

  const handleDeleteGalleryItem = async (galleryId) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      await galleryDelete(galleryId);
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  const handleSaveProduct = async (productData, productId) => {
    try {
      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('price', productData.price);
      formData.append('details', productData.details);
      if (productData.productPhoto) {
        formData.append('productPhoto', productData.productPhoto);
      }
      
      if (productId) {
        // Update existing product
        await updateProductDetails(productId, formData);
      } else {
        // Create new product
        await uploadProductDetails(formData);
      }
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving product data:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productDelete(productId);
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveTestimonial = async (testimonialData, testimonialId) => {
    try {
      if (testimonialId) {
        // Update existing testimonial
        await testimonialUpdate(testimonialId, testimonialData);
      } else {
        // Create new testimonial
        await testimonialCreate(testimonialData);
      }
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving testimonial data:', error);
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await testimonialDelete(testimonialId);
      onClose();
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ProfileModal
        isOpen={isOpen && modalType === 'profile'}
        onClose={onClose}
        profileData={profileData}
        onSave={handleSaveProfile}
      />
      
      <ServiceModal
        isOpen={isOpen && modalType === 'services'}
        onClose={onClose}
        serviceData={itemData}
        onSave={handleSaveService}
        isEditing={!!itemData}
        onDelete={itemData ? () => handleDeleteService(itemData._id) : null}
      />
      
      <GalleryModal
        isOpen={isOpen && modalType === 'gallery'}
        onClose={onClose}
        galleryItem={itemData}
        onSave={handleSaveGalleryItem}
        isEditing={!!itemData}
        onDelete={itemData ? () => handleDeleteGalleryItem(itemData._id) : null}
      />
      
      <ProductModal
        isOpen={isOpen && modalType === 'products'}
        onClose={onClose}
        productData={itemData}
        onSave={handleSaveProduct}
        isEditing={!!itemData}
        onDelete={itemData ? () => handleDeleteProduct(itemData._id) : null}
      />
      
      <TestimonialModal
        isOpen={isOpen && modalType === 'testimonials'}
        onClose={onClose}
        testimonialData={itemData}
        onSave={handleSaveTestimonial}
        isEditing={!!itemData}
        onDelete={itemData ? () => handleDeleteTestimonial(itemData._id) : null}
      />
    </>
  );
};

export default EditModal;