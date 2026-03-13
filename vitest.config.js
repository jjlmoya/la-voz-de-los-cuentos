import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    reporters: ['default', 'json'],
    outputFile: {
      json: './test-results.json'
    }
  }
});
