import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react'
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils'

function TaxiTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#f5c157'

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { title: 'Airport Transfers', desc: 'On-time rides to and from the airport.' },
    { title: 'City Rides', desc: 'Reliable point-to-point rides anywhere in town.' },
    { title: 'Chauffeur & Rentals', desc: 'Hourly bookings with professional drivers.' },
  ]

  const gallery = profileData?.gallery || [
    { src: 'https://tse1.mm.bing.net/th/id/OIP.87LQGpCW8p-o0flNgd3p4gHaE8?pid=Api&P=0&h=180', fallback: 'https://picsum.photos/seed/taxigallery0/800/600' },
    { src: 'https://tse1.mm.bing.net/th/id/OIP.YHDGp99mUqeVwoGf_los8gHaEK?pid=Api&P=0&h=180', fallback: 'https://picsum.photos/seed/taxigallery1/800/600' },
    { src: 'https://tse4.mm.bing.net/th/id/OIP.kO6FsF915AFbpjujv1wrKAHaEo?pid=Api&P=0&h=180', fallback: 'https://picsum.photos/seed/taxigallery2/800/600' },
    { src: 'https://wallpapers.com/images/hd/lady-in-a-taxi-4u3oytagjgdkxx2c.jpg', fallback: 'https://picsum.photos/seed/taxigallery3/800/600' },
  ]

  const products = profileData?.products || [
    { name: 'Airport Ride', price: '$39.00', img: { src: 'https://www.mbaairporttransportation.com/wp-content/uploads/2015/11/mba-pick-up.jpg', fallback: 'https://picsum.photos/seed/taxiproduct0/800/600' } },
    { name: 'City Ride', price: '$19.00', img: { src: 'https://tse2.mm.bing.net/th/id/OIP.ma78G8uvCNgc-jAmcR84IAHaE7?pid=Api&P=0&h=180', fallback: 'https://picsum.photos/seed/taxiproduct1/800/600' } },
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
          name: 'Maria Wilson',
          role: 'Frequent Rider',
          feedback: 'Clean car, friendly driver, and right on time. Booking was super easy.',
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
    <div className="min-h-screen bg-[#0f0f0f] text-[#eaeaea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={profileData?.bannerImg || "https://vault.com/_next/image?url=https:%2F%2Ffcg.infobase.com%2Fmedia%2Fko0ghf3w%2Ftrn-taxdri-001-h.jpg&w=1200&q=75"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/taxihero/1600/400'}}
            alt="Taxi hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#161616] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/taxiprofile/200/200'}}
              alt="Driver profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">{profileData?.name || "Jeff Murray"}</h1>
              <p className="text-[#a9a9a9]">{profileData?.profession || "Taxi Services • 24/7 Rides"}</p>
              <div className="mt-3 flex gap-2">
                {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon || !url) return null;
                  return (
                    <a key={platform} href={url} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#000' }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Email</p>
            <p className="font-medium break-all">{profileData?.email || "rides@citycab.com"}</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Phone</p>
            <p className="font-medium break-all">{profileData?.phone1 || "+1 (555) 220-7788"}</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Website</p>
            <p className="font-medium break-all">{profileData?.websiteLink || "citycab.rides"}</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Location</p>
            <p className="font-medium break-all">{profileData?.location || "NYC, USA"}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s, index) => (
              <div key={index} className="rounded-2xl bg-[#161616] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-black text-lg">🚕</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#a9a9a9]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#161616] p-6 shadow">
            {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Taxi" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[#161616] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#a9a9a9]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-[#161616] p-6 shadow flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                  onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/taxitest/200/200'}}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-[#a9a9a9]">{testimonial.role}</p>
                    </div>
                    <div style={{ color: accent }}>
                      {renderRating(testimonial.rating)}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#cfcfcf]">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TaxiTemplate