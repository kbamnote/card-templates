# Student Templates Implementation

This document explains how student templates have been implemented in the card-templates project.

## Overview

Student templates are designed to be separate from client templates, with IDs starting from `template111` to avoid conflicts with client templates which start from `template1`.

## Implementation Details

### 1. Student Template Components
Five student templates have been created:
- `template111` - Student Base Template
- `template112` - Student Portfolio Template
- `template113` - Student Minimal Template
- `template114` - Student Creative Template
- `template115` - Student Dark Template

### 2. API Integration
Student-specific API endpoints have been added:
- `/api/student-profile/` - For creating and managing student profiles
- `/api/student-profile/me` - For accessing authenticated student's profile
- `/api/student-profile/upload/profile-pic` - For uploading profile pictures
- `/api/student-profile/upload/banner-pic` - For uploading banner pictures

### 3. Role-Based Routing
The application now detects the user's role (client or student) and routes them appropriately:
- Students are directed to student-specific endpoints and templates
- Clients continue to use the existing client endpoints and templates

### 4. Key Files Modified/Added

#### New Files:
- `src/components/student-templates/` directory with 5 template components
- `src/components/pages/DashboardPage.jsx` - Main dashboard for template selection
- `src/components/student-templates/StudentTemplateSelector.jsx` - Template selector for students

#### Modified Files:
- `src/utils/Api.jsx` - Added student profile API functions and role detection
- `src/components/pages/OnboardingPage.jsx` - Updated to handle student roles
- `src/components/auth/LoginPage.jsx` - Updated to handle student roles
- `src/App.jsx` - Added dashboard route
- `src/components/templates/TemplateRenderer.jsx` - Added student template mappings

## How It Works

1. **User Authentication**: When a user logs in, the system decodes their JWT token to determine their role (client or student).

2. **Profile Management**: Based on the role, the application uses the appropriate API endpoints:
   - Students: `/api/student-profile/*`
   - Clients: `/api/profile/*`

3. **Template Selection**: Users can select from templates appropriate to their role:
   - Students: Templates 111-115
   - Clients: Templates 1-23

4. **Template Rendering**: The TemplateRenderer component renders the selected template with the user's profile data.

## Adding New Student Templates

To add new student templates:

1. Create a new JSX component in `src/components/student-templates/`
2. Follow the existing template structure and naming convention
3. Add the template to the `templateMap` in `TemplateRenderer.jsx` with an appropriate ID (continuing the sequence)
4. Update `StudentTemplateSelector.jsx` to include the new template
5. Update this README to reflect the new template

## Testing Student Templates

To test student templates:

1. Sign up as a student (ensure role is set to "student" during signup)
2. Log in to the application
3. Complete the onboarding process
4. Navigate to the dashboard
5. Select from the available student templates
6. Preview the selected template

## Troubleshooting

### 403 Errors
If you encounter 403 errors, ensure:
1. The user is signed up with the correct role ("student")
2. The JWT token contains the correct role information
3. The frontend is using the appropriate API endpoints for the user's role

### Template Not Displaying
If templates aren't displaying correctly:
1. Verify the template ID is correctly mapped in TemplateRenderer.jsx
2. Check that the profile data contains the required fields for the template
3. Ensure all required dependencies are imported correctly