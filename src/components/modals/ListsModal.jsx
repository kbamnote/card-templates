import React from 'react';
import { serviceDelete, galleryDelete, productDelete, testimonialDelete } from '../../utils/Api';

const ListsModal = ({ isOpen, onClose, services, galleryItems, products, testimonials, onEdit, onRefresh }) => {
  if (!isOpen) return null;

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      switch (type) {
        case 'service':
          await serviceDelete(id);
          break;
        case 'gallery':
          await galleryDelete(id);
          break;
        case 'product':
          await productDelete(id);
          break;
        case 'testimonial':
          await testimonialDelete(id);
          break;
        default:
          return;
      }
      
      // Refresh the data after successful deletion
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Error deleting ${type}. Please try again.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">Manage Your Items</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-8">
            {/* Services List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Services</h3>
              {services && services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map(service => (
                    <div key={service._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-100 font-medium truncate">{service.title}</h4>
                        <p className="text-gray-400 text-sm truncate">{service.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button 
                          onClick={() => onEdit('services', service)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('service', service._id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No services added yet</p>
              )}
            </div>
            
            {/* Gallery List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Gallery Items</h3>
              {galleryItems && galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {galleryItems.map(item => (
                    <div key={item._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-100 font-medium truncate">{item.caption || 'Untitled'}</h4>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.caption || 'Gallery item'} 
                            className="w-16 h-16 object-cover rounded mt-2"
                            onError={(e) => {e.currentTarget.style.display = 'none'}}
                          />
                        )}
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button 
                          onClick={() => onEdit('gallery', item)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('gallery', item._id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No gallery items added yet</p>
              )}
            </div>
            
            {/* Products List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Products</h3>
              {products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.map(product => (
                    <div key={product._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-100 font-medium truncate">{product.productName}</h4>
                        <p className="text-gray-400 text-sm">{product.price ? `$${product.price.toFixed(2)}` : ''}</p>
                        {product.productPhoto && (
                          <img 
                            src={product.productPhoto} 
                            alt={product.productName} 
                            className="w-16 h-16 object-cover rounded mt-2"
                            onError={(e) => {e.currentTarget.style.display = 'none'}}
                          />
                        )}
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button 
                          onClick={() => onEdit('products', product)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('product', product._id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No products added yet</p>
              )}
            </div>
            
            {/* Testimonials List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Testimonials</h3>
              {testimonials && testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {testimonials.map(testimonial => (
                    <div key={testimonial._id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-100 font-medium truncate">{testimonial.testimonialName}</h4>
                        <p className="text-gray-400 text-sm truncate">{testimonial.feedback}</p>
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button 
                          onClick={() => onEdit('testimonials', testimonial)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('testimonial', testimonial._id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No testimonials added yet</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsModal;