export function getWsUrl() {
  if (process.env.NEXT_PUBLIC_WS_URL)
    return `wss://${process.env.NEXT_PUBLIC_WS_URL}`
  // If on local development
  return 'ws://localhost:3001'
}
