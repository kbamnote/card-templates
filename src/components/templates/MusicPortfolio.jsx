import React from "react";
import {
  Music,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mic2,
  Headphones,
  Guitar,
  ShoppingCart,
  Star,
  Image,
  Clock,
} from "lucide-react";

export default function MusicPortfolio() {
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    alert("Appointment request submitted");
  };
  return (
    <div className="min-h-screen w-full p-0">
      <div className="w-full bg-[#14142a]/90 text-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-all">
        {/* Header / Banner */}
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80"
            alt="Concert"
            className="w-full h-52 sm:h-60 md:h-72 lg:h-80 xl:h-96 object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 border-4 border-[#14142a] rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
              alt="Musician"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 sm:pt-18 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-8 lg:pb-10 xl:pb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-wide mb-1">
            John Smith
          </h2>
          <p className="text-blue-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-4 flex items-center justify-center gap-1">
            <Music size={18} /> Musician • Live Performer
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed mb-6 max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            Passionate about creating immersive musical experiences blending
            jazz, pop, and soul. Available for live events, studio sessions, and collaborations.
          </p>

          {/* Socials */}
          <div className="flex justify-center flex-wrap gap-3 lg:gap-4 xl:gap-5 mb-6">
            {[
              { icon: <Instagram size={20} />, color: "bg-pink-600" },
              { icon: <Facebook size={20} />, color: "bg-blue-600" },
              { icon: <Twitter size={20} />, color: "bg-sky-500" },
              { icon: <Youtube size={20} />, color: "bg-red-600" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`p-3 rounded-full bg-white/10 hover:${item.color} transition-colors duration-200`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6 text-left sm:text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90 text-center">
              Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-gray-300 text-sm sm:text-base justify-items-center">
              <div className="flex items-center gap-2">
                <Mail size={18} /> <span>johnsmith@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} /> <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} /> <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} /> <span>Since 2018</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">
              Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4 text-sm sm:text-base text-gray-300">
              {[
                { icon: <Mic2 size={22} />, label: "Live Shows" },
                { icon: <Headphones size={22} />, label: "Studio Work" },
                { icon: <Guitar size={22} />, label: "Collabs" },
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white/10 p-4 rounded-xl hover:bg-blue-600/40 transition"
                >
                  {service.icon}
                  <span className="mt-1">{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 flex items-center gap-2">
                <Image size={20} /> Gallery
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
              {[
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=60",
               
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=60",

                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=60",
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=600&q=60",
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=60",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Gallery"
                  loading="lazy"
                  className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 flex items-center gap-2">
                <Calendar size={20} /> Make an Appointment
              </h3>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-left">
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm mb-1">Full Name</label>
                <input name="name" required className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Smith" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm mb-1">Email</label>
                <input type="email" name="email" required className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@email.com" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm mb-1">Phone</label>
                <input name="phone" className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 234 567 890" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm mb-1">Date</label>
                <input type="date" name="date" required className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm mb-1">Time</label>
                <input type="time" name="time" required className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <label className="text-gray-300 text-sm mb-1">Message</label>
                <textarea name="message" rows="3" className="bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us about your event" />
              </div>
              <div className="sm:col-span-2 flex justify-center">
                <button type="submit" className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white shadow-lg flex items-center justify-center gap-2">
                  <Calendar size={18} /> Make Appointment
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 flex items-center gap-2">
                <ShoppingCart size={20} /> Products
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
              {[
                {
                  name: "Vinyl: Live Sessions",
                  price: "$29.00",
                  img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=60",
                },
                {
                  name: "T-Shirt: Tour 2025",
                  price: "$24.00",
                  img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=60",
                },
                
              ].map((p, i) => (
                <div key={i} className="bg-white/10 rounded-xl overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-32 sm:h-36 md:h-40 object-cover" />
                  <div className="p-3 text-sm sm:text-base">
                    <div className="flex items-center justify-between">
                      <div className="text-white/90 font-medium">{p.name}</div>
                      <div className="text-blue-400">{p.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white/90 flex items-center gap-2">
              <Star size={20} /> Testimonial
            </h3>
          </div>
          <div className="bg-white/10 rounded-xl p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=60" alt="Reviewer" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-white/90 font-medium">Jane Doe</div>
                  <div className="text-gray-400 text-sm">Event Organizer</div>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              The performance was phenomenal. Professional, engaging, and the crowd loved every minute. Booking again for our next event without hesitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
