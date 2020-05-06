import React from 'react'

import { MDXProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import ThemeProvider from '../theme'

import {
  Link,
  Button,
  Heading
} from 'theme-ui'

export const Provider = ({ children, ...propsFromLayout }) => {
  const mdxComponents = {
  ...catalog,
  Link,
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
