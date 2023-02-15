import Navigation from '@components/Navigation';
import Section from '@components/Section';
import { getHeaderLinks } from '@lib/api';
import { fetchEntries } from '@lib/fetchEntries';
import Footer from '@components/Footer';
import { Provider } from 'react-wrap-balancer';
import useWindowDimensions from '@lib/windowSize';
import Layout from '@components/layout';

export default function InnerPage({ entries, headerItems }) {
  const { width } = useWindowDimensions();

  return (
    <Layout>
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} />
        {/* filter sections by environment tags (production, development) */}
        {entries[0].sections.map(
          (entry, i) =>
            entry.metadata.tags.some((tags) => tags.sys.id === process.env.NODE_ENV) && (
              <Provider key={`provider-${entry.sys.id}`}>
                <Section windowWidth={width} {...entry.fields} i={i} />
              </Provider>
            ),
        )}
        <Footer />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'designs' } }, { params: { slug: 'apps-and-websites' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const headerItems = (await getHeaderLinks()) ?? [];

  const res = await fetchEntries(params.slug);
  const entries = await res.map((entry) => {
    return entry.fields;
  });

  return {
    props: {
      slug: params.slug,
      entries,
      headerItems,
    },
  };
}
