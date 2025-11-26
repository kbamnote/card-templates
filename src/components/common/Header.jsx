import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, Palette } from 'lucide-react';
import Logo from '../../assets/br-logo.png';
import EditModal from '../modals/EditModal';
import ListsModal from '../modals/ListsModal';
import TemplateSelector from '../templates/TemplateSelector';
import { profileRead, profileUpdate, serviceRead, galleryRead, productRead, testimonialRead } from '../../utils/Api';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState('');
  const [itemData, setItemData] = useState(null);
  const [services, setServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState('template1');
  const dropdownRef = useRef(null);

  // Check if user is authenticated
  const isAuthenticated = !!Cookies.get("card-token");

  // Template options with descriptive names
  const templateOptions = [
    { id: 'template1', name: 'CEO Executive' },
    { id: 'template2', name: 'Developer' },
    { id: 'template3', name: 'Doctor' },
    { id: 'template4', name: 'Event Manager' },
    { id: 'template5', name: 'Hair Dresser' },
    { id: 'template6', name: 'Handyman' },
    { id: 'template7', name: 'Interior Design' },
    { id: 'template8', name: 'Lawyer' },
    { id: 'template9', name: 'Music Portfolio' },
    { id: 'template10', name: 'Taxi Service' },
    { id: 'template11', name: 'UI Designer' }
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Remove the authentication token
    Cookies.remove("card-token");
    // Redirect to login page
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openEditModal = (modalType, data = null) => {
    setActiveModalType(modalType);
    setItemData(data);
    setIsEditModalOpen(true);
    setIsDropdownOpen(false);
  };

  const openTemplateSelector = async () => {
    // Load current template
    try {
      const response = await profileRead();
      if (response.data.success && response.data.data) {
        setCurrentTemplate(response.data.data.templateId || 'template1');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
    setIsTemplateSelectorOpen(true);
    setIsDropdownOpen(false);
  };

  const handleTemplateChange = async (templateId) => {
    try {
      await profileUpdate({ templateId });
      setCurrentTemplate(templateId);
      // Close the modal and show a brief success message before reloading
      setIsTemplateSelectorOpen(false);
      // Show a brief success message
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Template updated successfully!';
      successMessage.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      document.body.appendChild(successMessage);
      
      // Remove the message after 2 seconds and then reload
      setTimeout(() => {
        document.body.removeChild(successMessage);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating template:', error);
      alert('Failed to update template. Please try again.');
    }
  };

  const handleQuickTemplateChange = async (templateId) => {
    try {
      await profileUpdate({ templateId });
      setCurrentTemplate(templateId);
      setIsDropdownOpen(false);
      // Reload the page to reflect the template change
      window.location.reload();
    } catch (error) {
      console.error('Error updating template:', error);
      alert('Failed to update template. Please try again.');
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setActiveModalType('');
    setItemData(null);
  };

  const handleEditModalClose = () => {
    // Close the edit modal
    closeEditModal();
    // Reload the page to reflect any changes
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const [servicesRes, galleryRes, productsRes, testimonialsRes] = await Promise.all([
        serviceRead(),
        galleryRead(),
        productRead(),
        testimonialRead()
      ]);
      
      if (servicesRes.data.success) setServices(servicesRes.data.data || []);
      if (galleryRes.data.success) setGalleryItems(galleryRes.data.data || []);
      if (productsRes.data.success) setProducts(productsRes.data.data || []);
      if (testimonialsRes.data.success) setTestimonials(testimonialsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openListsModal = async () => {
    await fetchData();
    setIsListsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeListsModal = () => {
    setIsListsModalOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black shadow-sm border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="EliteCards Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
          </div>
          
          {/* Buttons on the right */}
          <div className="flex items-center space-x-4">
            {/* Edit icon with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="bg-zinc-800 hover:bg-zinc-900 text-white p-2 rounded-md transition duration-300 ease-in-out"
                title="Edit options"
              >
                <Edit3 size={20} />
              </button>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                  <button
                    onClick={() => openEditModal('profile')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => openEditModal('services')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Add Service
                  </button>
                  <button
                    onClick={() => openEditModal('gallery')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Add Gallery Item
                  </button>
                  <button
                    onClick={() => openEditModal('products')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => openEditModal('testimonials')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Add Testimonial
                  </button>
                  <button
                    onClick={openListsModal}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Manage Items
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={openTemplateSelector}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                  >
                    Show Templates
                  </button>
                  {/* Direct template selection options */}
                  <div className="border-t border-gray-700 my-1"></div>
                  <div className="px-4 py-2 text-sm text-gray-400">Quick Templates:</div>
                  {templateOptions.slice(0, 5).map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleQuickTemplateChange(template.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white truncate"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Login/Logout button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={handleEditModalClose} 
        modalType={activeModalType} 
        itemData={itemData}
      />
      
      {/* Lists Modal */}
      <ListsModal 
        isOpen={isListsModalOpen} 
        onClose={closeListsModal} 
        services={services}
        galleryItems={galleryItems}
        products={products}
        testimonials={testimonials}
        onEdit={openEditModal}
        onRefresh={fetchData}
      />
      
      {/* Template Selector Modal */}
      {isTemplateSelectorOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Select Template</h2>
                <button
                  onClick={() => setIsTemplateSelectorOpen(false)}
                  className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <TemplateSelector 
                currentTemplate={currentTemplate} 
                onTemplateChange={handleTemplateChange} 
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;