import { memo, useState, Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { MDXProvider } from "@mdx-js/react"

// import Comments from '../modules/comments'

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import { Box, Flex, useThemeUI } from 'theme-ui'

const Login = () => <div>Login to see this page!</div>

const mdxComponents = {
  ...catalog,
  wrapper: (props) => {
    const { theme } = useThemeUI()
    const sx = (theme.layout && theme.layout.container) ? theme.layout.container : {}

    if (
      Object.keys(sx).length === 0
      && process.env.NODE_ENV !== 'production'
    ) {
      console.warn(`
        Your theme does not contain key "layout.container". You probably want to to set something there\n.
        Known bug: don't reference other styles like maxWidth: 'container'
      `)
    }
    
    console.log('wrapper props', props)
    return (
      <MdxWrapper
        pageAs="main"
        containerProps={{ sx }}
        {...props}
        pageProps={{ moduleRight: true }}
      />
    )
  }
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default ({ meta = {}, paid = false, usecomments = true }) => {
  const router = useRouter()
  const { slug } = router.query

  const [pageProps, setPageProps] = useState({ moduleRight: false })

  const Component = paid ? Login : dynamic(() => import(`../mdx/${slug || 'index'}.mdx`))

  const [formState, setFormState] = useState({})
  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "trycereals-comment-page-main", ...state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  }

  console.log({
    usecomments
  })

  const formName = `trycereals-comments-page-${slug}`
  return (
    <Fragment>
      <Head>
        { meta.title && <title>{meta.title}</title>}
      </Head>
      <Box className="hello-flex">
        <MDXProvider
          components={mdxComponents}
          pageProgs={pageProps}
        >
          <Component />
        </MDXProvider>
        {/* {
          usecomments && <Comments formName={formName} />
        } */}
      </Box>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const path = require('path')
  const dotenv = require('dotenv')
  const shell = require('shelljs')

  const envPath = path.join(process.cwd(), '.env')

  if (!shell.test('-f', envPath)) {
    console.error(`[pages/[slug]] Unable to find env file at path "${envPath}"`)
    return process.exit(-1)
  }

  dotenv.config({
    path: envPath
  })

  const component = await import(`../mdx/${context.params.slug}.mdx`)
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

  const meta = component.meta || component.Meta || component.default.Meta || {}
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
  const fetch = require('node-fetch')
  
  const pagesPath = path.join(
    process.cwd(),
    'mdx'
  )

  const paths = fs.readdirSync(pagesPath).map((file) => {
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
