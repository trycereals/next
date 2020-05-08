import React from 'react'
import NextLink from 'next/link'
// import { getSortedRoutes } from 'next/dist/next-server/lib/router/utils/sorted-routes'

import { MDXProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import ThemeProvider from '../theme'

import {
  Link,
  Button,
  Heading
} from 'theme-ui'

// Identify /[param]/ in route string
const TEST_ROUTE = /\/\[[^\/]+?\](?=\/|$)/

function toRoute(path) {
  return path.replace(/\/$/, '') || '/'
}

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route)
}

function getRouteRegex(normalizedRoute){
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(
    /[|\\{}()[\]^$+*?.-]/g,
    '\\$&'
  )

  const groups = {}
  let groupIndex = 1

  const parameterizedRoute = escapedRoute.replace(
    /\/\\\[([^\/]+?)\\\](?=\/|$)/g,
    (_, $1) => (
      (groups[
        $1
          .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1')
      ] = groupIndex++),
      '/([^/]+?)'
    )
  )
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups,
  }
}

function matchRoute(route, dynamicRoutes) {
  if (route === '/') {
    return '/'
  }
  const regs = dynamicRoutes.map(r => ([r, getRouteRegex(r)]))
  const routeMatch = regs.reduce((acc, [r, { re }]) => !acc && re.test(route) ? r : acc, null)
  if (!routeMatch) {
    console.error(`[tryCereals/Link] could not find match for route ${route}`)
  }
  return routeMatch || '/'
}

export const Provider = ({ children, ...propsFromLayout }) => {
  const mdxComponents = {
  ...catalog,
  Link: ({children, as, href, ...args }) => {
    const route = toRoute(href)
    const routes = ['/[slug]', '/blog/[slug]']

    if (route.indexOf('/') !== 0) {
      return (
        <Link href={href} {...args}>
          {children}
        </Link>
      )
    }

    return (
      <NextLink
        as={href}
        href={matchRoute(route, routes)}
        passHref
      >
        <Link {...args}>
          {children}
        </Link>
      </NextLink>
    )
  },
  Button,
  Heading,
  wrapper: (props) => {
    return (
      <MdxWrapper
        {...props}
        {...propsFromLayout}
      />
    )
  }
};
  return (
    <MDXProvider components={mdxComponents}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </MDXProvider>
  )
}
