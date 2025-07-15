import cors from 'cors'
import express from 'express'
import http from 'http'
import { Server } from 'ws'

import type { Request } from 'express'
import { AppRouter, appRouter as router } from '~/server/api/root'
import { applyWSSHandler } from '@trpc/server/adapters/ws'

import { ExpressAuth, getSession } from '@auth/express'
import { authConfig } from './auth/config'
import { db } from './db'
import { Session } from 'next-auth'

const app = express()
const server = http.createServer(app)

const wss = new Server({ server })

// Create websocket handler with custom WS context
// It's pretty hacky due to the lack of documentation/typing on the tRPC docs right now but it works
const wsHandler = applyWSSHandler<AppRouter>({
  wss,
  router,
  createContext: async (opts) => {
    // Cast req to any to satisfy getSession type, or update getSession to accept IncomingMessage
    const sessionRaw =
      (await getSession(opts.req as Request, authConfig)) ?? undefined

    // Transform session to match NextAuth.js Session type if needed
    let session: Session | null = null
    if (sessionRaw) {
      // Ensure user is always defined and has an id
      const user = sessionRaw.user?.id
        ? sessionRaw.user
        : { id: '', ...sessionRaw.user }
      session = {
        ...sessionRaw,
        user,
      } as Session
    }

    return {
      headers: opts.req.headers as unknown as Headers,
      db,
      session,
    }
  },
  keepAlive: {
    pingMs: 30 * 1000,
    enabled: true,
    pongWaitMs: 5 * 1000,
  },
})

app.use(cors())
app.use(ExpressAuth(authConfig))

server.listen(3001, () => {
  console.log(`Listening at http://localhost:${3001}`)
})
server.on('error', console.error)

process.on('SIGTERM', () => {
  wsHandler.broadcastReconnectNotification()
  wss.close()
  server.close()
})

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
  ws.on('error', (err) => {
    console.error('WebSocket error:', err)
  })
})
console.log('✅ WebSocket Server listening on ws://localhost:3001')
