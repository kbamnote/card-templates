import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar, ShoppingCart, Star, Heart } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function MobileFashionBoutique({ profileData }) {
  const accent = profileData?.accentColor || '#ec4899'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Personal Styling', desc: 'One-on-one fashion consultation tailored to your style.' },
    { title: 'Wardrobe Planning', desc: 'Complete wardrobe organization and planning services.' },
    { title: 'Seasonal Collections', desc: 'Curated seasonal fashion collections.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/fashion1/800/600' },
    { src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/fashion2/800/600' },
    { src: 'https://images.unsplash.com/photo-1534073815292-738eb12c1b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/fashion3/800/600' },
    { src: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/fashion4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Summer Dress Collection', price: '$89.99', img: { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/product1/800/800' } },
    { name: 'Designer Handbag', price: '$149.99', img: { src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/product2/800/800' } },
    { name: 'Luxury Sunglasses', price: '$59.99', img: { src: 'https://images.unsplash.com/photo-1534073815292-738eb12c1b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/product3/800/800' } },
    { name: 'Evening Gown', price: '$199.99', img: { src: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/product4/800/800' } },
  ]

  // Use testimonial data or fallback to defaults
  const testimonials = profileData?.testimonials && profileData.testimonials.length > 0 
    ? profileData.testimonials.map(t => ({
        name: t.testimonialName || 'Anonymous',
        role: 'Customer',
        feedback: t.feedback || 'Great service',
        rating: 5
      }))
    : [
        {
          name: 'Sophia Williams',
          role: 'Fashion Enthusiast',
          feedback: 'Absolutely loved the personal styling session! Found pieces that truly reflect my personality.',
          rating: 5
        }
      ];

  const [slot, setSlot] = useState('10:00')
  const [appointmentLoading, setAppointmentLoading] = useState(false)
  const [appointmentMessage, setAppointmentMessage] = useState('')
  const [appointmentError, setAppointmentError] = useState('')

  // Get userId from profileData for public appointments
  const userId = profileData?.userId || profileData?._id;

  async function handleAppointment(e) {
    await handleAppointmentSubmit(e, setAppointmentLoading, setAppointmentMessage, setAppointmentError, slot, userId)
  }

  // Social media icons mapping
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    whatsapp: Phone
  }

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={16} />
        ))}
      </div>
    );
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openGallery = (index) => {
    setSelectedImageIndex(index);
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex + 1) % gallery.length
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex - 1 + gallery.length) % gallery.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 text-gray-900">
      {/* Hero Banner - Mobile First */}
      <section className="relative">
        <div className="h-48 md:h-64 overflow-hidden">
          <img
            src={profileData?.bannerImg || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/fashionhero/1200/600'}}
            alt="Fashion Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
          
          
         
        </div>
      </section>

      {/* Profile Section - Stacked for Mobile */}
      <section className="bg-white py-6 px-4 md:px-6 -mt-8 rounded-t-3xl shadow-lg relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-10 md:-mt-12">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/fashionprofile/400/400'}}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg md:text-xl font-bold mt-3 text-center">{profileData?.name || "Emma Richardson"}</h2>
          <p className="text-gray-600 text-center text-sm mt-1">{profileData?.profession || "Fashion Designer & Stylist"}</p>
          
          <div className="flex mt-4 space-x-2 md:space-x-3">
            {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon || !url) return null;
              return (
                <a 
                  key={platform} 
                  href={url} 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accent}20` }}
                >
                  <Icon size={16} className="md:size-18" style={{ color: accent }} />
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Contact Info - Vertical Stack */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center bg-pink-50 p-3 rounded-lg">
            <Mail size={16} className="md:size-18 mr-2" style={{ color: accent }} />
            <span className="text-xs md:text-sm">{profileData?.email || "contact@chicboutique.com"}</span>
          </div>
          <div className="flex items-center bg-pink-50 p-3 rounded-lg">
            <Phone size={16} className="md:size-18 mr-2" style={{ color: accent }} />
            <span className="text-xs md:text-sm">{profileData?.phone1 || "+1 (555) 234-5678"}</span>
          </div>
          <div className="flex items-center bg-pink-50 p-3 rounded-lg">
            <MapPin size={16} className="md:size-18 mr-2" style={{ color: accent }} />
            <span className="text-xs md:text-sm">{profileData?.location || "New York, NY"}</span>
          </div>
          <div className="flex items-center bg-pink-50 p-3 rounded-lg">
            <Globe size={16} className="md:size-18 mr-2" style={{ color: accent }} />
            <span className="text-xs md:text-sm">{profileData?.websiteLink || "www.chicboutique.com"}</span>
          </div>
        </div>
      </section>

      {/* Services - Horizontal Scroll for Mobile */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-rose-50">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Our Services</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {services.map((service, index) => (
            <div key={index} className="flex-shrink-0 w-56 md:w-64 bg-white rounded-2xl p-4 md:p-5 shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-3" style={{ backgroundColor: `${accent}20` }}>
                <div className="text-base md:text-lg" style={{ color: accent }}>
                  {index === 0 ? '👗' : index === 1 ? '🧳' : '🌸'}
                </div>
              </div>
              <h3 className="font-bold text-base md:text-lg">{service.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products - Grid Optimized for Mobile */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
          <button className="text-pink-500 text-sm font-medium" style={{ color: accent }}>
            See All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-rose-50 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={product.img?.src} 
                  onError={(e)=>{e.currentTarget.src=product.img?.fallback}} 
                  alt={product.name} 
                  className="w-full h-32 md:h-40 object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 md:p-2 bg-white rounded-full shadow">
                  <Heart size={14} className="md:size-16 text-gray-700" />
                </button>
              </div>
              <div className="p-2 md:p-3">
                <h3 className="font-bold text-xs md:text-sm">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-pink-600 text-sm" style={{ color: accent }}>{product.price}</span>
                  <button className="p-1 md:p-1.5 bg-pink-500 rounded-full" style={{ backgroundColor: accent }}>
                    <ShoppingCart size={12} className="md:size-14 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery - Masonry Style for Mobile */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-rose-50">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Gallery</h2>
        <div className="columns-2 gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <div 
              key={index} 
              className="mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => openGallery(index)}
            >
              <img 
                src={item.src} 
                onError={(e)=>{e.currentTarget.src=item.fallback}} 
                alt={`Gallery item ${index+1}`} 
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Carousel for Mobile */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-4" style={{ minWidth: 'calc(100% * 1.5)' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-72 md:w-80 bg-rose-50 rounded-2xl p-4 md:p-5">
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="font-bold text-pink-600 text-sm md:text-base" style={{ color: accent }}>SW</span>
                  </div>
                  <div className="ml-2 md:ml-3">
                    <h3 className="font-bold text-sm md:text-base">{testimonial.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-3">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="mt-2 md:mt-3 text-gray-600 text-xs md:text-sm">"{testimonial.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-3xl">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Book a Styling Session</h2>
        <p className="text-pink-100 text-sm mb-4">Schedule a consultation with our fashion experts</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
          {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <GalleryModal 
          images={gallery}
          currentIndex={selectedImageIndex}
          onClose={closeGallery}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  )
}

export default MobileFashionBoutique