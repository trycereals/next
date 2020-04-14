/** @jsx jsx */
import React, { memo } from 'react'

import { Global } from '@emotion/core'
import { jsx, useThemeUI, ThemeProvider as ThemeP, Styled } from 'theme-ui'

import theme from '../app/theme.json'

const ThemeProvider = memo(({ children, ...props }) => (
  <ThemeP theme={theme} {...props}>
    <Styled.root>{children}</Styled.root>
  </ThemeP>
))

const Reset = () => (
  <Global
    styles={{
      body: {
        margin: '0',
      },
      'h1, h2, h3, h4, h5, h6': {
        margin: 0,
      },
      p: {
        marginTop: 0
      },
      small: {
        fontSize: '100%',
      },
      'pre code': {
        background: 'none',
      },
      pre: {
        overflow: 'scroll'
      },
      code: {
        padding: '2px 4px',
        ...(theme.fonts ? {
          fontFamily: theme.fonts.body,
        } : {}),
        ...(theme.colors ? {
          background: theme.colors.muted
        } : {}),
      },
      a: {
        textDecoration: 'none',
        ':-webkit-any-link': {
          textDecoration: 'none',
        }
      }
    }}
  />
)

export {
  useThemeUI as useTheme,
  theme,
  Reset,
  ThemeProvider as default,
}