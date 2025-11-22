import React, { useState } from 'react';

const ServicesForm = ({ onSubmit, loading }) => {
  const [serviceData, setServiceData] = useState({
    title: '',
    description: ''
  });
  

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!serviceData.title || !serviceData.description) {
      setError('Service name and description are required');
      return;
    }
    
    onSubmit(serviceData);
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
            id="title"
            name="title"
            value={serviceData.title}
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
            id="description"
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your service in detail"
          />
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