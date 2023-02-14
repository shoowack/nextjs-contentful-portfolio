import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <p>Something went wrong, we have nothing on:</p>
      <p>
        <code className="font-weight-bold d-inline">{router.asPath}</code>
      </p>
      <p>
        You may find what you were looking for on our{' '}
        <Link
          href="/"
          className="bg-black/10 hover:bg-black/20 transition-all ease-in-out duration-500"
        >
          Homepage
        </Link>
      </p>
    </div>
  );
}
