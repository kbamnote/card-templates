import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateRenderer from '../templates/TemplateRenderer';
import logo from '../../assets/br-logo.png'
import { studentProfileRead, studentSkillsRead, studentEducationsRead, studentExperiencesRead, studentProjectsRead, studentAchievementsRead } from '../../utils/Api';

const StudentLandingPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all student data in parallel
      const [
        profileResponse, 
        skillsResponse, 
        educationsResponse, 
        experiencesResponse, 
        projectsResponse, 
        achievementsResponse
      ] = await Promise.all([
        studentProfileRead(),
        studentSkillsRead(),
        studentEducationsRead(),
        studentExperiencesRead(),
        studentProjectsRead(),
        studentAchievementsRead()
      ]);

      // Process profile data
      if (profileResponse.data.success) {
        const profile = profileResponse.data.data;
        console.log('Profile data:', profile);
        // Check if essential fields are filled
        if (!profile.fullName || !profile.email) {
          // Redirect to student onboarding if essential fields are missing
          navigate('/student-onboarding');
          return;
        }
        
        // Preserve original field names from API response
        setProfileData({
          ...profile,
          templateId: profile.templateId || 'template111' // Default to first student template
        });
      } else {
        setError('Failed to fetch profile data');
        // Redirect to student onboarding if no profile data
        navigate('/student-onboarding');
        return;
      }

      // Process skills data
      if (skillsResponse.data.success) {
        setSkillsData(skillsResponse.data.data || []);
      }

      // Process education data
      if (educationsResponse.data.success) {
        setEducationData(educationsResponse.data.data || []);
      }

      // Process experience data
      if (experiencesResponse.data.success) {
        setExperienceData(experiencesResponse.data.data || []);
      }

      // Process projects data
      if (projectsResponse.data.success) {
        setProjectsData(projectsResponse.data.data || []);
      }

      // Process achievements data
      if (achievementsResponse.data.success) {
        setAchievementsData(achievementsResponse.data.data || []);
      }
    } catch (err) {
      // If it's a 404 error, redirect to student onboarding as the user doesn't have a profile yet
      if (err.response && err.response.status === 404) {
        navigate('/student-onboarding');
      } else {
        setError('Error fetching data: ' + (err.response?.data?.message || err.message));
        // Redirect to student onboarding if there's an error fetching data
        navigate('/student-onboarding');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (templateId) => {
    console.log('Template selected:', templateId);
    setProfileData(prev => ({
      ...prev,
      templateId
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
            <img src={logo} alt="Loading" className="h-8 w-8 absolute inset-0 m-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-300 font-medium">Error: {error}</div>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-200 font-medium">No profile data found</div>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Combine all data for templates
  const templateData = {
    ...profileData,
    skills: skillsData,
    education: educationData,
    experience: experienceData,
    projects: projectsData,
    achievements: achievementsData
  };

  return (
    <div className="min-h-screen bg-zinc-900 md:py-6">
      <div className="md:max-w-6xl md:mx-auto md:px-6 lg:px-8">
        
        {/* Template Preview */}
        <div className="bg-white overflow-hidden mb-4">
          <TemplateRenderer 
            templateId={profileData.templateId} 
            profileData={templateData} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default StudentLandingPage;