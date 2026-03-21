import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createJiti } from 'jiti'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const jiti = createJiti(import.meta.url, { moduleCache: false })

// Simple plugin to handle Vercel serverless functions locally
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && req.url.startsWith('/api/')) {
        console.log(`[api-plugin] Incoming request: ${req.method} ${req.url}`)
        
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
        const apiPath = url.pathname
        const filePath = resolve(__dirname, `.${apiPath}.ts`)
        
        console.log(`[api-plugin] Attempting to load: ${filePath}`)

        try {
          const module = await jiti.import(filePath) as any
          const handler = module.default

          if (!handler) {
             throw new Error(`No default export found in ${filePath}`)
          }

          // Parse body if needed
          if (req.method === 'POST' && !req.body) {
            const buffers = []
            for await (const chunk of req) {
              buffers.push(chunk)
            }
            if (buffers.length > 0) {
              const bodyStr = Buffer.concat(buffers).toString()
              try {
                req.body = JSON.parse(bodyStr)
              } catch (e) {
                req.body = bodyStr
              }
            }
          }

          // Mock response object
          const mockRes = {
            status: (code: number) => ({
              json: (data: any) => {
                res.statusCode = code
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
            })
          }

          await handler(req, mockRes)
          console.log(`[api-plugin] Successfully handled: ${apiPath}`)
          return
        } catch (err: any) {
          console.error(`[api-plugin] Error handling ${apiPath}:`, err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
          return
        }
      }
      next()
    })
  }
})

// https://vitejs.dev/config/
/**
 * Vite Configuration
 * 
 * Includes a custom 'api-plugin' to simulate Vercel Serverless Functions locally during development.
 * Automatically loads .env variables into process.env to bridge the gap between Vite's client-side 
 * env loading and Node-based API handlers.
 */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Ensure process.env is populated for the local API routes handled by apiPlugin
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      apiPlugin(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})

