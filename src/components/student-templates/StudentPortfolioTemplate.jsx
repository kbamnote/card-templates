import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Github, Phone, Mail, MapPin, Calendar, BookOpen, Award, User, GraduationCap, Briefcase } from 'lucide-react'

function StudentPortfolioTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#8b5cf6'

  // Use actual profile data instead of hardcoded defaults
  const skills = profileData?.skills || []
  const projects = profileData?.projects || []
  const experience = profileData?.experience || []
  const education = profileData?.education || []
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Image Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 shadow-xl">
          <img
            src={profileData?.bannerPic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/studentbanner/1200/400'}}
            alt="Banner"
            className="w-full h-40 sm:h-64 object-cover opacity-80"
          />
        </section>
        
        {/* Header Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 shadow-xl text-white -mt-16 sm:-mt-20 z-10">
          <div className="px-6 py-10 sm:py-16 sm:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={profileData?.profilePic || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"}
                onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name='+encodeURIComponent(profileData?.fullName || "Student Name")+'&background=random'}}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">{profileData?.fullName || "Student Name"}</h1>
                <p className="text-xl sm:text-2xl opacity-90 mt-1">{profileData?.about || "Student"}</p>
                {profileData?.about && (
                  <p className="mt-3 max-w-2xl opacity-90">{profileData.about}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    if (!Icon || !url) return null;
                    return (
                      <a key={platform} href={url} className="w-10 h-10 rounded-full flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-sm break-all">{profileData?.email || "student@example.com"}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium text-sm break-all">{profileData?.phone1 || "Phone not provided"}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Education</p>
              <p className="font-medium text-sm break-all">{profileData?.education?.length > 0 ? "See education section" : "Not provided"}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm break-all">{profileData?.location || "Location not provided"}</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase size={24} />
              Technical Skills
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%`, backgroundColor: accent }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase size={24} />
              Experience
            </h2>
            <div className="mt-6 space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 pl-4 py-1" style={{ borderLeftColor: accent }}>
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <p className="font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                  <p className="mt-2 text-gray-600">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap size={24} />
              Education
            </h2>
            <div className="mt-6 space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '20', color: accent }}>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="font-medium">{edu.school}</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <p className="text-sm text-gray-600">{edu.year}</p>
                      <p className="text-sm font-medium" style={{ color: accent }}>GPA: {edu.gpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="mt-6 grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-xl p-5 hover:shadow-md transition-shadow" style={{ borderColor: accent + '40' }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="mt-2 text-gray-600">{project.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech?.split(', ').map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: accent + '20', color: accent }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={project.link} 
                      className="self-start px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
                      style={{ backgroundColor: accent, color: 'white' }}
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award size={24} />
                Achievements
              </h2>
              <div className="mt-6 space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award size={20} style={{ color: accent }} className="flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default StudentPortfolioTemplate