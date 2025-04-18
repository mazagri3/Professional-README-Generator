// Professional README Generator
// Created by mazagri3 (Obi Mazagri) - Student at OSU Coding Bootcamp
// This application helps developers create professional README files for their projects
// Last updated: [Current Date]

// Import required modules
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateMarkdown } from './utils/generateMarkdown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array of questions for user input
// These questions will help generate a comprehensive README
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is your project title?',
    // Added validation to ensure title is not empty
    validate: (input) => input.trim() !== '' || 'Please enter a project title',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a description of your project:',
    // Added validation for description length
    validate: (input) => input.length >= 10 || 'Description should be at least 10 characters long',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?',
    default: 'npm install',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How do you use this application?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Which license would you like to use?',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    // Added default license choice
    default: 'MIT',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to this project?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the test instructions?',
    default: 'npm test',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    // Added validation for GitHub username
    validate: (input) => input.trim() !== '' || 'Please enter your GitHub username',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
    // Added email validation
    validate: (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input) || 'Please enter a valid email address';
    },
  },
  {
    type: 'confirm',
    name: 'includeScreenshots',
    message: 'Would you like to include screenshots?',
    default: false,
  },
  {
    type: 'input',
    name: 'screenshots',
    message: 'Please provide the paths to your screenshots (comma-separated):',
    when: (answers) => answers.includeScreenshots,
    // Added validation for screenshot paths
    validate: (input) => {
      if (!input.trim()) return 'Please enter at least one screenshot path';
      const paths = input.split(',').map(path => path.trim());
      return paths.every(path => path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')) 
        || 'Screenshot paths must end with .png, .jpg, or .jpeg';
    },
  },
];

// Function to write README file
async function writeToFile(fileName, data) {
  try {
    await fs.promises.writeFile(fileName, data);
    console.log('Successfully created README.md!');
  } catch (error) {
    console.error('Error creating README:', error);
  }
}

// Function to initialize the application
async function init() {
  try {
    console.log(`
    ====================================
    Welcome to the Professional README Generator!
    This application will help you create a professional README.md file for your project.
    Please answer the following questions to generate your README.
    ====================================
    `);
    
    // Get user input
    const answers = await inquirer.prompt(questions);
    
    // Generate markdown content
    const markdownContent = generateMarkdown(answers);
    
    // Write to file
    await writeToFile('README.md', markdownContent);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Start the application
init();
