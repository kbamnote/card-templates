import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function HairDresserTemplate() {
  const accent = '#f6a444'

  const services = [
    { title: 'Hair Cuts', desc: 'Classic and modern styles tailored to you.' },
    { title: 'Color & Styling', desc: 'Balayage, highlights, and event styling.' },
    { title: 'Care & Treatments', desc: 'Keratin, scalp care, and hydration.' },
  ]

  const gallery = [
    { src: 'https://images.pexels.com/photos/3993130/pexels-photo-3993130.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair1/800/600' },
    { src: 'https://images.pexels.com/photos/3993117/pexels-photo-3993117.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair2/800/600' },
    { src: 'https://images.pexels.com/photos/3998394/pexels-photo-3998394.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair3/800/600' },
    { src: 'https://images.pexels.com/photos/3993313/pexels-photo-3993313.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair4/800/600' },
  ]

  const products = [
    { name: 'Basic Groom Kit', price: '$29.00', img: { src: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair5/800/600' } },
    { name: 'Styling Kit', price: '$49.00', img: { src: 'https://images.pexels.com/photos/3993313/pexels-photo-3993313.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/hair6/800/600' } },
  ]

  const [slot, setSlot] = useState('10:00')

  function handleAppointment(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const phone = form.get('phone')
    const date = form.get('date')
    alert(`Appointment booked for ${name} on ${date} at ${slot}. Contact: ${phone}`)
  }

  return (
    <div className="min-h-screen bg-[#0e3a35] text-[#eae7e4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.pexels.com/photos/3993127/pexels-photo-3993127.jpeg?auto=compress&cs=tinysrgb&w=1600"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/hairhero/1600/400'}}
            alt="Salon hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#103f39] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/3993325/pexels-photo-3993325.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/hairprofile/200/200'}}
              alt="Stylist profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Ezra Miller</h1>
              <p className="text-[#b7d5cf]">Hair Stylist • Color & Grooming</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0e3a35' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Email</p>
            <p className="font-medium break-all">style@salonpro.com</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Phone</p>
            <p className="font-medium break-all">+1 (555) 771-4490</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Website</p>
            <p className="font-medium break-all">salonpro.style</p>
          </div>
          <div className="rounded-xl bg-[#103f39] p-4 shadow">
            <p className="text-sm text-[#b7d5cf]">Location</p>
            <p className="font-medium break-all">Seattle, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-[#103f39] p-6 shadow">
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
            <div>
              <p className="text-sm text-[#b7d5cf]">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-[#0e3a35]' : 'text-[#eae7e4]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#145047' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#145047] text-[#eae7e4]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#145047] text-[#eae7e4]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#145047] text-[#eae7e4] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: accent, color: '#0e3a35' }}>Make Appointment</button>
            </form>
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
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-[#103f39] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#b7d5cf]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <div className="mt-6 rounded-2xl bg-[#103f39] p-6 shadow flex items-start gap-4">
            <img
              src="https://images.pexels.com/photos/4153268/pexels-photo-4153268.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/hairtest/200/200'}}
              alt="Reviewer"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Luna Blake</p>
                  <p className="text-sm text-[#b7d5cf]">Client</p>
                </div>
                <div style={{ color: accent }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#d7e5e1]">Amazing color work and a relaxing experience. Highly recommend!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HairDresserTemplate
