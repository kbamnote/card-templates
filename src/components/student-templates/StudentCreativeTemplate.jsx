import { useState } from 'react'
import { Instagram, Facebook, Twitter, Linkedin, Github, Phone, Mail, MapPin, Calendar, BookOpen, Award, User, GraduationCap, Briefcase, Code, Palette, Camera, Music, PenTool, Heart } from 'lucide-react'

function StudentCreativeTemplate({ profileData }) {
  const accent = profileData?.accentColor || '#ec4899'

  // Use actual profile data instead of hardcoded defaults
  const skills = profileData?.skills || []
  const projects = profileData?.projects || []
  const education = profileData?.education || []
  const interests = profileData?.interests || []
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

  // Category icons mapping
  const categoryIcons = {
    'Design': Palette,
    'UI/UX': User,
    'Web Dev': Code,
    'Photography': Camera,
    'Music': Music
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Image Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl">
          <img
            src={profileData?.bannerPic || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"}
            onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/studentbanner/1200/400'}}
            alt="Banner"
            className="w-full h-40 sm:h-64 object-cover opacity-80"
          />
        </section>
        
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl -mt-16 sm:-mt-20 z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative px-6 py-12 sm:py-20 sm:px-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white bg-opacity-20 blur-lg"></div>
                <img
                  src={profileData?.profilePic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"}
                  onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name='+encodeURIComponent(profileData?.fullName || "Student Name")+'&background=random'}}
                  alt="Profile"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl mx-auto lg:mx-0"
                />
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-md">{profileData?.fullName || "Student Name"}</h1>
                <p className="text-xl sm:text-2xl mt-2 opacity-90">{profileData?.about || "Student"}</p>
                {profileData?.about && (
                  <p className="mt-4 max-w-2xl text-lg opacity-90">{profileData.about}</p>
                )}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                  {Object.entries(profileData?.socialMedia || {}).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    if (!Icon || !url) return null;
                    return (
                      <a key={platform} href={url} className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 transition backdrop-blur-sm">
                        <Icon size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: accent + '20', color: accent }}>
              <Palette size={24} />
            </div>
            <p className="mt-3 font-bold text-2xl">25+</p>
            <p className="text-sm text-gray-600">Projects</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: accent + '20', color: accent }}>
              <Award size={24} />
            </div>
            <p className="mt-3 font-bold text-2xl">12</p>
            <p className="text-sm text-gray-600">Awards</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: accent + '20', color: accent }}>
              <GraduationCap size={24} />
            </div>
            <p className="mt-3 font-bold text-2xl">3.9</p>
            <p className="text-sm text-gray-600">GPA</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: accent + '20', color: accent }}>
              <Briefcase size={24} />
            </div>
            <p className="mt-3 font-bold text-2xl">4</p>
            <p className="text-sm text-gray-600">Internships</p>
          </div>
        </section>

        {/* About & Education */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User size={24} />
              About Me
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {profileData?.about || "About information not provided"}
            </p>
            
            <h3 className="text-xl font-bold mt-6 flex items-center gap-2">
              <Heart size={20} />
              Interests
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span key={index} className="px-3 py-2 rounded-full text-sm flex items-center gap-1" style={{ backgroundColor: accent + '10', color: accent }}>
                  <Heart size={16} />
                  {interest.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap size={24} />
              Education
            </h2>
            <div className="mt-6 space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4">
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

        {/* Skills */}
        <section className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Skills & Expertise</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
                    <Code size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full" 
                    style={{ width: `${skill.level}%`, backgroundColor: accent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '20', color: accent }}>
                    <Palette size={32} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{project.description || project.desc}</p>
                    </div>
                    {project.category && (
                      <span className="text-xs px-2 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: accent + '10', color: accent }}>
                        {project.category}
                      </span>
                    )}
                  </div>
                  {(project.link || project.githubUrl) && (
                    <a 
                      href={project.link || project.githubUrl} 
                      className="mt-4 inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: accent, color: 'white' }}
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
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase size={24} />
              Experience
            </h2>
            <div className="mt-6 space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '20', color: accent }}>
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="font-medium">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <p className="text-sm text-gray-600">
                        {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} - 
                        {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award size={24} />
              Achievements
            </h2>
            <div className="mt-6 space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '20', color: accent }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
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

export default StudentCreativeTemplate