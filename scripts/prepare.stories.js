const dotenv = require('dotenv')
const path = require('path')
const shell = require('shelljs')

const DEFAULT_STORIES_PATH = 'src/stories'

const envPath = path.join(
  process.cwd(),
  '..',
  '.env'
)

if (!shell.test('-f', envPath)) {
  console.error(`[prepare.stories] Unable to find env file at path "${envPath}"`)
  return process.exit(-1)
}

dotenv.config({
  path: envPath
})

const storiesPath = path.join(
  process.cwd(),
  '..',
  process.env.STORIES_PATH || DEFAULT_STORIES_PATH
)

if (!shell.test('-d', storiesPath)) {
  console.error(`[prepare.stories] Unable to find stories folder at "${storiesPath}"`)
  return process.exit(-1)
}

shell.cp('-R', storiesPath, process.cwd());