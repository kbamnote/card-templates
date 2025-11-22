import React, { useState } from 'react';

const ProductsForm = ({ onSubmit, loading }) => {
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    details: '',
    productPhoto: null
  });
  
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData(prev => ({
        ...prev,
        productPhoto: file
      }));
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!productData.productName || !productData.price || !productData.details) {
      setError('Product name, price, and details are required');
      return;
    }
    
    // Validate that a product photo is selected
    if (!productData.productPhoto) {
      setError('Product photo is required');
      return;
    }
    
    // Validate price is a number
    if (isNaN(productData.price) || parseFloat(productData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }
    
    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('price', productData.price);
    formData.append('details', productData.details);
    formData.append('productPhoto', productData.productPhoto);
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">Add Your Product</h2>
      <p className="text-gray-400 mb-6">Showcase your products to potential customers</p>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-300 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product name"
          />
        </div>
        
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
          />
        </div>
        
        {/* Product Details */}
        <div className="md:col-span-2">
          <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-1">
            Product Details *
          </label>
          <textarea
            id="details"
            name="details"
            value={productData.details}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your product in detail"
          />
        </div>
        
        {/* Product Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
          <div className="flex items-center space-x-6">
            {productImagePreview && (
              <div className="flex-shrink-0">
                <img 
                  className="h-16 w-16 object-cover rounded" 
                  src={productImagePreview} 
                  alt="Product preview" 
                />
              </div>
            )}
            <div>
              <label className="block">
                <span className="sr-only">Choose product image</span>
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
          {loading ? 'Saving...' : 'Finish Onboarding'}
        </button>
      </div>
    </form>
  );
};

export default ProductsForm;