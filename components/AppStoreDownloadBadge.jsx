import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AppStoreDownloadBadge({ link }) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Link href={link} className="!bg-transparent p-0" target="_blank">
      <Image
        src={`https://tools.applemediaservices.com/api/badges/download-on-the-app-store/${
          currentTheme === 'dark' ? 'white' : 'black'
        }/en-us?size=250x83&amp;releaseDate=1418256000`}
        alt="Download on the App Store"
        height={40}
        width={120}
        loader={({ src }) => src}
      />
    </Link>
  );
}
