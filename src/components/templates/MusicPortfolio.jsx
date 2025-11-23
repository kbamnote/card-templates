import React, { useState } from "react";
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
import { handleAppointmentSubmit, renderAppointmentForm } from './AppointmentUtils';

export default function MusicPortfolio({ profileData }) {
  const [slot, setSlot] = useState('10:00');
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [appointmentMessage, setAppointmentMessage] = useState('');
  const [appointmentError, setAppointmentError] = useState('');

  async function handleAppointment(e) {
    await handleAppointmentSubmit(e, setAppointmentLoading, setAppointmentMessage, setAppointmentError, slot);
  }

  // Social media icons mapping
  const socialIcons = {
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
    twitter: <Twitter size={20} />,
    youtube: <Youtube size={20} />,
  };

  const socialColors = {
    instagram: "bg-pink-600",
    facebook: "bg-blue-600",
    twitter: "bg-sky-500",
    youtube: "bg-red-600",
  };

  // Use profile data or fallback to defaults
  const services = profileData?.services || [
    { icon: <Mic2 size={22} />, label: "Live Shows" },
    { icon: <Headphones size={22} />, label: "Studio Work" },
    { icon: <Guitar size={22} />, label: "Collabs" },
  ];

  const gallery = profileData?.gallery || [
    { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicgallery0/600/400" },
    { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicgallery1/600/400" },
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicgallery2/600/400" },
    { src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicgallery3/600/400" },
    { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicgallery4/600/400" },
  ];

  const products = profileData?.products || [
    {
      name: "Vinyl: Live Sessions",
      price: "$29.00",
      img: { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicproduct0/600/400" },
    },
    {
      name: "T-Shirt: Tour 2025",
      price: "$24.00",
      img: { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=60", fallback: "https://picsum.photos/seed/musicproduct1/600/400" },
    },
  ];

  // Use testimonial data or fallback to defaults
  const testimonials = profileData?.testimonials && profileData.testimonials.length > 0 
    ? profileData.testimonials.map(t => ({
        name: t.testimonialName || 'Anonymous',
        role: 'Client',
        feedback: t.feedback || 'Great service',
        rating: 5
      }))
    : [
        {
          name: 'Jane Doe',
          role: 'Event Organizer',
          feedback: 'The performance was phenomenal. Professional, engaging, and the crowd loved every minute. Booking again for our next event without hesitation.',
          rating: 5
        }
      ];

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-0">
      <div className="w-full bg-[#14142a]/90 text-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-all">
        {/* Header / Banner */}
        <div className="relative w-full">
          <img
            src={profileData?.bannerImg || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/musicportfoliohero/1000/400'}}
            alt="Concert"
            className="w-full h-52 sm:h-60 md:h-72 lg:h-80 xl:h-96 object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 border-4 border-[#14142a] rounded-full overflow-hidden">
            <img
              src={profileData?.profileImg || "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"}
              onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/musicportfolioprofile/200/200'}}
              alt="Musician"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 sm:pt-18 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-8 lg:pb-10 xl:pb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-wide mb-1">
            {profileData?.name || "John Smith"}
          </h2>
          <p className="text-blue-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-4 flex items-center justify-center gap-1">
            <Music size={18} /> {profileData?.profession || "Musician • Live Performer"}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed mb-6 max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            {profileData?.about || "Passionate about creating immersive musical experiences blending jazz, pop, and soul. Available for live events, studio sessions, and collaborations."}
          </p>

          {/* Socials */}
          <div className="flex justify-center flex-wrap gap-3 lg:gap-4 xl:gap-5 mb-6">
            {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
              const icon = socialIcons[platform];
              const color = socialColors[platform];
              if (!icon || !url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  className={`p-3 rounded-full bg-white/10 hover:${color} transition-colors duration-200`}
                >
                  {icon}
                </a>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6 text-left sm:text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90 text-center">
              Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-gray-300 text-sm sm:text-base justify-items-center">
              <div className="flex items-center gap-2">
                <Mail size={18} /> <span>{profileData?.email || "johnsmith@email.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} /> <span>{profileData?.phone1 || "+1 234 567 890"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} /> <span>{profileData?.location || "New York, USA"}</span>
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
              {services.map((service, i) => (
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
              {gallery.map((g, i) => (
                <img
                  key={i}
                  src={g.src}
                  onError={(e)=>{e.currentTarget.src=g.fallback}}
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
            <div className="mt-4 rounded-2xl bg-white/10 p-6 shadow">
              {renderAppointmentForm(handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot)}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 flex items-center gap-2">
                <ShoppingCart size={20} /> Products
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
              {products.map((p, i) => (
                <div key={i} className="bg-white/10 rounded-xl overflow-hidden">
                  <img src={p.img.src} onError={(e)=>{e.currentTarget.src=p.img.fallback}} alt={p.name} className="w-full h-32 sm:h-36 md:h-40 object-cover" />
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
              <Star size={20} /> Testimonials
            </h3>
          </div>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 sm:p-6 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/90 font-medium">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  {renderRating(testimonial.rating)}
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {testimonial.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}