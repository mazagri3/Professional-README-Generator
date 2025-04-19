// Professional README Generator - Markdown Generation Module
// Created by mazagri3 (Obi Mazagri) - Student at OSU Coding Bootcamp
// This module handles the generation of markdown content for the README
// Last updated: [Current Date]

// Function to generate license badge based on selected license
function renderLicenseBadge(license) {
  if (license === 'None') return '';
  // Returns markdown for license badge with proper URL encoding
  return `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg)`;
}

// Function to generate license link in table of contents
function renderLicenseLink(license) {
  if (license === 'None') return '';
  // Returns markdown link to license section
  return `[License](#license)`;
}

// Function to generate license section content
function renderLicenseSection(license) {
  if (license === 'None') return '';
  // Returns formatted license section with proper attribution
  return `## License

This project is licensed under the ${license} license.`;
}

// Function to format screenshot paths into markdown image syntax
function formatScreenshots(screenshots) {
  if (!screenshots) return '';
  // Split comma-separated paths and format each as markdown image
  return screenshots
    .split(',')
    .map(screenshot => `![Screenshot](${screenshot.trim()})`)
    .join('\n\n');
}

// Function to generate markdown for README
function generateMarkdown(data) {
  // Template literal for README content with all sections
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

${data.includeScreenshots ? formatScreenshots(data.screenshots) : ''}

## Questions
If you have any questions about the repo, open an issue or contact me directly at ${data.email}. You can find more of my work at [${data.github}](https://github.com/${data.github}).`;
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
    'Questions'
  ].filter(Boolean);

  // Generate markdown links for each section
  return sections.map(section => `- [${section}](#${section.toLowerCase().replace(/\s+/g, '-')})`).join('\n');
}

export { generateMarkdown };
