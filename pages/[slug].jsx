import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Section from '@components/Section';
import Layout from '@components/layout';
import { getHeaderLinks } from '@lib/api';
import { fetchEntries } from '@lib/fetchEntries';
import useWindowDimensions from '@lib/windowSize';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-wrap-balancer';

export default function InnerPage({ entries, headerItems }) {
  const { width } = useWindowDimensions();
  const [sectionTitle, setSectionTitle] = useState([]);
  const refs = useRef([]);
  const { sections } = entries[0];

  const handleIntersection = ([entry]) => {
    if (entry.isIntersecting) {
      // Check if section is near the top of the viewport
      setSectionTitle((prev) =>
        [...prev, entry.target.children[1].children[1].children[0].children[1].outerText].slice(-2),
      );
    }
  };

  useEffect(() => {
    const currentRefs = refs.current;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px 0px -99% 0px',
      threshold: 0,
    });

    // Observe each section's ref
    currentRefs.map((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // Stop observing each section's ref
      currentRefs.map((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Layout>
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} />
        {/* filter sections by environment tags (production, development) */}
        <Provider>
          {sections.map(
            (entry, i) =>
              entry.metadata.tags.some((tags) => tags.sys.id === process.env.NODE_ENV) && (
                <Section
                  windowWidth={width}
                  {...entry.fields}
                  i={i}
                  refs={refs}
                  sectionTitle={sectionTitle}
                />
              ),
          )}
        </Provider>
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
