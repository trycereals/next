const path = require('path')
const sh = require('shelljs')

sh.cp('-R', 'app/pages', path.join(process.cwd(), '../'))
if (sh.test('-d', 'app/theme')) {
  sh.cp('-R', 'app/theme', path.join(process.cwd(), '../'))
} else if (sh.test('-e', 'app/theme.json')) {
  sh.cp("app/theme.json", path.join(process.cwd(), "../"));
}

if (sh.test('-d', './public')) {
  sh.cp('-R', './public', path.join(process.cwd(), '..'))
  sh.rm("-R", path.join(process.cwd(), "public/*"));
}

if (sh.test('-d', 'app/customs')) {
  sh.cp('-R', 'app/customs', path.join(process.cwd(), '../'))
} else if (sh.test('-e', 'app/customs.js')) {
  sh.cp("app/customs.js", path.join(process.cwd(), "../"));
}

if (sh.test('-e', 'app/layout')) {
  sh.cp('-R', 'app/layout', path.join(process.cwd(), '../'))
  sh.rm('../layout/index.js')
}
