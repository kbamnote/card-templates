# Elite Digital Cards Templates

A collection of 11 professional digital business card templates built with React and Tailwind CSS.

## Templates Included

1. **CEO Executive** (template1) - Professional corporate design
2. **Developer** (template2) - Tech-focused layout
3. **Doctor** (template3) - Medical professional design
4. **Event Manager** (template4) - Event planning oriented
5. **Hair Dresser** (template5) - Beauty and salon style
6. **Handyman** (template6) - Trade service layout
7. **Interior Design** (template7) - Creative portfolio design
8. **Lawyer** (template8) - Legal professional template
9. **Music Portfolio** (template9) - Artist and musician design
10. **Taxi Service** (template10) - Transportation service layout
11. **UI Designer** (template11) - Creative designer portfolio

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5177 (or the next available port if 5173-5176 are in use).

## UI Components

### Header
The application features a common header with:
- Logo on the left side
- Template selection button on the right side

### Template Selection Modal
When clicking the "Templates" button in the header, a modal opens with:
- Grid of all 11 templates
- "Select" button for each template
- Visual selection indicator
- Close button and "Close" action button

## Integration with Elite Digital Cards Backend

To integrate these templates with your Elite Digital Cards backend:

1. **Update the Profile Model** - Ensure your backend profile model includes a `templateId` field
2. **API Integration** - Fetch profile data from your backend API
3. **Template Selection** - Use the header button to open the template modal
4. **Template Rendering** - Use the `TemplateRenderer` component to display the selected template

### Example Integration

```jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TemplateRenderer from './components/templates/TemplateRenderer';
import TemplateModal from './components/TemplateModal';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch profile data from your backend
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProfileData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const updateTemplate = async (templateId) => {
    try {
      const response = await fetch('/api/profile/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...profileData,
          templateId
        })
      });
      
      if (response.ok) {
        // Update local state
        setProfileData({ ...profileData, templateId });
      }
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onTemplateSelect={openModal} />
      
      <main className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <TemplateRenderer 
              templateId={profileData.templateId} 
              profileData={profileData} 
            />
          </div>
        </div>
      </main>
      
      <TemplateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentTemplate={profileData.templateId}
        onTemplateChange={updateTemplate}
      />
    </div>
  );
}
```

## Customizing Templates

Each template accepts a `profileData` prop with the following structure:

```javascript
{
  name: "John Doe",
  profession: "Job Title",
  email: "email@example.com",
  phone1: "+1234567890",
  location: "City, Country",
  websiteLink: "https://example.com",
  socialMedia: {
    facebook: "https://facebook.com/username",
    instagram: "https://instagram.com/username",
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username",
    youtube: "https://youtube.com/username",
    whatsapp: "+1234567890"
  },
  profileImg: "https://example.com/profile.jpg",
  bannerImg: "https://example.com/banner.jpg",
  templateId: "template1"
}
```

## Technologies Used

- React 19
- Tailwind CSS
- Lucide React Icons
- Vite

## License

This project is licensed under the MIT License.