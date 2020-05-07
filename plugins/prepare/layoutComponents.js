const fs = require('fs')
const path = require('path')
const template = require("@babel/template").default
const generate = require("@babel/generator").default
const t = require("@babel/types")

const globby = require('globby')

module.exports = async function() {
  const componentsPath = path.join(
    process.cwd(),
    '..',
    'layout',
    'components'
  )

  const components = (await globby([`${componentsPath}/*.mdx`])).map((filePath) => {
    const split = filePath.split('/').filter(e => e && e.length)
    const p = split.length > 1 ? split.slice(0, -1).join('/') : null

    const [slug] = split[split.length - 1].split('.')
    return slug
  }, [])

  const expressions = components.map((file) => {
    const source = `./${file}.mdx`
    const tpl = `import * as %%module%% from %%source%%;`
    return generate(template(tpl)({
      module: t.identifier(file),
      source
    })).code
  })
  const exports = components.map((file) => {
    const tpl = `export { %%module%% }`
    return generate(template(tpl)({
      module: t.identifier(file),
    })).code
  })

  fs.writeFileSync(
    path.join(process.cwd(), 'app', 'layout', 'components', 'index.js'),
    expressions.concat(exports).join('\n')
  )
}