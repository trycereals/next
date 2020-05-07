const path = require('path')
const sh = require('shelljs')

const handleLayoutComps = require('./layoutComponents')

module.exports = {
  name: 'trycereals-prepare-app-folder',
  async onPreBuild(opts) {
      const {
      pluginConfig: {
        appFolder = 'app'
      },
      constants: { }
    } = opts

    sh.rm("-R", path.join(process.cwd(), appFolder))
    sh.mkdir(path.join(process.cwd(), appFolder));

    sh.cp('-R', '../pages', path.join(process.cwd(), appFolder, 'pages'))
    sh.cp('-R', '../layout', path.join(process.cwd(), appFolder, 'layout'))
    if (sh.test('-d', '../public')) {
      sh.cp('-R', '../public', process.cwd())
    }

    if (sh.test('-d', '../theme')) {
      sh.cp('-R', '../theme', path.join(process.cwd(), appFolder, 'theme'))
    } else if (sh.test('-e', '../theme.json')) {
      sh.cp('../theme.json', path.join(process.cwd(), appFolder, 'theme.json'))
    }

    if (sh.test('-e', '../customs.js')) {
      sh.cp('../customs.js', path.join(process.cwd(), appFolder, 'customs.js'))
    }

    await handleLayoutComps()
  }
}
