import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const vitestConfig = {
  root: rootDir,
  resolve: {
    alias: {
      '@': path.join(rootDir, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
}

export default vitestConfig
