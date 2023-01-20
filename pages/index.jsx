import Layout from 'components/layout';
import Head from 'next/head';
import FrontPage from 'components/front.page';
import { config } from '@fortawesome/fontawesome-svg-core';
import { getAllCategories } from '@lib/api';

export default function Index({ preview, allCategories }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Ivan Suvak Martinovic Personal Portfolio</title>
        </Head>
        <div className="site-main hover:md:group-[.section]:brightness-50 flex h-screen w-full flex-col md:flex-row hover:md:group-hover-[.section]:brightness-100">
          {allCategories.map((post) => (
            <FrontPage {...post} key={post.sys.id} />
          ))}
        </div>
      </Layout>
    </>
  );
}

config.autoAddCss = false;

export async function getStaticProps({ preview = false }) {
  const allCategories = (await getAllCategories(preview)) ?? [];
  return {
    props: { preview, allCategories },
  };
}
