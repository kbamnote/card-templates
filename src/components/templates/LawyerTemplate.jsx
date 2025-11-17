import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function LawyerTemplate() {
  const accent = '#d4af37'

  const services = [
    { title: 'Legal Advice', desc: 'Consultations on civil and corporate matters.' },
    { title: 'Contract Drafting', desc: 'Precise agreements and legal documentation.' },
    { title: 'Litigation Support', desc: 'Case strategy and representation guidance.' },
  ]

  const gallery = [
    { src: 'https://images.pexels.com/photos/4427621/pexels-photo-4427621.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law1/800/600' },
    { src: 'https://images.pexels.com/photos/4427620/pexels-photo-4427620.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law2/800/600' },
    { src: 'https://images.pexels.com/photos/4427618/pexels-photo-4427618.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law3/800/600' },
    { src: 'https://images.pexels.com/photos/4427619/pexels-photo-4427619.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law4/800/600' },
  ]

  const products = [
    { name: 'Initial Consultation', price: '$99.00', img: { src: 'https://images.pexels.com/photos/4427621/pexels-photo-4427621.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law5/800/600' } },
    { name: 'Contract Review', price: '$199.00', img: { src: 'https://images.pexels.com/photos/4427620/pexels-photo-4427620.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/law6/800/600' } },
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
    <div className="min-h-screen bg-[#0f0f0f] text-[#eaeaea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://img.freepik.com/free-vector/gradient-luxury-law-firm-twitter-header_23-2149340608.jpg"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/lawhero/1600/400'}}
            alt="Law office"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#151515] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/lawprofile/200/200'}}
              alt="Lawyer profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Mary Jordan</h1>
              <p className="text-[#bfbfbf]">Attorney • Civil & Corporate</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0f0f0f' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Email</p>
            <p className="font-medium break-all">law@firm.com</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Phone</p>
            <p className="font-medium break-all">+1 (555) 411-7860</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Website</p>
            <p className="font-medium break-all">jordanlaw.co</p>
          </div>
          <div className="rounded-xl bg-[#151515] p-4 shadow">
            <p className="text-sm text-[#bfbfbf]">Location</p>
            <p className="font-medium break-all">Boston, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-[#151515] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#0f0f0f] text-lg">§</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#bfbfbf]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#151515] p-6 shadow">
            <div>
              <p className="text-sm text-[#bfbfbf]">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-[#0f0f0f]' : 'text-[#eaeaea]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#1f1f1f' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#1f1f1f] text-[#eaeaea]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#1f1f1f] text-[#eaeaea]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#1f1f1f] text-[#eaeaea] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: accent, color: '#0f0f0f' }}>Make Appointment</button>
            </form>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Law" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-[#151515] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#bfbfbf]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  )
}

export default LawyerTemplate
