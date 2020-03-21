const dotenv = require('dotenv')
const path = require('path')
const shell = require('shelljs')
const fs = require('fs')

const DEFAULT_STORIES_PATH = 'src/stories'

const envPath = path.join(
  process.cwd(),
  '..',
  '.env'
)

const storiesPath = path.join(
  process.cwd(),
  '..',
  process.env.STORIES_PATH || DEFAULT_STORIES_PATH
)

module.exports = async () => {
  if (!shell.test('-f', envPath)) {
    console.error(`[prepare.stories] Unable to find env file at path "${envPath}"`)
    return {}
  }

  if (!shell.test('-d', storiesPath)) {
    console.error(`[prepare.stories] Unable to find stories folder at "${storiesPath}"`)
    return {}
  }

  dotenv.config({
    path: envPath
  })

  const story = await require(path.join((storiesPath, 'a.js')))
  console.log('story')
  // const stories = []
  fs.readdirSync(storiesPath).forEach(async (file) => {
    console.log('path.join((storiesPath, file))', path.join(storiesPath, file))
    const story = await import(path.join((storiesPath, file)))
    console.log('HERE: ', story)
    stories.push(story)
  });

  return stories

}
