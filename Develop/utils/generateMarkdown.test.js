import { generateMarkdown } from './generateMarkdown.js';

describe('generateMarkdown', () => {
  test('generates correct markdown for basic project', () => {
    const data = {
      title: 'Test Project',
      description: 'A test project',
      installation: 'npm install',
      usage: 'node index.js',
      license: 'MIT',
      contributing: 'Fork and PR',
      tests: 'npm test',
      github: 'testuser',
      email: 'test@example.com',
      includeScreenshots: false
    };

    const markdown = generateMarkdown(data);
    
    expect(markdown).toContain('# Test Project');
    expect(markdown).toContain('## Description');
    expect(markdown).toContain('A test project');
    expect(markdown).toContain('## Installation');
    expect(markdown).toContain('npm install');
    expect(markdown).toContain('## License');
    expect(markdown).toContain('MIT');
    expect(markdown).toContain('test@example.com');
    expect(markdown).toContain('testuser');
  });

  test('includes license badge for MIT license', () => {
    const data = {
      title: 'Test Project',
      description: 'A test project',
      installation: 'npm install',
      usage: 'node index.js',
      license: 'MIT',
      contributing: 'Fork and PR',
      tests: 'npm test',
      github: 'testuser',
      email: 'test@example.com',
      includeScreenshots: false
    };

    const markdown = generateMarkdown(data);
    expect(markdown).toContain('![License](https://img.shields.io/badge/license-MIT-blue.svg)');
  });

  test('handles no license correctly', () => {
    const data = {
      title: 'Test Project',
      description: 'A test project',
      installation: 'npm install',
      usage: 'node index.js',
      license: 'None',
      contributing: 'Fork and PR',
      tests: 'npm test',
      github: 'testuser',
      email: 'test@example.com',
      includeScreenshots: false
    };

    const markdown = generateMarkdown(data);
    expect(markdown).not.toContain('![License]');
    expect(markdown).not.toContain('## License');
  });
}); 