const path = require('path')

module.exports = {
  images: {
    loader: 'custom',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}