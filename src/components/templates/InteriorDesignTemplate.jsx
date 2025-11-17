import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

function InteriorDesignTemplate() {
  const services = [
    { title: 'Space Planning', desc: 'Functional layouts tailored to your lifestyle.' },
    { title: 'Color & Material', desc: 'Palette, textures, and finishes for harmony.' },
    { title: 'Budget & Sourcing', desc: 'Curated pieces within your budget.' },
  ]

  const gallery = [
    'https://i.redd.it/sv2pkz4h35r11.jpg',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop',
  ]

  const products = [
    { name: 'Nadia Lounge Chair', price: '$249.00', img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Arlo Fabric Sofa', price: '$599.00', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Mori Coffee Table', price: '$179.00', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop' },
  ]

  const hours = [
    ['Saturday', '09:00 - 20:00'],
    ['Sunday', '09:00 - 20:00'],
    ['Monday', '09:00 - 20:00'],
    ['Tuesday', '09:00 - 20:00'],
    ['Wednesday', '09:00 - 20:00'],
    ['Thursday', '09:00 - 20:00'],
    ['Friday', '09:00 - 20:00'],
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

  function handleContact(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('cname')
    const email = form.get('email')
    const phone = form.get('cphone')
    const message = form.get('message')
    alert(`Message from ${name} (${email}, ${phone}): ${message}`)
  }

  return (
    <div className="min-h-screen bg-[#f5f3ed] text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop"
            alt="Interior hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Jeff Murray</h1>
              <p className="text-[#78836e]">Interior Designer</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f5c157', color: '#000' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Phone</p>
            <p className="font-medium break-all">+1 (555) 339-1200</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Email</p>
            <p className="font-medium break-all">jeff@studio.com</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Website</p>
            <p className="font-medium break-all">studiojeff.design</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#78836e]">Location</p>
            <p className="font-medium break-all">NYC, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow">
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
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="Project" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop"
              alt="Appointment"
              className="w-full h-44 sm:h-[280px] object-cover"
            />
            <div className="hidden sm:block absolute inset-0 bg-[#1f1f1f]/50" />
            <div className="p-6 sm:absolute sm:inset-0 sm:p-8 sm:flex sm:items-center sm:justify-between gap-6">
              <div className="text-[#1f1f1f] sm:text-white">
                <h3 className="text-xl sm:text-2xl font-semibold">Make an Appointment</h3>
                <p className="text-sm sm:text-white/80 mt-1">Select a slot and book instantly.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['10:00','12:30','14:00','16:30'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'bg-[#f5c157] text-black' : 'bg-[#f5f3ed] text-[#333] sm:bg-white/20 sm:text-white'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAppointment} className="mt-4 sm:mt-0 bg-white rounded-xl p-4 sm:p-5 shadow w-full sm:w-[380px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#f5f3ed]" />
                  <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#f5f3ed]" />
                  <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#f5f3ed] col-span-1 sm:col-span-2" />
                </div>
                <button className="mt-4 w-full px-4 py-2 rounded-lg bg-[#f5c157] text-black font-medium">Make Appointment</button>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
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
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <div className="mt-6 rounded-2xl bg-white p-6 shadow flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
              alt="Reviewer"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">James Brown</p>
                  <p className="text-sm text-[#78836e]">Homeowner</p>
                </div>
                <div className="text-[#f5c157]">★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#555]">Jeff transformed our apartment with warm tones and clever zoning. We loved the process and the result exceeded expectations.</p>
            </div>
          </div>
        </section>

        

        

        

        

        
      </div>
    </div>
  )
}

export default InteriorDesignTemplate
