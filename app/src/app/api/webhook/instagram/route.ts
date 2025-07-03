import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  if (
    searchParams.get('hub.mode') === 'subscribe' &&
    searchParams.get('hub.verify_token') === process.env.INSTAGRAM_WEBHOOK_TOKEN
  ) {
    return NextResponse.json(searchParams.get('hub.challenge'))
  }
  return NextResponse.json({})
}
