// Function to format screenshot paths into markdown
function formatScreenshots(screenshots) {
  if (!screenshots) return '';
  const paths = screenshots.split(',').map(path => path.trim());
  return paths.map((path, index) => `![Screenshot ${index + 1}](${path})`).join('\n\n');
}

// Function that returns a license badge based on which license is passed in
function renderLicenseBadge(license) {
  if (license === 'None') return '';
  return `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg)`;
}

// Function that returns the license link
function renderLicenseLink(license) {
  if (license === 'None') return '';
  return `[License](#license)`;
}

// Function that returns the license section of README
function renderLicenseSection(license) {
  if (license === 'None') return '';
  return `## License

This project is licensed under the ${license} license.`;
}

// Function to generate screenshots section
function renderScreenshotsSection(screenshots) {
  if (!screenshots) return '';
  
  const screenshotList = screenshots.split(',').map(screenshot => {
    const trimmedScreenshot = screenshot.trim();
    const fileName = trimmedScreenshot.split('/').pop();
    return `![${fileName}](${trimmedScreenshot})`;
  }).join('\n\n');

  return `## Screenshots

${screenshotList}`;
}

// Function to generate markdown for README
export function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description
${data.description}

## Table of Contents
${generateTableOfContents(data)}

## Installation
${data.installation}

## Usage
${data.usage}

${renderLicenseSection(data.license)}

## Contributing
${data.contributing}

## Tests
${data.tests}

${data.includeScreenshots ? renderScreenshotsSection(data.screenshots) : ''}

## Questions
If you have any questions about the repo, open an issue or contact me directly at ${data.email}. You can find more of my work at [${data.github}](https://github.com/${data.github}).

---

## Features
${data.features || 'Coming soon!'}

## Technologies Used
${data.technologies || 'Node.js, JavaScript'}

## Future Development
${data.futureDevelopment || 'Plans for future development will be added here.'}`;
}

// Helper function to generate table of contents
function generateTableOfContents(data) {
  const sections = [
    'Installation',
    'Usage',
    data.includeScreenshots ? 'Screenshots' : null,
    'License',
    'Contributing',
    'Tests',
    'Questions',
    'Features',
    'Technologies Used',
    'Future Development'
  ].filter(Boolean);

  return sections.map(section => `- [${section}](#${section.toLowerCase().replace(/\s+/g, '-')})`).join('\n');
} 