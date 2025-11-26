import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'
import GalleryModal from './GalleryModal'

function LawyerTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#c9a15e'

  const hours = [
    ['Sunday', '09:00 - 20:00'],
    ['Monday', '09:00 - 20:00'],
    ['Tuesday', '09:00 - 20:00'],
    ['Wednesday', '09:00 - 20:00'],
    ['Thursday', '09:00 - 20:00'],
    ['Friday', '09:00 - 20:00'],
    ['Saturday', '09:00 - 20:00'],
  ]

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Legal Advice', desc: 'Consultation on civil and corporate matters.' },
    { title: 'Document Review', desc: 'Contracts, agreements, and legal documents.' },
    { title: 'Case Representation', desc: 'Court appearances and legal proceedings.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law1/800/600' },
    { src: 'https://images.pexels.com/photos/3779772/pexels-photo-3779772.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law2/800/600' },
    { src: 'https://images.pexels.com/photos/3779766/pexels-photo-3779766.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law3/800/600' },
    { src: 'https://images.pexels.com/photos/3779770/pexels-photo-3779770.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Legal Consultation', price: '$299.00', img: { src: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law5/800/600' } },
    { name: 'Document Package', price: '$499.00', img: { src: 'https://images.pexels.com/photos/3779772/pexels-photo-3779772.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law6/800/600' } },
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
          role: 'Business Owner',
          feedback: 'Mary provided excellent legal guidance for our contract negotiations. Professional, thorough, and responsive throughout the process.',
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
    <div className="min-h-screen bg-[#0f0f0f] text-[#eaeaea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://img.freepik.com/free-vector/gradient-luxury-law-firm-twitter-header_23-2149340608.jpg"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/lawhero/1600/400'}}
            alt="Law office"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#151515] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/lawprofile/200/200'}}
              alt="Lawyer profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Mary Jordan"}</h1>
              <p className="text-[#bfbfbf]">{profileData?.profession || "Attorney • Civil & Corporate"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0f0f0f' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "law@firm.com"}</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 411-7860"}</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "jordanlaw.co"}</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "Boston, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-[#151515] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#0f0f0f] text-lg">§</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#bfbfbf]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#151515] p-6 shadow">
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
                alt="Law" 
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
              <div key={i} className="rounded-2xl bg-[#151515] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#bfbfbf]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-[#151515] p-6 shadow flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent, color: '#0f0f0f' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-[#bfbfbf]">{testimonial.role}</p>
                    </div>
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="mt-3 text-[#bfbfbf]">{testimonial.feedback}</p>
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

export default LawyerTemplate