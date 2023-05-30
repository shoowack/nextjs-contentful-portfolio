import { getAllCategories } from '@lib/api';
import FrontPage from 'components/front.page';
import Layout from 'components/layout';

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

export async function getStaticProps({ preview = false }) {
  const allCategories = (await getAllCategories(preview)) ?? [];
  return {
    props: { preview, allCategories },
  };
}
