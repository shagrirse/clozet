export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getWsUrl() {
  if (process.env.WS_URL) return `ws://${process.env.WS_URL}`
  return `ws://localhost:${process.env.WS_PORT ?? 3001}`
}
