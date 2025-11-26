import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar, Star, Heart, Leaf, Sun } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function MobileWellnessCoach({ profileData }) {
  const accent = profileData?.accentColor || '#10b981'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Personal Coaching', desc: 'One-on-one wellness coaching tailored to your goals.' },
    { title: 'Nutrition Planning', desc: 'Custom meal plans and nutritional guidance.' },
    { title: 'Mindfulness Training', desc: 'Stress reduction and meditation techniques.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/wellness1/800/600' },
    { src: 'https://images.unsplash.com/photo-1542744174-8e7e53415bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/wellness2/800/600' },
    { src: 'https://images.unsplash.com/photo-1542744175-8e7e53415bb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/wellness3/800/600' },
    { src: 'https://images.unsplash.com/photo-1542744176-8e7e53415bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', fallback: 'https://picsum.photos/seed/wellness4/800/600' },
  ]

  const products = profileData?.products || [
    { name: '30-Day Wellness Program', price: '$299.00', img: { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/program1/800/800' } },
    { name: 'Nutrition Guide Ebook', price: '$49.00', img: { src: 'https://images.unsplash.com/photo-1542744174-8e7e53415bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', fallback: 'https://picsum.photos/seed/program2/800/800' } },
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
          name: 'Jennifer Smith',
          role: 'Wellness Enthusiast',
          feedback: 'Working with this coach transformed my approach to health and wellness. I feel more energized and balanced than ever before.',
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 text-gray-900">
      {/* Hero Section with Nature Theme */}
      <section className="relative py-10 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-10 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/wellnessprofile/400/400'}}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6">{profileData?.name || "Sarah Johnson"}</h1>
          <p className="text-emerald-600 font-medium mt-2">{profileData?.profession || "Certified Wellness Coach & Nutritionist"}</p>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">Helping you achieve balance and vitality through holistic wellness practices.</p>
          
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

      {/* Stats with Icons */}
      <section className="py-6 px-6 bg-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${accent}20` }}>
              <Heart size={20} style={{ color: accent }} />
            </div>
            <p className="text-xl font-bold text-emerald-600">500+</p>
            <p className="text-xs text-gray-500 mt-1">Clients</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${accent}20` }}>
              <Sun size={20} style={{ color: accent }} />
            </div>
            <p className="text-xl font-bold text-emerald-600">99%</p>
            <p className="text-xs text-gray-500 mt-1">Satisfaction</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${accent}20` }}>
              <Leaf size={20} style={{ color: accent }} />
            </div>
            <p className="text-xl font-bold text-emerald-600">8</p>
            <p className="text-xs text-gray-500 mt-1">Years</p>
          </div>
        </div>
      </section>

      {/* Services - Card Stack for Mobile */}
      <section className="py-8 px-6 bg-emerald-50">
        <h2 className="text-2xl font-bold mb-4">Wellness Services</h2>
        <div className="space-y-5">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-md">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4" style={{ backgroundColor: `${accent}20` }}>
                    <div className="text-xl" style={{ color: accent }}>
                      {index === 0 ? '👩‍⚕️' : index === 1 ? '🥗' : '🧘'}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-600 mt-2">{service.desc}</p>
                    <button 
                      className="mt-4 px-5 py-2 rounded-full text-sm font-medium"
                      style={{ backgroundColor: accent, color: 'white' }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs - Horizontal Scroll for Mobile */}
      <section className="py-8 px-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Wellness Programs</h2>
          <button className="text-emerald-500 text-sm font-medium" style={{ color: accent }}>
            View All
          </button>
        </div>
        
        <div className="flex overflow-x-auto pb-4 space-x-5 scrollbar-hide">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-72 bg-emerald-50 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={product.img?.src} 
                onError={(e)=>{e.currentTarget.src=product.img?.fallback}} 
                alt={product.name} 
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-emerald-600 font-bold mt-2" style={{ color: accent }}>{product.price}</p>
                <button 
                  className="mt-4 w-full py-2.5 rounded-full font-medium text-sm"
                  style={{ backgroundColor: accent, color: 'white' }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery - Grid Layout for Mobile */}
      <section className="py-8 px-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Wellness Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {gallery.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => openGallery(index)}
            >
              <img 
                src={item.src} 
                onError={(e)=>{e.currentTarget.src=item.fallback}} 
                alt={`Gallery item ${index+1}`} 
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Carousel for Mobile */}
      <section className="py-8 px-6 bg-emerald-50">
        <h2 className="text-2xl font-bold mb-4">Client Stories</h2>
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-5" style={{ minWidth: 'calc(100% * 1.5)' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-emerald-50 rounded-2xl p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="font-bold text-emerald-600">JS</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-3">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="mt-3 text-gray-600">"{testimonial.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment - Nature Theme */}
      <section className="py-8 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-3xl">
        <h2 className="text-2xl font-bold mb-2">Book Your Wellness Session</h2>
        <p className="text-emerald-100 mb-5">Take the first step towards a healthier, more balanced life</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
          {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
        </div>
        
        {/* Contact Info */}
        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <Mail size={18} className="mr-3" />
            <span>{profileData?.email || "hello@natureswellness.com"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <Phone size={18} className="mr-3" />
            <span>{profileData?.phone1 || "+1 (555) 456-7890"}</span>
          </div>
          <div className="flex items-center bg-white/20 p-3 rounded-lg">
            <MapPin size={18} className="mr-3" />
            <span>{profileData?.location || "Portland, OR"}</span>
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

export default MobileWellnessCoach