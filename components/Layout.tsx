import Meta from '@components/Meta';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Meta />
    {children}
  </>
);

export default Layout;
