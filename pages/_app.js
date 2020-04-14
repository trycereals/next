import App from 'next/app'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'


import ThemeProvider, { Reset } from '../theme'

// import Header from '../app/layout/Header.mdx'
import { MDXProvider } from "@mdx-js/react"

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import * as catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import { useThemeUI } from 'theme-ui'

import { Header, Footer } from '../app/layout'

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
        {...props}
        pageProps={{ moduleRight: true }}
      />
    )
  }
}

class MyApp extends App {

  render() {
    const { Component, pageProps = {} } = this.props

    console.log({
      _app: true,
      Component,
      pageProps
    })

    const { hideLayout } = pageProps

    return (
      <Fragment>
        <Reset />
        <MDXProvider
          components={mdxComponents}
        >
          <ThemeProvider>
            {!hideLayout && <Header />}
            <Component {...pageProps} />
            {!hideLayout && <Footer />}
          </ThemeProvider>
        </MDXProvider>
      </Fragment>
    )
  }
}

export default MyApp