import App from 'next/app'
import React, { Fragment } from 'react'


import ThemeProvider, { Reset } from '../theme'

import { MdxProvider } from "../modules/MdxProvider"

import { Header, Footer } from '../app/layout'

class MyApp extends App {

  render() {
    const { Component, pageProps = {} } = this.props
    const { hideLayout, ...all } = pageProps

    return (
      <Fragment>
        <Reset />
        <MdxProvider>
          <ThemeProvider>
            {!hideLayout && <Header />}
            <Component {...pageProps} />
            {!hideLayout && <Footer isLayout />}
          </ThemeProvider>
        </MdxProvider>
      </Fragment>
    )
  }
}

export default MyApp