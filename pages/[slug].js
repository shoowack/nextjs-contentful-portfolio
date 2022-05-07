import Navigation from '../components/navigation'
import Section from '../components/section'
import { getHeaderLinks } from '../lib/api';
import { fetchEntries } from '../lib/fetchEntries';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useRouter } from 'next/router';
import Footer from '../components/footer';

export default function Designs({ slug, preview, entries, headerItems }) {
  const router = useRouter();

  const closeModal = () => {
    router.push({
      pathname: `/${slug}`,
    }, undefined, { scroll: false });
  };

  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
          ? acc.concat(findAllByKey(value, keyToFind))
          : acc
        , []);
  }

  const img = findAllByKey(entries[0].sections, 'file').find((file) => file.fileName == router.query.property)

  return (
    <div className="wrapper" style={{
      marginBottom: "360px"
    }}>
      <Navigation headerItems={headerItems} />
      {
        router.query.property && (<Modal isOpen toggle={closeModal}>
          <ModalHeader toggle={closeModal}>
            Modal window property {router.query.property}
          </ModalHeader>
          <ModalBody>
            <h1 className="d-flex justify-content-center align-items-center">
              <img src={img.url} />
            </h1>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>)
      }
      {entries[0].sections.map(entry => <Section {...entry.fields} key={entry.sys.id} />)}
      <Footer />
    </div>
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
