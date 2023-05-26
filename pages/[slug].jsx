import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Section from '@components/Section';
import Layout from '@components/layout';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getHeaderLinks } from '@lib/api';
import { fetchEntries } from '@lib/fetchEntries';
import useScrollDirection from '@lib/useScrollDirection';
import useWindowDimensions from '@lib/windowSize';
import cn from 'classnames';
import { LayoutGroup, motion } from "framer-motion";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiPaintBrush } from 'react-icons/hi2';
import { TbAppWindowFilled } from 'react-icons/tb';

export default function InnerPage({ entries, headerItems, slug }) {
  const { width } = useWindowDimensions();
  const { sections } = entries[0];
  const sliderRef = useRef([]);
  const [currentSection, setCurrentSection] = useState("");
  const throttleInProgress = useRef();

  const scrollDir = useScrollDirection()

  useEffect(() => {
    handleThrottleScroll();
    window.addEventListener("scroll", handleThrottleScroll);
    return () => {
      window.removeEventListener("scroll", handleThrottleScroll);
    };
  }, []);

  function handleThrottleScroll() {
    if (throttleInProgress.current) {
      return;
    }
    throttleInProgress.current = true;
    setTimeout(() => {
      const scrollPosition = window.scrollY; // => scroll position

      sliderRef.current.map((section) => section && (scrollPosition >= section.offsetTop - 30)
        ? setCurrentSection(section.dataset.sysid)
        : "")

      throttleInProgress.current = false;
    }, 500);
  }

  return (
    <Layout>
      <div
        className={cn('transition-all items-center h-14 overflow-hidden fixed top-8 w-[90%] left-1/2 -translate-x-1/2 z-10 backdrop-blur-[12px] rounded-full bg-accent-2/70 dark:bg-accent-7/70 dark:border-accent-2/10 shadow-medium border border-accent-7/10 flex justify-between', {
          'xl:w-[50%] lg:w-[60%] md:w-[78%]': slug === 'designs',
          'lg:w-[40%] md:w-[90%]': slug === 'apps-and-websites'
        })}
      >
        {(slug === 'apps-and-websites' || slug === 'designs') && (
          <Link href="/" className="ml-5 px-2 py-0.5 !text-base">
            {width > 639 ? <>
              <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
              Home
            </> : <AiFillHome />}
          </Link>
        )}
        {sections.map(({ sys: { id }, fields }) =>
          <LayoutGroup>
            {currentSection === id && (
              <motion.div
                initial={{
                  y: scrollDir === "up" ? -30 : 30,
                  display: "none",
                  opacity: 0,
                  x: '-50%'
                }}
                animate={{
                  y: 0, display: "flex", opacity: 1,
                  x: '-50%'
                }}
                exit={{
                  y: scrollDir === "up" ? 30 : -30,
                  display: "none",
                  opacity: 0,
                  x: '-50%'
                }}
                key={id}
                className="absolute left-1/2 flex items-center whitespace-nowrap"
              >
                {fields.appLogo && (
                  <img src={fields.appLogo.fields.file.url} className="mr-2 inline h-6" alt={fields.title} />
                )}
                <p className='m-0'>
                  {fields.title}
                </p>
              </motion.div>
            )}
          </LayoutGroup>
        )}
        {(slug === 'apps-and-websites' || slug === 'designs') && (
          <Link
            href={slug === 'designs' ? '/apps-and-websites' : '/designs'}
            className="mr-5 px-2 py-0.5 !text-base"
          >
            {width > 639 && (slug === 'designs' ? 'Apps And Websites' : 'Designs')}
            {width > 639 ? <FontAwesomeIcon icon={faAngleRight} className="ml-2" /> : slug === 'designs' ? <HiPaintBrush /> : <TbAppWindowFilled className='w-5 h-5' />}
          </Link>
        )}
      </div>
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} />
        {/* filter sections by environment tags (production, development) */}
        {sections.map(
          (entry, i) => entry.metadata.tags.some((tags) => tags.sys.id === process.env.NODE_ENV) && (
            <Section
              windowWidth={width}
              {...entry.fields}
              i={i}
              sys={entry.sys}
              sliderRef={sliderRef}
            />
          )
        )}
        <Footer />
      </div>
    </Layout >
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
