import Slug, {
  getStaticPaths as getSlugStaticPaths,
  getStaticProps as getSlugStaticProps
} from 'modules/Slug'

export default (props) => <Slug {...props} />

export async function getStaticProps(context) {
  console.log(context.params)
  return await getSlugStaticProps({
    ...context,
    params: {
      ...context.params,
      path: null
    }
  })
}

export async function getStaticPaths() {
  return await getSlugStaticPaths({
    params: {
      path: null,
    }
  })
}
