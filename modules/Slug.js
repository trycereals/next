import { useState, Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Box } from 'theme-ui'

const Login = () => <div>Login to see this page!</div>


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
        <Component />
        {/* {
          usecomments && <Comments formName={formName} />
        } */}
      </Box>
    </Fragment>
  )
}
