import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function CeoTemplate() {
  const accent = '#68a7ff'

  const services = [
    { title: 'Strategy Advisory', desc: 'Vision, KPIs, and execution planning.' },
    { title: 'Leadership Coaching', desc: 'Build high-performing executive teams.' },
    { title: 'Investor Relations', desc: 'Narratives, decks, and board updates.' },
  ]

  const gallery = [
    { src: 'https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo1/800/600' },
    { src: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo2/800/600' },
    { src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo3/800/600' },
    { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo4/800/600' },
  ]

  const products = [
    { name: 'Executive Session', price: '$599.00', img: { src: 'https://images.pexels.com/photos/3182791/pexels-photo-3182791.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo5/800/600' } },
    { name: 'Board Review', price: '$899.00', img: { src: 'https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ceo6/800/600' } },
  ]

  const hours = [
    ['Sunday', '09:00 - 20:00'],
    ['Monday', '09:00 - 20:00'],
    ['Tuesday', '09:00 - 20:00'],
    ['Wednesday', '09:00 - 20:00'],
    ['Thursday', '09:00 - 20:00'],
    ['Friday', '09:00 - 20:00'],
    ['Saturday', '09:00 - 20:00'],
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
    <div className="min-h-screen bg-[#f7fbff] text-[#1f2a3a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/ceohero/1600/400'}}
            alt="Boardroom"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/3711601/pexels-photo-3711601.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/ceoprofile/200/200'}}
              alt="CEO profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Jeremy Wilson</h1>
              <p className="text-[#5c6b80]">CEO • Strategy & Operations</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#fff' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Email</p>
            <p className="font-medium break-all">ceo@bluecorp.com</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Phone</p>
            <p className="font-medium break-all">+1 (555) 640-7771</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Website</p>
            <p className="font-medium break-all">bluecorp.io</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#5c6b80]">Location</p>
            <p className="font-medium break-all">San Francisco, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow">
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
            <div>
              <p className="text-sm text-[#5c6b80]">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-white' : 'text-[#1f2a3a]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#eef2f8' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#eef2f8]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#eef2f8]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#eef2f8] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: accent }}>Make Appointment</button>
            </form>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Corporate" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#5c6b80]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        

      </div>
    </div>
  )
}

export default CeoTemplate
