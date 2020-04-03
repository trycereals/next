import Slug from '../modules/Slug'

import { getStaticProps as getSlug } from './[slug]'

export default ({
  meta = {},
  paid = false,
  usecomments = true,
}) => (
  <Slug
    meta={meta}
    paid={paid}
    slug="index"
    usecomments={usecomments}
  />
)

export async function getStaticProps() {
  return await getSlug({
    params: {
      slug: 'index'
    }
  })
}
