import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Github, Phone, Mail, MapPin, Calendar, BookOpen, Award, User } from 'lucide-react'

function StudentBaseTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#3b82f6'

  // Use actual profile data instead of hardcoded defaults
  const skills = profileData?.skills || []
  const projects = profileData?.projects || []
  const education = profileData?.education || []
  const achievements = profileData?.achievements || []
  const experience = profileData?.experience || []

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Image Section */}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
          <img
            src={profileData?.bannerPic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/studentbanner/1200/400'}}
            alt="Banner"
            className="w-full h-40 sm:h-56 object-cover"
          />
        </section>
        
        {/* Header Section */}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-xl -mt-16 sm:-mt-20 z-10">
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <img
                src={profileData?.profilePic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"}
                onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name='+encodeURIComponent(profileData?.fullName || "Student Name")+'&background=random'}}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="pb-2 sm:pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{profileData?.fullName || "Student Name"}</h1>
                <p className="text-blue-600 text-lg">{profileData?.about || "Student"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    if (!Icon || !url) return null;
                    return (
                      <a key={platform} href={url} className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow" style={{ color: accent }}>
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
          <div className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <span className="text-sm">Email</span>
            </div>
            <p className="font-medium mt-1 break-all">{profileData?.email || "student@example.com"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={18} />
              <span className="text-sm">Phone</span>
            </div>
            <p className="font-medium mt-1 break-all">{profileData?.phone1 || "Phone not provided"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span className="text-sm">Date of Birth</span>
            </div>
            <p className="font-medium mt-1 break-all">{profileData?.dob ? new Date(profileData.dob).toLocaleDateString() : "Not provided"}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span className="text-sm">Location</span>
            </div>
            <p className="font-medium mt-1 break-all">{profileData?.location || "Location not provided"}</p>
          </div>
        </section>

        {/* About Section */}
        {profileData?.about && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <User size={24} />
                About Me
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award size={24} />
                Education
              </h2>
              <div className="mt-6 space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 pl-4 py-1" style={{ borderLeftColor: accent }}>
                    <h3 className="font-bold text-lg">{edu.degree}{edu.major ? `, ${edu.major}` : ''}</h3>
                    <p className="text-gray-600">{edu.institution || edu.school}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} - 
                      {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="mt-6 space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ width: `${skill.level || 0}%`, backgroundColor: accent }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">Projects</h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="border rounded-xl p-5 hover:shadow-md transition-shadow" style={{ borderColor: accent }}>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{project.description || project.desc}</p>
                    {(project.link || project.githubUrl) && (
                      <a 
                        href={project.link || project.githubUrl} 
                        className="mt-3 inline-flex items-center text-sm font-medium" 
                        style={{ color: accent }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <User size={24} />
                Experience
              </h2>
              <div className="mt-6 space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 pl-4 py-1" style={{ borderLeftColor: accent }}>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} - 
                      {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {exp.description}
                      </p>
                    )}
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

export default StudentBaseTemplate