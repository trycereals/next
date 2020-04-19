const path = require('path')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX({
  pageExtensions: ['mdx', 'js'],
  webpack: (config, {
    isServer
  }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      app: path.resolve(__dirname, 'app'),
      modules: path.resolve(__dirname, 'modules'),
    }

    return config
  }
})