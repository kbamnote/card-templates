# Student Templates

This directory contains templates specifically designed for student profiles.

## Template IDs

Student templates use IDs starting from `template111`:

- `template111` - Student Base Template
- `template112` - Student Portfolio Template
- `template113` - Student Minimal Template
- `template114` - Student Creative Template
- `template115` - Student Dark Template

## Adding New Student Templates

To add a new student template:

1. Create a new JSX file in this directory
2. Follow the component structure of existing templates
3. Import the new template in `../templates/TemplateRenderer.jsx`
4. Add the template to the `templateMap` with an appropriate ID (continue the sequence: template116, template117, etc.)
5. Update `StudentTemplateSelector.jsx` to include the new template in the selection UI

## Template Structure Guidelines

All student templates should:

- Accept a `profileData` prop
- Handle missing data gracefully with fallback values
- Be responsive and mobile-friendly
- Use a consistent color scheme that can be customized with `profileData.accentColor`
- Include common student sections like:
  - Education
  - Skills
  - Projects
  - Experience (internships, volunteer work, etc.)