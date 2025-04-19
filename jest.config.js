/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {},
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config; 