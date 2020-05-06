import { Fragment } from 'react'
import { Box, Flex, useThemeUI } from "theme-ui";

import { MDXProvider } from "@mdx-js/react"
import { Provider } from "../modules/MdxProvider"

import * as Components from '../app/layout/components'

export const WithLayout = ({
  pageProps = {},
  Component,
}) => {
  const { theme } = useThemeUI() 
  const {
    Layout,
    LayoutProps,
    hideLayout,
    hideContainer,
    ContainerProps,
    useLayout
  } = pageProps

  let name
  if (useLayout && typeof useLayout === 'string') {
    name = useLayout
  } if (typeof Layout === 'string') {
    name = Layout
  } if (LayoutProps && (LayoutProps.use || LayoutProps.useLayout)) {
    name = LayoutProps.use || LayoutProps.useLayout
  } if (!hideLayout) {
    name = 'default'
  }
  let LayoutComponent = {}
  if (name) {
    LayoutComponent = require(`../app/layout/${name}.mdx`);
  }

  const defaultLayoutProps = {
    as: 'main',
  }
  const defaultContainerProps = {
    sx: theme.layout ? theme.layout.container : {},
  }
  const FinalContainerProps =
    ContainerProps && ContainerProps.extend
    ? {
      ...defaultContainerProps,
      ...ContainerProps,
      sx: {
        ...(ContainerProps.overrideSx ? null : defaultContainerProps.sx),
        ...ContainerProps.sx
      }
    }
    : (ContainerProps || defaultContainerProps)

  const components = {
    Flex,
    Box,
    ...Object.entries(Components).reduce(
      (acc, [key, Comp]) => ({
        ...acc,
        [key]: () => (
          <Provider
            {...{
              ContainerProps: defaultContainerProps,
              hideContainer,
              ...Comp,
            }}
          >
            <Comp.default {...Comp} />
          </Provider>
        ),
      }),
      {}
    ),
    Component: () => {
      return (
        <Provider
          {...{
            LayoutProps: defaultLayoutProps,
            ...LayoutComponent,
            here: true
          }}
          ContainerProps={FinalContainerProps}
        >
          <Component {...pageProps} />
        </Provider>
      ); 
    },
  };

  return (
    <MDXProvider components={components}>
      {LayoutComponent.default ? <LayoutComponent.default /> : <components.Component />}
    </MDXProvider>
  );
}
