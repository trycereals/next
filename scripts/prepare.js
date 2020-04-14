const path = require('path')
const sh = require('shelljs')

sh.rm("-R", path.join(process.cwd(), "app"))
sh.mkdir(path.join(process.cwd(), "app"));

sh.cp('-R', '../pages', path.join(process.cwd(), 'app/pages'))
sh.cp('-R', '../layout', path.join(process.cwd(), 'app/layout'))

if (sh.test('-d', '../theme')) {
  sh.cp('-R', '../theme', path.join(process.cwd(), 'app/theme'))
} else if (sh.test('-e', '../theme.json')) {
  sh.cp("../theme.json", path.join(process.cwd(), "app/theme.json"));
}

if (sh.test('-e', '../customs.js')) {
  sh.cp("../customs.js", path.join(process.cwd(), "app/customs.js"));
}

sh.exec('node scripts/sub/writeLayout')