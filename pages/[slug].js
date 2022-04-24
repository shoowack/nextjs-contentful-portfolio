import Navigation from '../components/navigation'
import Section from '../components/section'
import { getAllSectionSections } from '../lib/api'
import { getHeaderLinks } from '../lib/api';
import { fetchEntries } from '../lib/fetchEntries';

export default function Designs({ preview, entries, headerItems }) {
  return (
    <>
      <Navigation headerItems={headerItems} />
      {entries.map(entry => <Section {...entry} key={entry.title.replace(/\s/g, '-').toLowerCase()} />)}
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'designs' } },
      { params: { slug: 'websites' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false }) {
  const headerItems = (await getHeaderLinks(preview)) ?? []

  const res = await fetchEntries(params.slug)
  const entries = await res.map((entry) => {
    return entry.fields
  })

  return {
    props: {
      entries,
      headerItems
    },
  }
}
