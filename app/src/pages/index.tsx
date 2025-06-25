import { signIn } from 'next-auth/react'
import { trpc } from '~/utils/trpc'

export default function IndexPage() {
  const healthcheck = trpc.healthcheck.useQuery(undefined, {
    enabled: false,
    retry: false,
  })

  const fetchThis = async () => {
    const response = await healthcheck.refetch()
    console.log(response.data)
  }

  return (
    <>
      <button onClick={() => fetchThis()}>Log In</button>
      <br />
      <button onClick={() => signIn('auth0')}>Log In</button>
    </>
  )
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @see https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
