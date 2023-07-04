import Footer from '@components/Footer';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Section from '@components/Section';
import { HeaderItemsType } from '@interfaces/header-items';
import { getHeaderLinks } from '@lib/api';
import { appsAndWebsitesSlug, designsSlug } from '@lib/constants';
import { getProjects } from '@lib/sanity.client';
import useWindowDimensions from '@lib/windowSize';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MutableRefObject, useRef } from 'react';

export default function InnerPage({ projects, headerItems, slug }) {
  const { width } = useWindowDimensions();
  const sliderRef: MutableRefObject<any[]> = useRef([]);
  const aboutSectionRef: MutableRefObject<HTMLDivElement> = useRef(null);

  console.log(projects, 'projects')

  return (
    <Layout>
      {/* <NavigationBar
        aboutSectionRef={aboutSectionRef}
        slug={slug}
        width={width}
        sections={projects}
        sliderRef={sliderRef}
      /> */}
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} aboutSectionRef={aboutSectionRef} />
        {/* filter sections by environment tags (production, development) */}
        {projects.map(
          (entry, i) =>
              <Section
                windowWidth={width}
                {...entry}
                i={i}
                // key={`projects-${entry.sys.id}`}
                // sys={entry.sys}
                sliderRef={sliderRef}
              />
        )}
        <Footer />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: designsSlug } }, { params: { slug: appsAndWebsitesSlug } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerItems: HeaderItemsType = (await getHeaderLinks()) ?? [];

  const projects = await getProjects(params.slug)

  return {
    props: {
      slug: params.slug,
      projects: projects.projects,
      headerItems,
    },
  };
};
