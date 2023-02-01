import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function Meta() {
  const title = 'Ivan Suvak Martinovic | Full Stack Developer';
  const desc = 'Creative Full Stack developer living in Canada. Check out some of my work.';
  const ogImgRelativePath = '/og.png';

  const siteURL = 'https://shoowack.com';
  const ogImageURL = `${siteURL}${ogImgRelativePath}`;
  const asPath = useRouter()?.asPath;
  const pageURL = asPath === '/' ? siteURL : siteURL + asPath;
  const twitterHandle = '@shoowack';
  const siteName = 'ISM';

  return (
    <NextSeo
      title={title}
      description={desc}
      themeColor="#000000"
      canonical={pageURL}
      openGraph={{
        type: 'website',
        locale: 'en_US', //  Default is en_US
        url: pageURL,
        title,
        description: desc,
        images: [
          {
            url: ogImageURL,
            width: 1200,
            height: 630,
            alt: 'Ivan Suvak Martinovic Personal Portfolio',
          },
        ],
        site_name: siteName,
      }}
      twitter={{
        handle: twitterHandle,
        site: twitterHandle,
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          property: 'author',
          content: title,
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `${siteURL}/favicon.ico`,
        },
      ]}
    />
  );
}
