import Navigation from 'components/navigation'
import Section from 'components/Section'
import { getHeaderLinks } from 'lib/api';
import { fetchEntries } from 'lib/fetchEntries';
import Footer from 'components/footer';
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Designs({ entries, headerItems }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ivan Suvak Martinovic Personal Portfolio - {router.asPath === '/apps-and-websites' ? "Apps & Websites" : "Designs"}</title>
      </Head>

      <div className="wrapper" style={{
        marginBottom: "400px"
      }}>
        <Navigation headerItems={headerItems} />
        {entries[0].sections.map(entry => <Section {...entry.fields} key={entry.sys.id} />)}
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
