import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function HairDresserTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#5de0a2'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Haircuts', desc: 'Precision cuts for all hair types.' },
    { title: 'Coloring', desc: 'Vibrant colors with premium products.' },
    { title: 'Styling', desc: 'Event-ready looks and daily styles.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.pexels.com/photos/3993145/pexels-photo-3993145.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair1/800/600' },
    { src: 'https://images.pexels.com/photos/3993127/pexels-photo-3993127.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair2/800/600' },
    { src: 'https://images.pexels.com/photos/3993138/pexels-photo-3993138.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair3/800/600' },
    { src: 'https://images.pexels.com/photos/3993150/pexels-photo-3993150.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Hair Oil', price: '$24.00', img: { src: 'https://images.pexels.com/photos/3993145/pexels-photo-3993145.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair5/800/600' } },
    { name: 'Shampoo', price: '$18.00', img: { src: 'https://images.pexels.com/photos/3993127/pexels-photo-3993127.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair6/800/600' } },
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
          name: 'Luna Blake',
          role: 'Client',
          feedback: 'Amazing color work and a relaxing experience. Highly recommend!',
          rating: 5
        }
      ];

  const [slot, setSlot] = useState('10:00')
  const [appointmentLoading, setAppointmentLoading] = useState(false)
  const [appointmentMessage, setAppointmentMessage] = useState('')
  const [appointmentError, setAppointmentError] = useState('')

  async function handleAppointment(e) {
    await handleAppointmentSubmit(e, setAppointmentLoading, setAppointmentMessage, setAppointmentError, slot)
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
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-[#0e3a35] text-[#eae7e4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://images.pexels.com/photos/3993127/pexels-photo-3993127.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/hairhero/1600/400'}}
            alt="Salon hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#103f39] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.pexels.com/photos/3993325/pexels-photo-3993325.jpeg?auto=compress&cs=tinysrgb&w=400"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/hairprofile/200/200'}}
              alt="Stylist profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Ezra Miller"}</h1>
              <p className="text-[#b7d5cf]">{profileData?.profession || "Hair Stylist • Color & Grooming"}</p>
              <div className="mt-3 flex gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0e3a35' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "style@salonpro.com"}</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 771-4490"}</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "salonpro.style"}</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "Seattle, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-[#103f39] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#0e3a35] text-lg">✂</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#b7d5cf]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#103f39] p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Salon work" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[#103f39] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#b7d5cf]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-[#103f39] p-6 shadow flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent, color: '#fff' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-[#b7d5cf]">{testimonial.role}</p>
                    </div>
                    <div style={{ color: accent }}>{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="mt-3 text-sm text-[#d7e5e1]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HairDresserTemplate