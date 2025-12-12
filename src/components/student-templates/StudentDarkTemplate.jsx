import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Github, Phone, Mail, MapPin, Calendar, BookOpen, Award, User, GraduationCap, Briefcase, Code, Palette, Camera, Music, PenTool, Moon } from 'lucide-react'

function StudentDarkTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#8b5cf6'

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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Image Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-2xl">
          <img
            src={profileData?.bannerPic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/studentbanner/1200/400'}}
            alt="Banner"
            className="w-full h-40 sm:h-64 object-cover opacity-80"
          />
        </section>
        
        {/* Header Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-2xl -mt-16 sm:-mt-20 z-10">
          <div className="absolute top-0 right-0 m-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
              <Moon size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="px-6 py-10 sm:py-16 sm:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 blur-lg opacity-70"></div>
                <img
                  src={profileData?.profilePic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"}
                  onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name='+encodeURIComponent(profileData?.fullName || "Student Name")+'&background=random'}}
                  alt="Profile"
                  className="relative w-36 h-36 rounded-full object-cover border-4 border-gray-800 shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">{profileData?.fullName || "Student Name"}</h1>
                <p className="text-xl sm:text-2xl mt-1" style={{ color: accent }}>{profileData?.about || "Student"}</p>
                {profileData?.about && (
                  <p className="mt-4 max-w-2xl text-gray-300">{profileData.about}</p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    if (!Icon || !url) return null;
                    return (
                      <a key={platform} href={url} className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 transition">
                        <Icon size={20} style={{ color: accent }} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-gray-800 p-5 shadow border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20' }}>
                <Mail size={20} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                <p className="font-medium mt-1 break-all text-sm">{profileData?.email || "student@example.com"}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-800 p-5 shadow border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20' }}>
                <Phone size={20} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="font-medium mt-1 break-all text-sm">{profileData?.phone1 || "Phone not provided"}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-800 p-5 shadow border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20' }}>
                <GraduationCap size={20} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Education</p>
                <p className="font-medium mt-1 break-all text-sm">{profileData?.education?.length > 0 ? "See education section" : "Not provided"}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-800 p-5 shadow border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20' }}>
                <MapPin size={20} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                <p className="font-medium mt-1 break-all text-sm">{profileData?.location || "Location not provided"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-gray-800 p-6 shadow border border-gray-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase size={24} style={{ color: accent }} />
              Experience
            </h2>
            <div className="mt-6 space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="pb-6 border-b border-gray-700 last:border-0 last:pb-0">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <p className="font-medium" style={{ color: accent }}>{exp.company}</p>
                  <p className="text-sm text-gray-400 mt-1">{exp.duration}</p>
                  <p className="mt-3 text-gray-300">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl bg-gray-800 p-6 shadow border border-gray-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap size={24} style={{ color: accent }} />
              Education
            </h2>
            <div className="mt-6 space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '20' }}>
                    <BookOpen size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="font-medium text-gray-300">{edu.school}</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <p className="text-sm text-gray-400">{edu.year}</p>
                      <p className="text-sm font-medium" style={{ color: accent }}>GPA: {edu.gpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8 rounded-2xl bg-gray-800 p-6 shadow border border-gray-700">
          <h2 className="text-2xl font-bold">Technical Skills</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ width: `${skill.level}%`, backgroundColor: accent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8 rounded-2xl bg-gray-800 p-6 shadow border border-gray-700">
          <h2 className="text-2xl font-bold">Projects</h2>
          <div className="mt-6 grid grid-cols-1 gap-5">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-700 rounded-xl p-5 hover:bg-gray-750 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="mt-2 text-gray-300">{project.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech?.split(', ').map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: accent + '20', color: accent }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a 
                    href={project.link} 
                    className="self-start px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border"
                    style={{ backgroundColor: 'transparent', borderColor: accent, color: accent }}
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="mt-8 rounded-2xl bg-gray-800 p-6 shadow border border-gray-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award size={24} style={{ color: accent }} />
              Achievements
            </h2>
            <div className="mt-6 space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '20' }}>
                    <Award size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default StudentDarkTemplate