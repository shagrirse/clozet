import '~/styles/global.css'

import { type Metadata } from 'next'
import { TRPCReactProvider } from '~/trpc/react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/middleware'

export const metadata: Metadata = {
  title: 'clozet',
  description: 'clozet - Buy, Sell & Manage Your Stuff',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }
  return (
    <html lang="en">
      <body>
        <SessionProvider basePath={'/api/auth'} session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
