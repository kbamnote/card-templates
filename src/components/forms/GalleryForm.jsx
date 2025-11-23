import React, { useState } from 'react';

const GalleryForm = ({ onSubmit, loading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 10 files
    if (files.length > 10) {
      setError('You can only upload up to 10 images at a time');
      return;
    }
    
    setSelectedFiles(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);
    
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }
    
    onSubmit(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...filePreviews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setFilePreviews(newPreviews);
    
    // Clean up object URL
    URL.revokeObjectURL(filePreviews[index]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">Add Gallery Images</h2>
      <p className="text-gray-400 mb-6">Upload images to showcase your work</p>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Images (Max 10)
        </label>
        <div className="flex items-center space-x-6">
          <div>
            <label className="block">
              <span className="sr-only">Choose images</span>
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-600 file:text-white
                  hover:file:bg-green-700"
              />
            </label>
          </div>
        </div>
      </div>
      
      {/* Image Previews */}
      {filePreviews.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Selected Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
          disabled={loading || selectedFiles.length === 0}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition duration-300"
        >
          {loading ? 'Uploading...' : 'Upload & Continue'}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;