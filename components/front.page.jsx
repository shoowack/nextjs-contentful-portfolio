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
      <a
        className="group section grow-1 relative flex h-1/3 w-full flex-1 justify-center transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#333] before:content-[''] md:h-full md:before:bg-none md:hover:grow-[1.8]"
        target={openInNewTab && '_blank'}
      >
        {title && subscript && (
          <div className="absolute bottom-[2vh] flex flex-col items-center md:bottom-[6vh]">
            {title && (
              <h1 className="whitespace-nowrap font-sans text-[8vw] uppercase text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] md:text-[2.5vw] md:transition-[font-size] md:duration-300 md:group-hover-[.section]:text-[3vw]">
                {title}
              </h1>
            )}
            {subscript && (
              <h3 className="mt-2 font-sans text-[4vw] font-thin uppercase tracking-widest text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] sm:mt-0 md:text-[1vw] md:transition-all md:duration-300 md:group-hover-[.section]:text-[1.6vw]">
                {subscript}
              </h3>
            )}
          </div>
        )}
        {superscript && (
          <div className="absolute top-[6vh] transition-all md:top-[9vh] md:opacity-0 md:group-hover-[.section]:top-[5vh] md:group-hover-[.section]:opacity-100 md:group-hover-[.section]:delay-100 md:group-hover-[.section]:duration-700">
            <p className="font-sans text-[12px] text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] transition-[font-size] md:text-[0.5vw] md:group-hover-[.section]:text-[1vw] md:group-hover-[.section]:duration-500">
              {superscript}
            </p>
          </div>
        )}
        {url && (
          <ContentfulImage
            quality={100}
            src={url}
            sizes="(max-width: 768px) 100vw, 50vw" // 50vw because the image is wider than 33% on hover
            layout="fill"
            className="absolute -z-10 h-full w-full object-cover"
          />
        )}
      </a>
    </Link>
  );
}
