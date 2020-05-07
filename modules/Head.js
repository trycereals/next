import { Fragment } from 'react'
import NextHead from 'next/head'

const defaultMeta = (
  <Fragment>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="twitter:card" content="summary_large_image" />
  </Fragment>
)

const Head = ({
  title,
  excerpt,
  description,

  image,
  imageUrl,
  imageSrc,

  created,
  createdAt,
  published,
  publishedAt,
  published_time
}) => {

  const imageData = image || imageUrl || imageSrc
  const createdAtData = created || createdAt || published || publishedAt || published_time

  return (
    <NextHead>
      { defaultMeta }
      {
        title && (
          <Fragment>
            <title>{ title }</title>
            <meta name="og:title" content={title} />
            <meta name="twitter:title" content={title} />
          </Fragment>
        )
      }
      {
        (description || excerpt) && (
          <Fragment>
            <meta name="description" content={description || excerpt} />
            <meta name="og:description" content={description || excerpt} />
            <meta name="twitter:description" content={description || excerpt} />
          </Fragment>
        )
      }
      {
        createdAtData && (
          <Fragment>
            <meta name="created" content={createdAtData} />
            <meta name="published_time" content={createdAtData} />
          </Fragment>
        )
      }
      {
        imageData && (
          <Fragment>
            <meta name="og:image" content={imageData} />
            <meta name="twitter:image" content={imageData} />
          </Fragment>
        )
      }
    </NextHead>
  )
}

export default Head
