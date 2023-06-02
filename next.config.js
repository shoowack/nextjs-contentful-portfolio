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
}