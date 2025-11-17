import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

function HandyManTemplate() {
  const accent = '#ef6b3b'

  const services = [
    { title: 'Home Repairs', desc: 'Quick fixes for doors, walls, faucets, and more.' },
    { title: 'Electrical & AC', desc: 'Minor wiring, fixtures, AC servicing and maintenance.' },
    { title: 'Installations', desc: 'Shelves, curtains, TV mounts, appliances setup.' },
  ]

  const gallery = [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    'https://tse3.mm.bing.net/th/id/OIP.l4TE5hEuFgr6DPGXzHET1AHaE7?pid=Api&P=0&h=180',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    'https://tse2.mm.bing.net/th/id/OIF.Lw9ZbYywnJNZ5jw9PIuLhA?pid=Api&P=0&h=180',
  ]

  const products = [
    { name: 'Service Package A', price: '$59.00', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Service Package B', price: '$99.00', img: 'https://www.onehourairftworth.com/wp-content/uploads/2018/12/7-Things-to-Remember-When-Choosing-an-Air-Conditioner-Repair-Company-_-Air-Conditioning-Service-in-Fort-Worth-TX.jpg' },
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
    <div className="min-h-screen bg-[#f7f7f7] text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://www.enrgtech.co.uk/blog/wp-content/uploads/2024/06/DALL%C2%B7E-2024-06-14-19.04.16-A-well-organized-beginners-workshop-with-essential-tools-neatly-arranged-on-a-workbench-and-wall-mounted-tool-racks.-The-tools-include-a-hammer-scre-1024x585.png"
            alt="Workshop hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Manhush Shane</h1>
              <p className="text-[#666]">Handyman • Repairs & Installations</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ef6b3b', color: '#fff' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Email</p>
            <p className="font-medium break-all">work@handypro.com</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Phone</p>
            <p className="font-medium break-all">+1 (555) 889-2211</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Website</p>
            <p className="font-medium break-all">handypro.services</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Location</p>
            <p className="font-medium break-all">New York, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow">
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
          <div className="mt-4 rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
              alt="Appointment"
              className="w-full h-44 sm:h-[260px] object-cover"
            />
            <div className="p-6 sm:absolute sm:inset-0 sm:p-8 sm:flex sm:items-center sm:justify-between gap-6">
              <div className="bg-white sm:bg-white/10 sm:text-white rounded-xl p-4 sm:p-5 shadow">
                <p className="text-sm">Select a slot:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-white' : 'text-[#333]'}`}
                      style={{ backgroundColor: slot===t ? accent : '#f7f7f7' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAppointment} className="mt-4 sm:mt-0 bg-white rounded-xl p-4 sm:p-5 shadow w-full sm:w-[380px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#f7f7f7]" />
                  <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#f7f7f7]" />
                  <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#f7f7f7] col-span-1 sm:col-span-2" />
                </div>
                <button className="mt-4 w-full px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: accent }}>Make Appointment</button>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="Work" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white shadow overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#666]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
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
                  <p className="font-medium">Leonard Sanders</p>
                  <p className="text-sm text-[#666]">Homeowner</p>
                </div>
                <div className="text-[${accent}]" style={{ color: accent }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#555]">Prompt, professional, and transparent pricing. Fixed our AC and mounted shelves perfectly.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HandyManTemplate
