import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Login = () => (
  <p>Hello you should login!</p>
)

const Story = ({ meta = {}, paid = false }) => {
  const router = useRouter()
  const { slug } = router.query

  const Component = paid ? Login : dynamic(() => import(`stories/${slug}.js`))

  return (
    <>
      <Head>
        { meta.title && <title>{meta.title}</title>}
      </Head>
      <p>
        {
          paid ? 'paid' : 'free'
        }
      </p>
      <Component />
    </>
  )
}

export async function getStaticProps(context) {
  const path = require('path')
  const dotenv = require('dotenv')
  const shell = require('shelljs')
  const envPath = path.join(
    process.cwd(),
    '..',
    '.env'
  )

  if (!shell.test('-f', envPath)) {
    console.error(`[pages/stories/[slug]] Unable to find env file at path "${envPath}"`)
    return process.exit(-1)
  }

  dotenv.config({
    path: envPath
  })

  const component = await import(`stories/${context.params.slug}.js`)
  const paid = ((component) => {
    if (process.env.USE_PAYWALL) {
      const defaultPT = 'PER_PAGE'
      const paywallType = process.env.PAYWALL_TYPE || defaultPT
      switch (paywallType) {
        case "ALL":
          return true
        case "PER_PAGE":
        default:
          return component.paid || component.default.paid || false
      }
    }
    return false
  })(component)

  const meta = component.Meta || component.default.Meta || {}
  return {
    props: {
      meta,
      paid
    },
  }
}

export async function getStaticPaths(context) {
  const fs = require('fs')
  const path = require('path')
  
  const storiesPath = path.join(
    process.cwd(),
    'stories'
  )

  const paths = fs.readdirSync(storiesPath).map((file) => {
    const slug = file.split('.').slice(0, -1).join('.')
    return {
      params: {
        slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export default Story