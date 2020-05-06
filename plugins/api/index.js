const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);

const globby = require('globby')
const extract = require('mdx-extract-export')

module.exports = {
  name: 'netlify-plugin-file-api',
  async onPreBuild(opts) {
      const {
      pluginConfig: {
        pagesDir = '/pages',
        skipRoot = true,
        throwOnDataNotFound = true,
        metaKeyName = 'meta',
        handleJsFiles = true
      },
      constants: { BUILD_DIR, FUNCTIONS_SRC, FUNCTIONS_DIST }
    } = opts;

    const pagesPath = path.join(
      process.cwd(),
      pagesDir,
    )

    const allPaths = await globby([`${pagesPath}/**/*.(mdx${handleJsFiles ? '|js' : ''})`])
    const paths = skipRoot
      ? allPaths.filter(e => e.split(`${pagesPath}/`)[1].indexOf('/') !== -1)
      : allPaths

    const data = await Promise.all(
      paths.map(async (filePath) => {
        const code = await readFile(filePath, 'utf8')
        const res = await extract(code, { search: [metaKeyName] })
        if (!res[metaKeyName] && throwOnDataNotFound) {
          throw new Error(`[netlify-plugin-file-api] Could not create API.\nReason: export "${metaKeyName}" not found at "${fileSlug}"`)
        }
        if (typeof res[metaKeyName] !== 'object' && throwOnDataNotFound) {
          throw new Error(`[netlify-plugin-file-api] Could not create API.\nReason: export "${metaKeyName}" is not properly formatted at "${fileSlug}"`)
        }

        const splitPath = filePath.split(pagesPath)
        const [fileSlug] = splitPath.pop().split('.')
        const slug = fileSlug.endsWith('/index') ? fileSlug.substr(0, fileSlug.length - 6) : fileSlug

        console.log({
        res: res
        })
        return [
          slug,
          {
            from: slug.split('/').slice(0, -1).filter(e => e.length),
            ...res[metaKeyName],
            filePath,
            fileSlug,
          }
        ]
      })
    )

    // extremely provisoire

    const db = data.reduce((acc, [slug, meta]) => ({ ...acc, [slug]: meta }), {})
    fs.writeFileSync(
      path.join(process.cwd(), 'next/app/db.json'),
      JSON.stringify(db)
    )

    console.log({ data })

  }
}
