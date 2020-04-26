const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);

const globby = require('globby')
const extract = require('extract-mdx-export')

module.exports = {
  name: 'netlify-plugin-file-api',
  async onPreBuild(opts) {
      const {
      pluginConfig: {
        pagesDir = '/pages',
        skipRoot = false,
        throwOnNotFound = true,
        metaKeyName = 'meta'
      },
      constants: { BUILD_DIR, FUNCTIONS_SRC, FUNCTIONS_DIST }
    } = opts;

    const pagesPath = path.join(
      process.cwd(),
      pagesDir,
    )

    const allPaths = await globby([`${pagesPath}/**/*.(mdx|js)`])
    const paths = skipRoot
      ? allPaths.filter(e => e.split(`${pagesPath}/`)[1].indexOf('/') !== -1)
      : allPaths

    const data = await Promise.all(
      paths.map(async (filePath) => {
        const split = filePath.split(pagesPath)
        console.log(pagesPath, filePath, split)
        const [slug] = split[split.length - 1].split('.')
        const code = await readFile(filePath, 'utf8')
        const res = await extract(code, { search: [metaKeyName] })
        if (!res[metaKeyName] && throwOnNotFound) {
          throw new Error(`[netlify-plugin-file-api] Could not create API.\nReason: named export "${metaKeyName}" not found at "${slug}"`)
        }
        return [slug, res[metaKeyName]]
      })
    )

    console.log({ data })

  }
}
