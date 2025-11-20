import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/br-logo.png';
import EditModal from '../modals/EditModal';
import ListsModal from '../modals/ListsModal';
import { serviceRead, galleryRead, productRead, testimonialRead } from '../../utils/Api';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState('');
  const [itemData, setItemData] = useState(null);
  const [services, setServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const dropdownRef = useRef(null);

  const handleLoginClick = () => {
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

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setActiveModalType('');
    setItemData(null);
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
    // Fetch all data when opening the lists modal
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
            {/* Edit button with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Edit
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
                </div>
              )}
            </div>
            
            {/* Login button */}
            <button
              onClick={handleLoginClick}
              className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={closeEditModal} 
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
    </header>
  );
};

export default Header;