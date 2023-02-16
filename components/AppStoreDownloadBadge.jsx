import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function AppStoreDownloadBadge() {
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
    <Link
      href="https://apps.apple.com/us/app/near-lock/id886882252?itsct=apps_box_badge&amp;itscg=30200"
      className="p-0 inline-flex self-center !bg-transparent"
    >
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
