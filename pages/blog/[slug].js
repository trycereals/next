import Slug, {
  getStaticPaths as getSlugStaticPaths,
  getStaticProps as getSlugStaticProps
} from 'modules/Slug'

export default (props) => <Slug {...props} />

export async function getStaticProps(context) {
  return await getSlugStaticProps({
    ...context,
    params: {
      ...context.params,
      path: 'blog'
    }
  })
}

export async function getStaticPaths() {
  return await getSlugStaticPaths({
    params: {
      path: 'blog',
    }
  })
}
