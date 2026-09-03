import Meta from '@components/Meta';

interface Props {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
}

const Layout: React.FC<Props> = ({ children, metaTitle, metaDescription }) => (
  <>
    <Meta title={metaTitle} description={metaDescription} />
    {children}
  </>
);

export default Layout;
