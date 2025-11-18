import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function EventManagerTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#e6b85c'

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
    { title: 'Weddings', desc: 'Full planning and execution for dream weddings.' },
    { title: 'Corporate', desc: 'Conferences, launches, and team events.' },
    { title: 'Social', desc: 'Birthdays, anniversaries, and celebrations.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event1/800/600' },
    { src: 'https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event2/800/600' },
    { src: 'https://images.pexels.com/photos/1181397/pexels-photo-1181397.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event3/800/600' },
    { src: 'https://images.pexels.com/photos/1181398/pexels-photo-1181398.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event4/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Wedding Package', price: '$4,999.00', img: { src: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event5/800/600' } },
    { name: 'Corporate Event', price: '$2,499.00', img: { src: 'https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event6/800/600' } },
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
          name: 'Michael Thompson',
          role: 'Corporate Client',
          feedback: 'The event planning was flawless. Every detail was perfectly executed, and our guests were impressed.',
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
    <div className="min-h-screen bg-[#14110f] text-[#f1e9df]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://images.pexels.com/photos/265938/pexels-photo-265938.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/eventhero/1600/400'}}
            alt="Event hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#1b1715] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/eventprofile/200/200'}}
              alt="Manager profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Vanessa Joe"}</h1>
                {profileData?.logoImg && (
                  <img 
                    src={profileData.logoImg} 
                    alt="Company Logo" 
                    className="h-8 w-auto"
                    onError={(e) => {e.currentTarget.style.display = 'none'}}
                  />
                )}
              </div>
              <p className="text-[#cdbbaa]">{profileData?.profession || "Event Manager • Weddings & Corporate"}</p>
              <div className="mt-3 flex gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#14110f' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "events@grandstudio.com"}</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 660-2214"}</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "grandstudio.events"}</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "Chicago, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-[#1b1715] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#14110f] text-lg">🎉</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#cdbbaa]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#1b1715] p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Event" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[#1b1715] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#cdbbaa]">{p.price}</p>
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
              <div key={index} className="rounded-2xl bg-[#1b1715] p-6 shadow flex items-start gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=random`}
                  onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/eventtest/200/200'}}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-[#cdbbaa]">{testimonial.role}</p>
                    </div>
                    <div style={{ color: accent }}>{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="mt-3 text-sm text-[#e0d6c9]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Business Hours</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {hours.map(([d,h], index) => (
              <div key={index} className="rounded-xl bg-[#1b1715] p-4 shadow flex items-center justify-between">
                <span className="font-medium">{d}</span>
                <span className="text-sm text-[#cdbbaa]">{h}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-[#1b1715] p-6 shadow flex items-center gap-6">
          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Profile"
            className="w-40 h-28 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="font-medium">QR Code</p>
            <p className="text-sm text-[#cdbbaa]">Save our contact and packages instantly.</p>
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('https://grandstudio.events')}`}
            alt="QR"
            className="w-24 h-24 rounded-lg"
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <form onSubmit={(e)=>{e.preventDefault(); alert('Message sent')}} className="mt-6 rounded-2xl bg-[#1b1715] p-6 shadow grid sm:grid-cols-2 gap-4">
            <input name="cname" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df]" />
            <input type="email" name="email" placeholder="Email" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df]" />
            <input name="cphone" placeholder="Phone number" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df]" />
            <textarea name="message" placeholder="Your message" rows={3} className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df] sm:col-span-2" />
            <button className="sm:col-span-2 px-4 py-2 rounded-lg" style={{ backgroundColor: accent, color: '#14110f' }}>Send Message</button>
          </form>
        </section>

        <section className="mt-12 mb-8 rounded-2xl bg-[#1b1715] p-6 shadow flex items-center justify-between">
          <div>
            <p className="font-medium">Your vCard</p>
            <p className="text-sm text-[#cdbbaa]">Tap to save contact details to your phone.</p>
          </div>
          <button className="px-4 py-2 rounded-lg" style={{ backgroundColor: accent, color: '#14110f' }}>Add to Wallet</button>
        </section>
      </div>
    </div>
  )
}

export default EventManagerTemplate