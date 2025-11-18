import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function HandyManTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#ff6b35'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Repairs', desc: 'Plumbing, electrical, and appliance fixes.' },
    { title: 'Installations', desc: 'Furniture, fixtures, and home systems.' },
    { title: 'Maintenance', desc: 'Regular upkeep and seasonal checks.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.pexels.com/photos/3826692/pexels-photo-3826692.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman1/800/600' },
    { src: 'https://images.pexels.com/photos/3826695/pexels-photo-3826695.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman2/800/600' },
    { src: 'https://images.pexels.com/photos/3826698/pexels-photo-3826698.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman3/800/600' },
    { src: 'https://images.pexels.com/photos/3826701/pexels-photo-3826701.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Tool Kit', price: '$89.00', img: { src: 'https://images.pexels.com/photos/3826692/pexels-photo-3826692.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman5/800/600' } },
    { name: 'Maintenance Pack', price: '$149.00', img: { src: 'https://images.pexels.com/photos/3826695/pexels-photo-3826695.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/handyman6/800/600' } },
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
          name: 'Leonard Sanders',
          role: 'Homeowner',
          feedback: 'Prompt, professional, and transparent pricing. Fixed our AC and mounted shelves perfectly.',
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

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://www.enrgtech.co.uk/blog/wp-content/uploads/2024/06/DALL%C2%B7E-2024-06-14-19.04.16-A-well-organized-beginners-workshop-with-essential-tools-neatly-arranged-on-a-workbench-and-wall-mounted-tool-racks.-The-tools-include-a-hammer-scre-1024x585.png"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/handymanhero/1600/400'}}
            alt="Workshop hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/handymanprofile/200/200'}}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Manhush Shane"}</h1>
              <p className="text-[#666]">{profileData?.profession || "Handyman • Repairs & Installations"}</p>
              <div className="mt-3 flex gap-2">
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

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "work@handypro.com"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 889-2211"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "handypro.services"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "New York, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-white text-lg">🛠️</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#666]">{s.desc}</p>
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
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Work" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#666]">{p.price}</p>
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
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                  onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/handymantest/200/200'}}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-[#666]">{testimonial.role}</p>
                    </div>
                    <div style={{ color: accent }}>
                      {renderRating(testimonial.rating)}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#555]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HandyManTemplate