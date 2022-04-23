import Section from '../components/section'
import { getAllSectionSections } from '../lib/api'

export default function Designs({preview, entries}) {
  console.log(entries)
  return entries.map(entry => <Section {...entry} />)
}

export async function getStaticProps({ preview = false }) {
  const entries = (await getAllSectionSections(preview, "Design")) ?? []
  return {
    props: { preview, entries },
  }
}
