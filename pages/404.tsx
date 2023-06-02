import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <p>Something went wrong, we have nothing on:</p>
      <p>
        <code className="font-bold inline">{router.asPath}</code>
      </p>
      <p>
        You may find what you were looking for on our{' '}
        <Link
          href="/"
          className="bg-black/10 transition-all duration-500 ease-in-out hover:bg-black/20"
        >
          Homepage
        </Link>
      </p>
    </div>
  );
}
