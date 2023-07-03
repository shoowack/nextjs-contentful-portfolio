import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Section from '@components/Section';
import Layout from '@components/layout';
import { getHeaderLinks } from '@lib/api';
import { getProjects } from '@lib/sanity.client';
import useWindowDimensions from '@lib/windowSize';

export default function InnerPage({ entries, headerItems }) {
  const { width } = useWindowDimensions();

  console.log(entries, 'entries')

  return (
    <Layout>
      <div className="z-[2] mb-[360px] min-h-full overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)] sm:mb-[300px] md:mb-[400px] md:shadow-[0_10px_60px_-10px_rgba(0,0,0,.2)] md:dark:shadow-[0_10px_60px_rgba(0,0,0,.5)]">
        <Navigation headerItems={headerItems} />
        {entries.map(
          (entry, i) => <Section windowWidth={width} {...entry} i={i} />)}
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
  const studioData = await getProjects(params.slug);

  return {
    props: {
      slug: params.slug,
      entries: studioData.projects,
      headerItems,
    },
  };
}
