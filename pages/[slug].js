import Navigation from 'components/Navigation'
import Section from 'components/Section'
import { getHeaderLinks } from 'lib/api';
import { fetchEntries } from 'lib/fetchEntries';
import Footer from 'components/Footer';
import Head from 'next/head'
import { useRouter } from 'next/router';
import useWindowDimensions from "./../lib/windowSize";

export default function InnerPage({ entries, headerItems }) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>Ivan Suvak Martinovic Personal Portfolio - {router.asPath === '/apps-and-websites' ? "Apps & Websites" : "Designs"}</title>
      </Head>

      <div className="wrapper" style={{
        marginBottom: "400px"
      }}>
        <Navigation headerItems={headerItems} />
        {/* filter content by environment tags (production, development) */}
        {entries[0].sections
          .map(entry => entry.metadata.tags
          .find(tags => tags.sys.id === process.env.NODE_ENV) && <Section width={width} {...entry.fields} key={entry.sys.id} />)}
        <Footer />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'designs' } },
      { params: { slug: 'apps-and-websites' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const headerItems = (await getHeaderLinks()) ?? []

  const res = await fetchEntries(params.slug)
  const entries = await res.map((entry) => {
    return entry.fields
  })

  return {
    props: {
      slug: params.slug,
      entries,
      headerItems
    },
  }
}
