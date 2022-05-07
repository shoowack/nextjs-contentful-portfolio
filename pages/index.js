import Layout from '../components/layout'
import { getAllSections } from '../lib/api'
import Head from 'next/head'
import FrontPage from '../components/front.page'

export default function Index({ preview, allPosts }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Ivan Suvak Martinovic Personal Portfolio</title>
        </Head>
        <div className="site-main">
          {allPosts.map(post => <FrontPage {...post} key={post.sys.id} />)}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllSections(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}
