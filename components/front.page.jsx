import Link from 'next/link';
import ContentfulImage from '@components/contentful-image';

export default function FrontPage({
  sys: { id },
  link,
  openInNewTab,
  title,
  subscript,
  superscript,
  backgroundImage: { url },
}) {
  return (
    <Link href={link} key={id}>
      <a className="section" target={openInNewTab && '_blank'}>
        {title && subscript && (
          <div className="section-title">
            {title && <h1>{title}</h1>}
            {subscript && <h3>{subscript}</h3>}
          </div>
        )}
        {superscript && (
          <div className="section-description">
            <p>{superscript}</p>
          </div>
        )}
        {url && (
          <ContentfulImage
            quality={100}
            src={url}
            sizes="(max-width: 768px) 100vw, 50vw"
            layout="fill"
            className="section-bg-img"
          />
        )}
      </a>
    </Link>
  );
}
