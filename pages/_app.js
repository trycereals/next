import App from 'next/app'
import React, { Fragment } from 'react'


import Head from '../modules/Head'
import ThemeProvider, { Reset } from '../theme'
import { WithLayout as ComponentWithLayout } from '../modules/Layout'

import {
  Provider
} from "../modules/MdxProvider"

import db from 'app/db.json'
global.db = db

class MyApp extends App {

  render() {
    const { Component, pageProps = {}, ...rest } = this.props

    return (
      <Fragment>
        <Head {...pageProps.meta} />
        <Reset />
          <ThemeProvider>
            <ComponentWithLayout
              pageProps={pageProps}
              Component={Component}
              {...rest}
            />
          </ThemeProvider>
      </Fragment>
    )
  }
}

export default MyApp