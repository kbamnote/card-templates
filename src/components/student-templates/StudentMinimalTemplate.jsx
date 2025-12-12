import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Github, Phone, Mail, MapPin, Calendar, BookOpen, Award, User, GraduationCap, Briefcase } from 'lucide-react'

function StudentMinimalTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#0ea5e9'

  // Use actual profile data instead of hardcoded defaults
  const skills = profileData?.skills || []
  const projects = profileData?.projects || []
  const education = profileData?.education || []
  const experience = profileData?.experience || []
  const achievements = profileData?.achievements || []

  // Social media icons mapping
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    youtube: User
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Image Section */}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            src={profileData?.bannerPic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/studentbanner/1200/400'}}
            alt="Banner"
            className="w-full h-40 object-cover"
          />
        </section>
        
        {/* Profile Header */}
        <div className="text-center -mt-16 z-10 relative">
          <img
            src={profileData?.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name='+encodeURIComponent(profileData?.fullName || "Student Name")+'&background=random'}}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow"
          />
          <h1 className="text-3xl font-bold mt-4">{profileData?.fullName || "Student Name"}</h1>
          <p className="text-xl text-gray-600 mt-1">{profileData?.about || "Student"}</p>
          
          <div className="mt-4 flex justify-center gap-3">
            {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon || !url) return null;
              return (
                <a key={platform} href={url} className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow hover:shadow-md transition" style={{ color: accent }}>
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '10', color: accent }}>
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
              <p className="font-medium text-sm break-all">{profileData?.email || "student@example.com"}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '10', color: accent }}>
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
              <p className="font-medium text-sm break-all">{profileData?.phone1 || "Phone not provided"}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '10', color: accent }}>
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
              <p className="font-medium text-sm break-all">{profileData?.location || "Location not provided"}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-10 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User size={20} />
            About
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {profileData?.about || "About information not provided"}
          </p>
        </div>

        {/* Education */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GraduationCap size={20} />
            Education
          </h2>
          <div className="mt-4 space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: accent + '10', color: accent }}>
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold">Technical Skills</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ width: `${skill.level}%`, backgroundColor: accent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="border-l-4 pl-4 py-2 hover:bg-gray-50 transition" style={{ borderLeftColor: accent }}>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.desc}</p>
                <a href={project.link} className="mt-2 inline-flex items-center text-sm font-medium" style={{ color: accent }}>
                  View Details
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={20} />
              Experience
            </h2>
            <div className="mt-4 space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award size={20} />
              Achievements
            </h2>
            <div className="mt-4 space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 pl-4 py-2 hover:bg-gray-50 transition" style={{ borderLeftColor: accent }}>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentMinimalTemplate