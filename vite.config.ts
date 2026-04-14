import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import inquiryHandler from './api/inquiry'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  for (const [key, value] of Object.entries(env)) {
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }

  return {
    plugins: [
      react(),
      {
        name: 'local-inquiry-api',
        configureServer(server) {
          server.middlewares.use('/api/inquiry', (req, res, next) => {
            if (!req.url) {
              next()
              return
            }

            inquiryHandler(req, res).catch((error) => {
              server.config.logger.error(`Inquiry API error: ${error instanceof Error ? error.stack ?? error.message : String(error)}`)

              if (!res.headersSent) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify({
                  ok: false,
                  message: 'Internal server error.',
                  error: {
                    code: 'invalid_payload',
                    message: 'Internal server error.',
                  },
                }))
              }
            })
          })
        },
      },
    ],
  }
})
