import Slug, { getStaticProps as getSlugStaticProps } from 'modules/Slug'

export default (props) => (
  <Slug {...props} />
)

export async function getStaticProps(context) {
  return await getSlugStaticProps({
    params: {
      slug: 'index',
      path: ''
    }
  })
}
