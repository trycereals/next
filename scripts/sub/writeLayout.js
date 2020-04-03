// Note that this should be done using the TryCereals API

const path = require('path')
const shell = require('shelljs')

const elements = {}

shell.ls(path.join(process.cwd(), 'app', 'layout')).forEach((file) => {
  const elem = file.split('.')[0]
  elements[elem] = true
})

const elementsList = ['Header', 'Footer', 'SideBar']


const writeElement = (elem) => {
  return elements[elem] ?
    `export { default as ${elem} } from './${elem}.mdx';`
    : `const ${elem} = () => null; export { ${elem} };`
}

const file = elementsList.reduce((acc, elem) => {
  return `${acc}${acc.length ? '\n\n' : ''}${writeElement(elem)}`
}, '')

shell.echo(file).to(
  path.join(
    process.cwd(),
    'app',
    'layout',
    'index.js'
  )
)