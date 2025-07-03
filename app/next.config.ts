import { NextConfig } from 'next'

/**
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
export default {
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  serverExternalPackages: ['grammy'],
} satisfies NextConfig
