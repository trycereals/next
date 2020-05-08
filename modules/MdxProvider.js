import React from 'react'
// import { getSortedRoutes } from 'next/dist/next-server/lib/router/utils/sorted-routes'

import { MDXProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import ThemeProvider from '../theme'

import {
  Button,
  Heading
} from 'theme-ui'

import { Link } from './Link'

export const Provider = ({ children, ...propsFromLayout }) => {
  const mdxComponents = {
  ...catalog,
  Button,
  Heading,
  Link,
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
