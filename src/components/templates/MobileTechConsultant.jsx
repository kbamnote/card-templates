import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar, Star, Code, Zap, Shield, Menu } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function MobileTechConsultant({ profileData }) {
  const accent = profileData?.accentColor || '#3b82f6'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Web Development', desc: 'Custom websites and web applications built with modern technologies.' },
    { title: 'Mobile Apps', desc: 'Native and cross-platform mobile applications for iOS and Android.' },
    { title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and deployment strategies.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/tech1/800/600' },
    { src: 'https://images.unsplash.com/photo-1555066932-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/tech2/800/600' },
    { src: 'https://images.unsplash.com/photo-1555066933-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/tech3/800/600' },
    { src: 'https://images.unsplash.com/photo-1555066934-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/tech4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'E-commerce Platform', price: 'Custom Pricing', img: { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/service1/800/800' } },
    { name: 'Business App Development', price: 'Starting at $4,999', img: { src: 'https://images.unsplash.com/photo-1555066932-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/service2/800/800' } },
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
          name: 'Michael Rodriguez',
          role: 'CEO, TechStart Inc.',
          feedback: 'The team delivered our project ahead of schedule with exceptional quality. Their technical expertise is unmatched.',
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-900">
      {/* Profile Hero - Centered for Mobile */}
      <section className="relative py-10 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/techprofile/400/400'}}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6">{profileData?.name || "Alex Johnson"}</h1>
          <p className="text-blue-600 font-medium mt-2">{profileData?.profession || "Senior Software Engineer & Tech Consultant"}</p>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">Building scalable solutions for forward-thinking businesses with over 10 years of experience.</p>
          
          <div className="flex justify-center mt-6 space-x-4">
            {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon || !url) return null;
              return (
                <a 
                  key={platform} 
                  href={url} 
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md"
                >
                  <Icon size={20} style={{ color: accent }} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Horizontal for Mobile */}
      <section className="py-6 px-6 bg-white">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">150+</p>
            <p className="text-xs text-gray-500 mt-1">Projects</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">98%</p>
            <p className="text-xs text-gray-500 mt-1">Success</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">50+</p>
            <p className="text-xs text-gray-500 mt-1">Clients</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">10+</p>
            <p className="text-xs text-gray-500 mt-1">Years</p>
          </div>
        </div>
      </section>

      {/* Services - Accordion Style for Mobile */}
      <section className="py-8 px-6 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">My Services</h2>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <input type="checkbox" id={`service-${index}`} className="hidden" />
              <label 
                htmlFor={`service-${index}`} 
                className="flex items-center justify-between p-5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${accent}20` }}>
                    <div className="text-lg" style={{ color: accent }}>
                      {index === 0 ? '💻' : index === 1 ? '📱' : '☁️'}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{service.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{service.desc}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </label>
              <div className="px-5 pb-5 max-h-0 overflow-hidden transition-all duration-300">
                <p className="text-gray-600 text-sm pt-2 border-t border-gray-100 mt-2">
                  Detailed service description would go here. This section expands when the user clicks on the service card to provide more information about what's included in this service.
                </p>
                <button 
                  className="mt-4 w-full py-2 rounded-lg font-medium"
                  style={{ backgroundColor: accent, color: 'white' }}
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio - Full Width for Mobile */}
      <section className="py-8 px-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <button className="text-blue-500 text-sm font-medium" style={{ color: accent }}>
            View All
          </button>
        </div>
        
        <div className="space-y-6">
          {gallery.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => openGallery(index)}
            >
              <img 
                src={item.src} 
                onError={(e)=>{e.currentTarget.src=item.fallback}} 
                alt={`Portfolio item ${index+1}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">Project Title {index+1}</h3>
                <p className="text-gray-600 text-sm mt-1">Web Development • React • Node.js</p>
                <div className="flex mt-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-2">React</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-2">Node.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">MongoDB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Card Stack for Mobile */}
      <section className="py-8 px-6 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">Client Testimonials</h2>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-600">MR</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <div className="mt-1">
                    {renderRating(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact - Sticky Bottom for Mobile */}
      <section className="py-8 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white sticky bottom-0">
        <h2 className="text-2xl font-bold mb-2">Let's Work Together</h2>
        <p className="text-blue-100 mb-4">Schedule a free consultation to discuss your project</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
        </div>
        
        {/* Contact Info - Stacked for Mobile */}
        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <Mail size={18} className="mr-3" />
            <span>{profileData?.email || "hello@techsolutionspro.com"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <Phone size={18} className="mr-3" />
            <span>{profileData?.phone1 || "+1 (555) 345-6789"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <MapPin size={18} className="mr-3" />
            <span>{profileData?.location || "San Francisco, CA"}</span>
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

export default MobileTechConsultant