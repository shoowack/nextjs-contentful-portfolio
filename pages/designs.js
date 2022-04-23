import Navigation from '../components/navigation'
import Section from '../components/section'
import { getAllSectionSections } from '../lib/api'

export default function Designs({ preview, entries }) {
  // console.log(entries, 'entries')

  return (
    <>
      <Navigation />
      {entries.map(entry => <Section {...entry} key={entry.title.replace(/\s/g, '-').toLowerCase()} />)}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const entries = (await getAllSectionSections(preview, "Design")) ?? []
  return {
    props: { preview, entries },
  }
}
