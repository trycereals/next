import { useState, Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Box } from 'theme-ui'

const Login = () => <div>Login to see this page!</div>

export default ({ meta = {}, path, paid = false, usecomments = true, slug }) => {
  const Component = paid
  ? Login
  : dynamic(() => import(`../app/pages/${ path ? `${path}/` : ''}${slug || 'index'}.mdx`))

  return (
    <Fragment>
      <Head>
        { meta.title && <title>{meta.title}</title>}
      </Head>
      <Box className="hello-flex">
        <Component />
        {/* {
          usecomments && <Comments formName={formName} />
        } */}
      </Box>
    </Fragment>
  )
}

export async function getStaticProps(context) {

  const { slug, path } = context.params

  const component = await import(`app/pages/${ path ? `${path}/` : ''}${slug}.mdx`)
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

  const { hideLayout, meta = {}, } = component

  return {
    props: {
      meta,
      paid,
      hideLayout: hideLayout || null,
      slug,
      path: path || null
    },
  }
}

export async function getStaticPaths(context) {
  const path = require('path')
  const globby = require('globby')

  console.log('[Modules/Slug] Running v 0.0.16')

  const { path: subpath } = context.params

  const pagesPath = path.join(
    process.cwd(),
    'app',
    'pages',
    ...(subpath ? [subpath] : [])
  )

  const paths = (await globby([`${pagesPath}/*.mdx`])).reduce((acc, filePath) => {
    const split = filePath.split('/').filter(e => e && e.length)
    const p = split.length > 1 ? split.slice(0, -1).join('/') : null

    const [slug] = split[split.length - 1].split('.')

    if (slug !== 'index') {
      return [...acc, {
        params: {
          slug,
          path: p
        }
      }]
    }
    return acc
  }, [])

  return {
    paths,
    fallback: false
  }
}

