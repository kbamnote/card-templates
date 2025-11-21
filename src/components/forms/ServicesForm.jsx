import React, { useState } from 'react';

const ServicesForm = ({ onSubmit, loading }) => {
  const [serviceData, setServiceData] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePhoto: null
  });
  
  const [serviceImagePreview, setServiceImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServiceData(prev => ({
        ...prev,
        servicePhoto: file
      }));
      setServiceImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!serviceData.serviceName || !serviceData.serviceDescription) {
      setError('Service name and description are required');
      return;
    }
    
    const formData = new FormData();
    formData.append('serviceName', serviceData.serviceName);
    formData.append('serviceDescription', serviceData.serviceDescription);
    
    if (serviceData.servicePhoto) {
      formData.append('servicePhoto', serviceData.servicePhoto);
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">Add Your Service</h2>
      <p className="text-gray-400 mb-6">Tell us about the services you offer</p>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {/* Service Name */}
        <div>
          <label htmlFor="serviceName" className="block text-sm font-medium text-gray-300 mb-1">
            Service Name *
          </label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter service name"
          />
        </div>
        
        {/* Service Description */}
        <div>
          <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-300 mb-1">
            Service Description *
          </label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={serviceData.serviceDescription}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your service in detail"
          />
        </div>
        
        {/* Service Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Service Image</label>
          <div className="flex items-center space-x-6">
            {serviceImagePreview && (
              <div className="flex-shrink-0">
                <img 
                  className="h-16 w-16 object-cover rounded" 
                  src={serviceImagePreview} 
                  alt="Service preview" 
                />
              </div>
            )}
            <div>
              <label className="block">
                <span className="sr-only">Choose service image</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
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
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        >
          Back
        </button>
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

export default ServicesForm;