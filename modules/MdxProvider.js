import React from 'react'

import { MDXProvider as MdxMdxProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import { useThemeUI } from 'theme-ui'

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
    return (
      <MdxWrapper
        containerProps={{ sx }}
      />
    )
  }
}

export const MdxProvider = ({ children, ...props }) => (
  <MdxMdxProvider components={mdxComponents} {...props}>
    {children}
  </MdxMdxProvider>
)
