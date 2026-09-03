// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const path = require('path')

module.exports = {
  images: {
    loader: 'custom',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'nextjs-contentful-portfolio.vercel.app',
          },
        ],
        destination: 'https://shoowack.com/:path*',
        permanent: true,
      },
    ]
  },
}