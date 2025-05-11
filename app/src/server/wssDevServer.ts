import { createContext } from './context'
import { appRouter } from './routers/_app'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
  port: 3001,
})
const handler = applyWSSHandler({ wss, router: appRouter, createContext })

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

process.on('SIGTERM', () => {
  handler.broadcastReconnectNotification()
  wss.close()
})
