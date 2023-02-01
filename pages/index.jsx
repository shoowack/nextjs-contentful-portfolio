import Layout from 'components/layout';
import FrontPage from 'components/front.page';
import { config } from '@fortawesome/fontawesome-svg-core';
import { getAllCategories } from '@lib/api';

export default function Index({ preview, allCategories }) {
  return (
    <>
      <Layout preview={preview}>
        <div className="site-main flex h-screen w-full flex-col md:flex-row">
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
