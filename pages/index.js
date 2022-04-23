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
        <style jsx>{`
        .site-main {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: 100vh;
          width: 100vw;
          padding: 0;
          flex-direction: column;
        }        
          @media (min-width: 768px) {
            .site-main {
              flex-direction: row;
            }
          }
        }
      `}</style>
        <div className="site-main">
          {allPosts.map(post => <FrontPage {...post} />)}
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
