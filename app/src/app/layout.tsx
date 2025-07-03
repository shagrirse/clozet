import '~/styles/global.css'

import { TRPCReactProvider } from '~/trpc/react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'

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
