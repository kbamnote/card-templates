import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar, Star, Palette, Camera, Award, Quote } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function MobileCreativeStudio({ profileData }) {
  const accent = profileData?.accentColor || '#8b5cf6'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Brand Identity', desc: 'Complete visual identity systems for modern brands.' },
    { title: 'UI/UX Design', desc: 'User-centered digital experiences that convert.' },
    { title: 'Motion Graphics', desc: 'Dynamic visual storytelling for digital media.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/creative1/800/600' },
    { src: 'https://images.unsplash.com/photo-1558655147-d09347e92767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/creative2/800/600' },
    { src: 'https://images.unsplash.com/photo-1558655148-d09347e92768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/creative3/800/600' },
    { src: 'https://images.unsplash.com/photo-1558655149-d09347e92769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/creative4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Brand Identity Package', price: '$1,999.00', img: { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/service1/800/800' } },
    { name: 'Website Redesign', price: '$2,999.00', img: { src: 'https://images.unsplash.com/photo-1558655147-d09347e92767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/service2/800/800' } },
  ]

  // Use testimonial data or fallback to defaults
  const testimonials = profileData?.testimonials && profileData.testimonials.length > 0 
    ? profileData.testimonials.map(t => ({
        name: t.testimonialName || 'Anonymous',
        role: 'Client',
        feedback: t.feedback || 'Great service',
        rating: 5
      }))
    : [
        {
          name: 'Robert Chen',
          role: 'Marketing Director',
          feedback: 'The creative team transformed our brand identity and digital presence. Their attention to detail and innovative approach exceeded our expectations.',
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
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-purple-50 text-gray-900">
      {/* Hero Section - Asymmetric Design */}
      <section className="relative py-8 md:py-12 px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 opacity-10 rounded-3xl transform rotate-1 md:rotate-3"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl -mt-6 md:-mt-8">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/creativeprofile/400/400'}}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-4 md:mt-6">{profileData?.name || "Alex Morgan"}</h1>
          <p className="text-violet-600 font-medium mt-1 md:mt-2 text-sm md:text-base">{profileData?.profession || "Creative Director & Visual Artist"}</p>
          <p className="text-gray-600 mt-2 md:mt-4 text-sm md:text-base max-w-md">Creating meaningful visual experiences that blend artistry with strategy to help brands tell their story.</p>
          
          <div className="flex justify-center mt-4 md:mt-6 space-x-3 md:space-x-4">
            {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon || !url) return null;
              return (
                <a 
                  key={platform} 
                  href={url} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white shadow-md"
                >
                  <Icon size={16} className="md:size-20" style={{ color: accent }} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats - Creative Layout */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-white">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <div className="bg-violet-50 rounded-2xl p-4 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-violet-600">250+</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Projects</p>
          </div>
          <div className="bg-violet-50 rounded-2xl p-4 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-violet-600">98%</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Satisfaction</p>
          </div>
          <div className="bg-violet-50 rounded-2xl p-4 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-violet-600">12</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Years</p>
          </div>
          <div className="bg-violet-50 rounded-2xl p-4 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-violet-600">50+</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Clients</p>
          </div>
        </div>
      </section>

      {/* Services - Creative Cards */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-violet-50">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Creative Services</h2>
        <div className="space-y-4 md:space-y-5">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02]">
              <div className="p-4 md:p-6">
                <div className="flex">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mr-3 md:mr-5" style={{ backgroundColor: `${accent}20` }}>
                    <div className="text-base md:text-2xl" style={{ color: accent }}>
                      {index === 0 ? '🎨' : index === 1 ? '💻' : '🎬'}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-xl">{service.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 md:mt-2">{service.desc}</p>
                    <button 
                      className="mt-3 md:mt-4 px-4 py-2 rounded-full text-sm font-medium"
                      style={{ backgroundColor: accent, color: 'white' }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio - Asymmetric Grid */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Featured Work</h2>
          <button className="text-violet-500 text-sm font-medium" style={{ color: accent }}>
            See All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden shadow-md ${index % 3 === 0 ? 'row-span-2' : ''} cursor-pointer`}
              onClick={() => openGallery(index)}
            >
              <img 
                src={item.src} 
                onError={(e)=>{e.currentTarget.src=item.fallback}} 
                alt={`Portfolio item ${index+1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Products - Horizontal Scroll */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-violet-50">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Creative Packages</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4 md:space-x-5 scrollbar-hide">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-64 md:w-72 bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={product.img?.src} 
                  onError={(e)=>{e.currentTarget.src=product.img?.fallback}} 
                  alt={product.name} 
                  className="w-full h-36 md:h-44 object-cover"
                />
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-violet-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                  Popular
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-bold text-sm md:text-base">{product.name}</h3>
                <p className="text-violet-600 font-bold mt-1 md:mt-2 text-sm" style={{ color: accent }}>{product.price}</p>
                <button 
                  className="mt-3 md:mt-4 w-full py-2 rounded-full font-medium text-sm"
                  style={{ backgroundColor: accent, color: 'white' }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Creative Layout */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Client Love</h2>
        <div className="space-y-4 md:space-y-5">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-violet-50 rounded-2xl p-4 md:p-6 relative">
              <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 rounded-bl-2xl" style={{ backgroundColor: accent }}>
                <Quote size={16} className="md:size-20 text-white m-2 md:m-3" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="font-bold text-violet-600 text-sm md:text-base">RC</span>
                </div>
                <div className="ml-2 md:ml-3">
                  <h3 className="font-bold text-sm md:text-base">{testimonial.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-2 md:mt-3">
                {renderRating(testimonial.rating)}
              </div>
              <p className="mt-2 md:mt-3 text-gray-600 text-sm">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment - Creative Design */}
      <section className="py-6 md:py-8 px-4 md:px-6 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-t-3xl">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Let's Create Something Amazing</h2>
        <p className="text-violet-200 text-sm mb-4 md:mb-5">Schedule a creative consultation to discuss your project</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-5">
          {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
        </div>
        
        {/* Contact Info */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 gap-2 md:gap-3">
          <div className="flex items-center bg-white/20 p-2 md:p-3 rounded-lg">
            <Mail size={16} className="md:size-18 mr-2 md:mr-3" />
            <span className="text-sm">{profileData?.email || "hello@pixelperfectstudio.com"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-2 md:p-3 rounded-lg">
            <Phone size={16} className="md:size-18 mr-2 md:mr-3" />
            <span className="text-sm">{profileData?.phone1 || "+1 (555) 567-8901"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-2 md:p-3 rounded-lg">
            <MapPin size={16} className="md:size-18 mr-2 md:mr-3" />
            <span className="text-sm">{profileData?.location || "Los Angeles, CA"}</span>
          </div>
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

export default MobileCreativeStudio