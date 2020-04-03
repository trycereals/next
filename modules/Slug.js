import { memo, useState, Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { MDXProvider } from "@mdx-js/react"

// import Comments from '../modules/comments'

import { MdxWrapper } from "test-cereal-mdx-kit-deployment/es";
import catalog from "test-cereal-mdx-kit-deployment/es/catalog"

import { Box, Flex, useThemeUI } from 'theme-ui'

const Login = () => <div>Login to see this page!</div>

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
    
    console.log('wrapper props', props)
    return (
      <MdxWrapper
        pageAs="main"
        containerProps={{ sx }}
        {...props}
        pageProps={{ moduleRight: true }}
      />
    )
  }
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default ({ meta = {}, paid = false, usecomments = true, slug }) => {
  const router = useRouter()

  const [pageProps, setPageProps] = useState({ moduleRight: false })

  console.log({
    slug,
    here: 'true',
    meta
  })
  
  const Component = paid ? Login : dynamic(() => import(`../app/pages/${slug || 'index'}.mdx`))

  const [formState, setFormState] = useState({})
  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "trycereals-comment-page-main", ...state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  }

  console.log({
    usecomments
  })

  const formName = `trycereals-comments-page-${slug}`
  return (
    <Fragment>
      <Head>
        { meta.title && <title>{meta.title}</title>}
      </Head>
      <Box className="hello-flex">
        <MDXProvider
          components={mdxComponents}
          pageProgs={pageProps}
        >
          <Component />
        </MDXProvider>
        {/* {
          usecomments && <Comments formName={formName} />
        } */}
      </Box>
    </Fragment>
  )
}
