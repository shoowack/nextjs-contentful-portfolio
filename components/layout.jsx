import Meta from './meta';

// eslint-disable-next-line no-unused-vars
export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      {children}
    </>
  );
}
