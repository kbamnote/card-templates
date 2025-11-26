import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function CeoTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#3b82f6'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Strategic Planning', desc: 'Long-term business vision and execution.' },
    { title: 'Leadership Coaching', desc: 'Team development and executive mentoring.' },
    { title: 'Business Development', desc: 'Partnerships, M&A, and growth strategies.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo1/800/600' },
    { src: 'https://images.pexels.com/photos/3184462/pexels-photo-3184462.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo2/800/600' },
    { src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo3/800/600' },
    { src: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Strategy Session', price: '$499.00', img: { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo5/800/600' } },
    { name: 'Leadership Workshop', price: '$1,299.00', img: { src: 'https://images.pexels.com/photos/3184462/pexels-photo-3184462.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo6/800/600' } },
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
          name: 'Sarah Johnson',
          role: 'COO',
          feedback: 'Jeremy\'s strategic insights helped us pivot during a challenging market shift. His leadership approach is both visionary and practical.',
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
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
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
    <div className="min-h-screen bg-[#f7fbff] text-[#1f2a3a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/ceohero/1600/400'}}
            alt="Business banner"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.pexels.com/photos/3711601/pexels-photo-3711601.jpeg?auto=compress&cs=tinysrgb&w=400"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/ceoprofile/200/200'}}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Jeremy Wilson"}</h1>
                {profileData?.logoImg && (
                  <img 
                    src={profileData.logoImg} 
                    alt="Company Logo" 
                    className="h-8 w-auto"
                    onError={(e) => {e.currentTarget.style.display = 'none'}}
                  />
                )}
              </div>
              <p className="text-[#5c6b80]">{profileData?.profession || "CEO • Strategy & Operations"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#fff' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "ceo@bluecorp.com"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 640-7771"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "bluecorp.io"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "San Francisco, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-white text-lg">★</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#5c6b80]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img 
                key={i} 
                src={g.src} 
                onError={(e)=>{e.currentTarget.src=g.fallback}} 
                alt="Corporate" 
                className="rounded-xl h-36 sm:h-44 w-full object-cover shadow cursor-pointer" 
                onClick={() => openGallery(i)}
              />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img?.src} onError={(e)=>{e.currentTarget.src=p.img?.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#5c6b80]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent, color: '#fff' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-[#5c6b80]">{testimonial.role}</p>
                    </div>
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="mt-3 text-[#5c6b80]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
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
    </div>
  )
}

export default CeoTemplate