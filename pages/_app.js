import React, { Fragment } from 'react'
import App from 'next/app'
import { Styled } from 'theme-ui'

import ThemeProvider, { Reset } from '../theme'

// import Header from '../layout/Header'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <Reset />
        <ThemeProvider>
          {/* <Header /> */}
          <Styled.root>
            <Component {...pageProps} />
          </Styled.root>
        </ThemeProvider>
      </Fragment>
    )
  }
}

export default MyApp