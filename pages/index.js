import Head from 'next/head'
import Link from 'next/link'

const Home = ({ stories }) => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>
      <ul>
        {
          stories.map((meta) => {
            return (
              <li>
                <Link href={meta.slug}>{meta.title}</Link>
              </li>
            )
          })
        }
      </ul>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>
  </div>
)

export async function getStaticProps(context) {
  const fs = require('fs')
  const files = fs.readdirSync('./stories')
  const stories = await Promise.all(
    files.map(async (file) => {
      const component = await import(`stories/${file}`)
      const slug = file.split('.').slice(0, -1).join('.')
      const meta = component.Meta || component.default.Meta
      return {
        ...meta,
        slug: '/stories/'.concat(slug)
      }
    }).filter(Boolean)
  )

  console.log(stories)
  return {
    props: {
      stories
    },
  }
}

export default Home
