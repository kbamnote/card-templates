import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

function DoctorTemplate() {
  const accent = '#7c6cf0'
  const accent2 = '#ff7bd3'

  const services = [
    { title: 'Health Checkups', desc: 'Comprehensive exams and diagnostics.' },
    { title: 'Pediatric Care', desc: 'Gentle care for kids and teens.' },
    { title: 'Consultations', desc: 'Personalized treatment plans and follow-ups.' },
  ]

  const gallery = [
    'https://img.freepik.com/premium-photo/indian-doctor-with-patient-hospital-clinic_466689-96540.jpg',
    'https://tse3.mm.bing.net/th/id/OIP.LXCG4-xZblVgIIw097P2gQHaE7?pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th/id/OIP.8stxm1jODk_2hwJd8pS5gwHaE8?pid=Api&P=0&h=180',
    'https://img.freepik.com/premium-photo/abdominal-pain-patient-woman-having-medical-exam-with-doctor-illness-from-stomach-cancer_1292509-3501.jpg',
  ]

  const products = [
    { name: 'Care Package A', price: '$79.00', img: 'https://tse4.mm.bing.net/th/id/OIP.XtkjRx3X0ucpanfaKKCT_QHaHa?pid=Api&P=0&h=180' },
    { name: 'Care Package B', price: '$129.00', img: 'https://tse1.mm.bing.net/th/id/OIP.4llKwh4mWy01DiMQmywhkQHaE8?pid=Api&P=0&h=180' },
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
    <div className="min-h-screen text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src="https://backpainsa.com/wp-content/uploads/2015/02/bigstock-Medical-physician-doctor-hands-84721406.jpg"
            alt="Clinic hero"
            className="w-full h-40 sm:h-[320px] object-cover"
          />
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop"
              alt="Doctor profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold">Richard Madden</h1>
              <p className="text-[#666]">MD • General Physician</p>
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
            <p className="text-sm text-[#666]">Email</p>
            <p className="font-medium break-all">care@healthclinic.com</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Phone</p>
            <p className="font-medium break-all">+1 (555) 122-3344</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Website</p>
            <p className="font-medium break-all">healthclinic.care</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-sm text-[#666]">Location</p>
            <p className="font-medium break-all">San Jose, USA</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: accent2 }}>
                  <div className="w-full h-full flex items-center justify-center text-white text-lg">✚</div>
                </div>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-[#666]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Make an Appointment</h2>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow">
            <div>
              <p className="text-sm">Select a slot:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-white' : 'text-[#333]'}`}
                    style={{ backgroundColor: slot===t ? accent : '#f3f0ff' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#f7f5ff]" />
              <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#f7f5ff]" />
              <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#f7f5ff] col-span-1 sm:col-span-2" />
              <button className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: accent }}>Make Appointment</button>
            </form>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="Clinic" className="rounded-xl h-36 sm:h-44 w-full object-cover shadow" />
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
                  <p className="font-medium">James Scott</p>
                  <p className="text-sm text-[#666]">Patient</p>
                </div>
                <div style={{ color: accent2 }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm text-[#555]">Professional, empathetic, and thorough. Booking and follow-up were seamless.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DoctorTemplate
