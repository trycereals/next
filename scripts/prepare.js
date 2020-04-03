const path = require('path')
const shell = require('shelljs')

shell.rm("-R", path.join(process.cwd(), "app"))
shell.mkdir(path.join(process.cwd(), "app"));

shell.cp('-R', '../pages', path.join(process.cwd(), 'app/pages'))
shell.cp('-R', '../layout', path.join(process.cwd(), 'app/layout'))
shell.cp("../theme.json", path.join(process.cwd(), "app/theme.json"))

shell.exec('node scripts/sub/writeLayout')