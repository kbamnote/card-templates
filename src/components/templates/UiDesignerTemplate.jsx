import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function UiDesignerTemplate() {
  const accent = '#68e082'

  const services = [
    { title: 'UI Audits', desc: 'Evaluate usability and consistency across flows.' },
    { title: 'Design Systems', desc: 'Build scalable components and tokens.' },
    { title: 'Prototyping', desc: 'Clickable prototypes for validation and handoff.' },
  ]

  const gallery = [
    // Pexels URLs with robust CDN, with fallback to picsum
    { src: 'https://images.pexels.com/photos/3184458/pexels-photo-3184458.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui1/800/600' },
    { src: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui2/800/600' },
    { src: 'https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui3/800/600' },
    { src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui4/800/600' },
  ]

  const products = [
    { name: 'Landing UI Kit', price: '$49.00', img: { src: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui5/800/600' } },
    { name: 'Mobile UI Kit', price: '$59.00', img: { src: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200', fallback: 'https://picsum.photos/seed/ui6/800/600' } },
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
    <div className="min-h-screen bg-[#0e2f34] text-[#e6f5ee]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://www.training.com.au/wp-content/uploads/graphic-designer.jpeg"
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/uihero/1600/400'}}
            alt="UI workspace"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#132f33] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/uiprofile/200/200'}}
              alt="Designer profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Pallavi Hegde</h1>
              <p className="text-[#9fd0bd]">UI/UX Designer • Design Systems</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#0e2f34' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Email</p>
            <p className="font-medium break-all">design@studio.com</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Phone</p>
            <p className="font-medium break-all">+1 (555) 440-1102</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Website</p>
            <p className="font-medium break-all">studioui.design</p>
          </div>
          <div className="rounded-xl bg-[#132f33] p-4 shadow">
            <p className="text-sm text-[#9fd0bd]">Location</p>
            <p className="font-medium break-all">Remote • Worldwide</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-[#132f33] p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent }}>
                  <div className="w-full h-full flex items-center justify-center text-[#0e2f34] text-lg">▣</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#9fd0bd]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-[#132f33] p-6 shadow">
            <div>
              <p className="text-sm text-[#9fd0bd]">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-[#0e2f34]' : 'text-[#e6f5ee]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#1b3f44' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#1b3f44] text-[#e6f5ee]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#1b3f44] text-[#e6f5ee]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#1b3f44] text-[#e6f5ee] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: accent, color: '#0e2f34' }}>Make Appointment</button>
            </form>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <img key={i} src={g.src} onError={(e)=>{e.currentTarget.src=g.fallback}} alt="Design" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={p.name} className="rounded-2xl bg-[#132f33] shadow overflow-hidden">
                <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#9fd0bd]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <div className="mt-6 rounded-2xl bg-[#132f33] p-6 shadow flex items-start gap-4">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400"
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/uitest/200/200'}}
              alt="Reviewer"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alex Romero</p>
                  <p className="text-sm text-[#9fd0bd]">Product Manager</p>
                </div>
                <div style={{ color: accent }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#cfe9de]">Design system implementation was smooth and reduced our dev cycles significantly.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UiDesignerTemplate
