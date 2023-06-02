import Meta from '@components/Meta';

// eslint-disable-next-line no-unused-vars
export default function Layout({ children }: any) {
  return (
    <>
      <Meta />
      {children}
    </>
  );
}
