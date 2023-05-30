import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import NavigationBar from '@components/NavigationBar';
import Section from '@components/Section';
import Layout from '@components/layout';
import { getHeaderLinks } from '@lib/api';
import { appsAndWebsitesSlug, designsSlug } from '@lib/constants';
import { fetchEntries } from '@lib/fetchEntries';
import useWindowDimensions from '@lib/windowSize';
import { useRef } from 'react';

export default function InnerPage({ entries, headerItems, slug }) {
  const { width } = useWindowDimensions();
  const { sections } = entries[0];
  const sliderRef = useRef([]);
  const aboutSectionRef = useRef(null);

  return (
    <Layout>
      <NavigationBar
        aboutSectionRef={aboutSectionRef}
        slug={slug}
        width={width}
        sections={sections}
        sliderRef={sliderRef}
      />
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} aboutSectionRef={aboutSectionRef} />
        {/* filter sections by environment tags (production, development) */}
        {sections.map(
          (entry, i) =>
            entry.metadata.tags.some((tags) => tags.sys.id === process.env.NODE_ENV) && (
              <Section
                windowWidth={width}
                {...entry.fields}
                i={i}
                key={`section-${entry.sys.id}`}
                sys={entry.sys}
                sliderRef={sliderRef}
              />
            ),
        )}
        <Footer />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: designsSlug } }, { params: { slug: appsAndWebsitesSlug } }],
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
