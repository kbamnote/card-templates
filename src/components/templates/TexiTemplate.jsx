import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

function TaxiTemplate() {
  const accent = '#f5c157'

  const services = [
    { title: 'Airport Transfers', desc: 'On-time rides to and from the airport.' },
    { title: 'City Rides', desc: 'Reliable point-to-point rides anywhere in town.' },
    { title: 'Chauffeur & Rentals', desc: 'Hourly bookings with professional drivers.' },
  ]

  const gallery = [
    'https://tse1.mm.bing.net/th/id/OIP.87LQGpCW8p-o0flNgd3p4gHaE8?pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th/id/OIP.YHDGp99mUqeVwoGf_los8gHaEK?pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th/id/OIP.kO6FsF915AFbpjujv1wrKAHaEo?pid=Api&P=0&h=180',
    'https://wallpapers.com/images/hd/lady-in-a-taxi-4u3oytagjgdkxx2c.jpg',
  ]

  const products = [
    { name: 'Airport Ride', price: '$39.00', img: 'https://www.mbaairporttransportation.com/wp-content/uploads/2015/11/mba-pick-up.jpg' },
    { name: 'City Ride', price: '$19.00', img: 'https://tse2.mm.bing.net/th/id/OIP.ma78G8uvCNgc-jAmcR84IAHaE7?pid=Api&P=0&h=180' },
  ]

  const [slot, setSlot] = useState('10:00')

  function handleAppointment(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const phone = form.get('phone')
    const date = form.get('date')
    alert(`Ride booked for ${name} on ${date} at ${slot}. Contact: ${phone}`)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#eaeaea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://vault.com/_next/image?url=https:%2F%2Ffcg.infobase.com%2Fmedia%2Fko0ghf3w%2Ftrn-taxdri-001-h.jpg&w=1200&q=75"
            alt="Taxi hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-[#161616] rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"
              alt="Driver profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Jeff Murray</h1>
              <p className="text-[#a9a9a9]">Taxi Services • 24/7 Rides</p>
              <div className="mt-3 flex gap-2">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent, color: '#000' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Email</p>
            <p className="font-medium break-all">rides@citycab.com</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Phone</p>
            <p className="font-medium break-all">+1 (555) 220-7788</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Website</p>
            <p className="font-medium break-all">citycab.rides</p>
          </div>
          <div className="rounded-xl bg-[#161616] p-4 shadow">
            <p className="text-sm text-[#a9a9a9]">Location</p>
            <p className="font-medium break-all">NYC, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-[#161616] p-6 shadow">
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
          <div className="mt-4 rounded-2xl overflow-hidden relative">
            <img
              src="https://prod-images.tcm.com/Master-Profile-Images/taxidriver1976.16448.jpg"
              alt="Appointment"
              className="w-full h-44 sm:h-[260px] object-cover"
            />
            <div className="p-6 sm:absolute sm:inset-0 sm:p-8 sm:flex sm:items-center sm:justify-between gap-6">
              <div className="bg-[#161616] sm:bg-black/40 sm:text-white rounded-xl p-4 sm:p-5 shadow">
                <p className="text-sm">Select a slot:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['08:00','10:00','12:00','14:00','16:00'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-black' : 'text-[#eaeaea]'}`}
                      style={{ backgroundColor: slot===t ? accent : '#2a2a2a' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAppointment} className="mt-4 sm:mt-0 bg-[#161616] rounded-xl p-4 sm:p-5 shadow w-full sm:w-[380px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#2a2a2a] text-[#eaeaea]" />
                  <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#2a2a2a] text-[#eaeaea]" />
                  <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#2a2a2a] text-[#eaeaea] col-span-1 sm:col-span-2" />
                </div>
                <button className="mt-4 w-full px-4 py-2 rounded-lg text-black font-medium" style={{ backgroundColor: accent }}>Book Ride</button>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="Taxi" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-[#161616] shadow overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-[#a9a9a9]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <div className="mt-6 rounded-2xl bg-[#161616] p-6 shadow flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
              alt="Reviewer"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maria Wilson</p>
                  <p className="text-sm text-[#a9a9a9]">Frequent Rider</p>
                </div>
                <div style={{ color: accent }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#cfcfcf]">Clean car, friendly driver, and right on time. Booking was super easy.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TaxiTemplate
