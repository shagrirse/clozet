import '../styles/global.css'
import { type Session } from 'next-auth'
import { getSession, SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import { trpc } from '~/utils/trpc'
import getConfig from 'next/config'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  const { publicRuntimeConfig } = getConfig()
  const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_REDIRECT_URI } =
    publicRuntimeConfig
  if (!AUTH0_CLIENT_ID || !AUTH0_DOMAIN || !AUTH0_REDIRECT_URI) {
    console.error(
      'You have not configured Auth0 properly! Auth0Provider is not working as intended!',
    )
    return
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  }
}

export default trpc.withTRPC(MyApp)
