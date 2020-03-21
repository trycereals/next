const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.alias['stories'] = path.join(__dirname, 'stories')
    return config
  }
};