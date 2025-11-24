import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function InteriorDesignTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#f5c157'

  const hours = [
    ['Sunday', 'Closed'],
    ['Monday', '10:00 - 18:00'],
    ['Tuesday', '10:00 - 18:00'],
    ['Wednesday', '10:00 - 18:00'],
    ['Thursday', '10:00 - 18:00'],
    ['Friday', '10:00 - 18:00'],
    ['Saturday', '11:00 - 16:00'],
  ]

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Space Planning', desc: 'Optimize layouts for functionality and flow.' },
    { title: 'Color Consultation', desc: 'Palettes that enhance mood and aesthetics.' },
    { title: 'Furniture Selection', desc: 'Curated pieces that reflect your style.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior1/800/600' },
    { src: 'https://images.unsplash.com/photo-1505693250230-0b1ab53835ec?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior2/800/600' },
    { src: 'https://images.unsplash.com/photo-1505693500300-0b1ab53835ec?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior3/800/600' },
    { src: 'https://images.unsplash.com/photo-1505693600000-0b1ab53835ec?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Design Consultation', price: '$299.00', img: { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior5/800/600' } },
    { name: 'Full Room Design', price: '$1,299.00', img: { src: 'https://images.unsplash.com/photo-1505693250230-0b1ab53835ec?q=80&w=1200&auto=format&fit=crop', fallback: 'https://picsum.photos/seed/interior6/800/600' } },
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
          name: 'James Brown',
          role: 'Homeowner',
          feedback: 'Jeff transformed our apartment with warm tones and clever zoning. We loved the process and the result exceeded expectations.',
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

  function handleContact(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('cname')
    const email = form.get('email')
    const phone = form.get('cphone')
    const message = form.get('message')
    alert(`Message from ${name} (${email}, ${phone}): ${message}`)
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
    <div className="min-h-screen bg-[#f5f3ed] text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/interiorhero/1600/400'}}
            alt="Interior hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/interiorprofile/200/200'}}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Jeff Murray"}</h1>
              <p className="text-[#78836e]">{profileData?.profession || "Interior Designer"}</p>
              <div className="mt-3 flex gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f5c157', color: '#000' }}>
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
            <p className="text-sm text-[#78836e]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 339-1200"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "jeff@studio.com"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "studiojeff.design"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "NYC, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow">
                <div className="w-10 h-10 rounded-lg bg-[#f5c157] text-black flex items-center justify-center text-lg">★</div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#78836e]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Project" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, '#f5c157')}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-[#78836e]">{p.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Business Hours</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {hours.map(([d,h], index) => (
              <div key={index} className="rounded-xl bg-white p-4 shadow flex items-center justify-between">
                <span className="font-medium">{d}</span>
                <span className="text-sm text-[#78836e]">{h}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-white p-6 shadow flex items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/interiorqr/200/200'}}
            alt="Profile"
            className="w-40 h-28 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="font-medium">QR Code</p>
            <p className="text-sm text-[#78836e]">Save our contact and packages instantly.</p>
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('https://studiojeff.design')}`}
            alt="QR Code"
            className="w-20 h-20"
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <form onSubmit={handleContact} className="mt-6 rounded-2xl bg-white p-6 shadow grid sm:grid-cols-2 gap-4">
            <input name="cname" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#f5f3ed]" />
            <input type="email" name="email" placeholder="Email" className="px-3 py-2 rounded-lg bg-[#f5f3ed]" />
            <input name="cphone" placeholder="Phone number" className="px-3 py-2 rounded-lg bg-[#f5f3ed]" />
            <textarea name="message" placeholder="Your message" rows={3} className="px-3 py-2 rounded-lg bg-[#f5f3ed] sm:col-span-2" />
            <button className="sm:col-span-2 px-4 py-2 rounded-lg bg-[#f5c157] text-black font-medium">Send Message</button>
          </form>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent, color: '#000' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-[#78836e]">{testimonial.role}</p>
                    </div>
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="mt-3 text-[#78836e]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default InteriorDesignTemplate