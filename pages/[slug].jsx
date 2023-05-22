import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Section from '@components/Section';
import Layout from '@components/layout';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getHeaderLinks } from '@lib/api';
import { fetchEntries } from '@lib/fetchEntries';
import useWindowDimensions from '@lib/windowSize';
import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function InnerPage({ entries, headerItems, slug }) {
  const { width } = useWindowDimensions();
  const [sectionTitle, setSectionTitle] = useState([]);
  const [sectionLogo, setSectionLogo] = useState([]);
  const refs = useRef([]);
  const { sections } = entries[0];
  const [direction, setDirection] = useState('down');

  let oldScrollY = 0;

  const controlDirection = () => {
    if (window.scrollY > oldScrollY) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    oldScrollY = window.scrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', controlDirection);
    return () => {
      window.removeEventListener('scroll', controlDirection);
    };
  }, []);

  const handleIntersection = ([entry]) => {
    if (entry.isIntersecting) {
      setSectionTitle((prev) =>
        [...prev, entry.target.dataset.title].slice(-2),
      );
      setSectionLogo((prev) =>
        [...prev, entry.target.dataset.applogo].slice(-2),
      );
    }
  };

  useEffect(() => {
    const currentRefs = refs.current;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: direction === 'down' ? '10% 0px -90% 0px' : '-10% 0px 90% 0px',
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
  }, [direction]);

  return (
    <Layout>
      <div
        className='transition-all h-14 overflow-hidden items-center fixed top-8 w-[40%] left-1/2 -translate-x-1/2 z-10 backdrop-blur-[12px] rounded-full bg-accent-2/70 dark:bg-accent-7/70 dark:border-accent-2/10 shadow-medium border border-accent-7/10'
      >
        {width > 639 &&
          (slug === 'apps-and-websites' || slug === 'designs') && (
            <Link href="/" className="ml-1 px-2 py-0.5 !text-base left-2 absolute top-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
              Home
            </Link>
          )}
        <LayoutGroup>
          <motion.div
            className="absolute h-[56px] flex items-center left-1/2"
            initial={{ x: '-50%', y: 0, opacity: 1 }}
            animate={{ x: '-50%', y: direction === 'down' ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={sectionTitle[0]}
          >
            {sectionLogo[0] && (
              <img src={sectionLogo[0]} className="mr-2 inline h-6" alt={sectionTitle} />
            )}
            {sectionTitle[0]}
          </motion.div>
          <motion.div
            className="absolute h-[56px] flex items-center left-1/2"
            initial={{ x: '-50%', y: direction === 'down' ? 50 : -50, opacity: 0 }}
            animate={{ x: '-50%', y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={sectionTitle[1]}
          >
            {sectionLogo[1] && (
              <img src={sectionLogo[1]} className="mr-2 inline h-6" alt={sectionTitle} />
            )}
            {sectionTitle[1]}
          </motion.div>
        </LayoutGroup>
        {width > 639 &&
          (slug === 'apps-and-websites' || slug === 'designs') && (
            <Link
              href={slug === 'designs' ? '/apps-and-websites' : '/designs'}
              className="mr-1 px-2 py-0.5 !text-base right-2 absolute top-1/2 -translate-y-1/2"
            >
              {slug === 'designs' ? 'Apps And Websites' : 'Designs'}
              <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
            </Link>
          )}
      </div>
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">

        <Navigation headerItems={headerItems} />
        {/* filter sections by environment tags (production, development) */}
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
