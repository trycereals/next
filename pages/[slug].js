import { useRouter } from 'next/router'

import Slug from '../modules/Slug'

export default ({ meta = {}, paid = false, usecomments = true }) => {
  const router = useRouter()
  const { slug } = router.query

  return <Slug meta={meta} paid={paid} slug={slug} usecomments={usecomments} />
}

export async function getStaticProps(context) {
  const component = await import(`../app/pages/${context.params.slug}.mdx`)
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
    'app',
    'pages'
  )

  const paths = fs.readdirSync(pagesPath).reduce((acc, file) => {
    const slug = file.split('.').slice(0, -1).join('.')
    if (slug !== 'index') {
      return [...acc, {
        params: {
          slug
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
