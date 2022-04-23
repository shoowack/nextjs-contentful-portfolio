import Navigation from '../components/navigation'
import Section from '../components/section'
import { getAllSectionSections } from '../lib/api'
import { getHeaderLinks } from '../lib/api';

export default function Designs({ preview, entries, headerItems }) {
  console.log(headerItems, 'headerItems in design')
  return (
    <>
      <Navigation headerItems={headerItems} />
      {entries.map(entry => <Section {...entry} key={entry.title.replace(/\s/g, '-').toLowerCase()} />)}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const entries = (await getAllSectionSections(preview, "Design")) ?? []
  const headerItems = (await getHeaderLinks(preview)) ?? []

  return {
    props: { preview, entries, headerItems },
  }
}
