import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function EventManagerTemplate() {
  const accent = '#ff9a3d'

  const services = [
    { title: 'Venue Design', desc: 'Layouts, lighting, and decor plans.' },
    { title: 'Scheduling & Budget', desc: 'Timelines and cost management end-to-end.' },
    { title: 'Vendor Coordination', desc: 'Catering, music, photography, logistics.' },
  ]

  const gallery = [
    { src: 'https://images.pexels.com/photos/1691813/pexels-photo-1691813.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event1/800/600' },
    { src: 'https://images.pexels.com/photos/1691901/pexels-photo-1691901.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event2/800/600' },
    { src: 'https://images.pexels.com/photos/1769402/pexels-photo-1769402.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event3/800/600' },
    { src: 'https://images.pexels.com/photos/1769406/pexels-photo-1769406.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event4/800/600' },
  ]

  const products = [
    { name: 'Classic Event Pack', price: '$399.00', img: { src: 'https://images.pexels.com/photos/1691901/pexels-photo-1691901.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event5/800/600' } },
    { name: 'Premium Event Pack', price: '$799.00', img: { src: 'https://images.pexels.com/photos/1691813/pexels-photo-1691813.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/event6/800/600' } },
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
    <div className="min-h-screen bg-[#14110f] text-[#f1e9df]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.pexels.com/photos/265938/pexels-photo-265938.jpeg?auto=compress&cs=tinysrgb&w=1600"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/eventhero/1600/400'}}
            alt="Event hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#1b1715] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/eventprofile/200/200'}}
              alt="Manager profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Vanessa Joe</h1>
              <p className="text-[#cdbbaa]">Event Manager • Weddings & Corporate</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#14110f' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Email</p>
            <p className="font-medium break-all">events@grandstudio.com</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Phone</p>
            <p className="font-medium break-all">+1 (555) 660-2214</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Website</p>
            <p className="font-medium break-all">grandstudio.events</p>
          </div>
          <div className="rounded-xl bg-[#1b1715] p-4 shadow">
            <p className="text-sm text-[#cdbbaa]">Location</p>
            <p className="font-medium break-all">Chicago, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-[#1b1715] p-6 shadow">
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
            <div>
              <p className="text-sm text-[#cdbbaa]">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-[#14110f]' : 'text-[#f1e9df]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#2a2320' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#2a2320] text-[#f1e9df] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: accent, color: '#14110f' }}>Make Appointment</button>
            </form>
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
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-[#1b1715] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#cdbbaa]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Business Hours</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {hours.map(([d,h]) => (
              <div key={d} className="rounded-xl bg-[#1b1715] p-4 shadow flex items-center justify-between">
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
