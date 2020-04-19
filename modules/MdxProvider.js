import React from 'react'

import { MDXProvider as MdxMdxProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import { useThemeUI } from 'theme-ui'

const mdxComponents = {
  ...catalog,
  wrapper: ({
    containerProps,
    Layout,
    isLayout,
    LayoutProps,
    children
  }) => {
    const { theme } = useThemeUI();
    const sx =
      theme.layout && theme.layout.container ? theme.layout.container : {};

    if (Object.keys(sx).length === 0 && process.env.NODE_ENV !== "production") {
      console.warn(`
        Your theme does not contain key "layout.container". You probably want to to set something there\n.
        Known bug: don't reference other styles like maxWidth: 'container'
      `);
    }

    const finalLayoutProps = LayoutProps || (!isLayout ? { as: "main" } : {});

    return (
      <MdxWrapper
        children={children}
        containerProps={containerProps || { sx }}
        Layout={Layout}
        layoutProps={finalLayoutProps}
      />
    );
  }
};

export const MdxProvider = ({ children, ...props }) => (
  <MdxMdxProvider components={mdxComponents} {...props}>
    {children}
  </MdxMdxProvider>
)
