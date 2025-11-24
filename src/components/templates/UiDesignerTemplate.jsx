import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function UiDesignerTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#5de0a2'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'UI Design', desc: 'Pixel-perfect interfaces for web and mobile.' },
    { title: 'UX Research', desc: 'User insights and journey mapping.' },
    { title: 'Design Systems', desc: 'Component libraries and style guides.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://www.training.com.au/wp-content/uploads/graphic-designer.jpeg', fallback: 'https://picsum.photos/seed/ui1/800/600' },
    { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui2/800/600' },
    { src: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui3/800/600' },
    { src: 'https://images.pexels.com/photos/3184425/pexels-photo-3184425.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'UI Design Package', price: '$1,299.00', img: { src: 'https://www.training.com.au/wp-content/uploads/graphic-designer.jpeg', fallback: 'https://picsum.photos/seed/ui5/800/600' } },
    { name: 'UX Research Session', price: '$499.00', img: { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui6/800/600' } },
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
          name: 'Alex Morgan',
          role: 'Product Manager',
          feedback: 'Pallavi transformed our product with intuitive designs and a cohesive design system. The user engagement metrics improved significantly after the redesign.',
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
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-[#0e2f34] text-[#e6f5ee]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://www.training.com.au/wp-content/uploads/graphic-designer.jpeg"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/uihero/1600/400'}}
            alt="UI workspace"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#132f33] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/uiprofile/200/200'}}
              alt="Designer profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Pallavi Hegde"}</h1>
              <p className="text-[#9fd0bd]">{profileData?.profession || "UI/UX Designer • Design Systems"}</p>
              <div className="mt-3 flex gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0e2f34' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "design@studio.com"}</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 440-1102"}</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "studioui.design"}</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "Remote • Worldwide"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-[#132f33] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#0e2f34] text-lg">▣</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#9fd0bd]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#132f33] p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Design" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[#132f33] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#9fd0bd]">{p.price}</p>
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
              <div key={index} className="rounded-2xl bg-[#132f33] p-6 shadow flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent, color: '#fff' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-[#9fd0bd]">{testimonial.role}</p>
                    </div>
                    <div style={{ color: accent }}>{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="mt-3 text-[#9fd0bd]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default UiDesignerTemplate