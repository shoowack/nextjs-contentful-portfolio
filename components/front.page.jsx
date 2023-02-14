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
    <Link
      href={link}
      key={id}
      className="group/section grow-1 relative flex h-1/3 w-full flex-1 justify-center transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#333] before:content-[''] md:h-full md:before:bg-none md:hover:grow-[1.8]"
      target={openInNewTab ? '_blank' : '_self'}
    >
      {title && subscript && (
        <div className="absolute bottom-[2vh] flex flex-col items-center md:bottom-[6vh]">
          {title && (
            <h1
              data-parent={title}
              className="bg:bg-shine xl:text-6xl text-lg sm:text-[4vw] md:group-hover/section:pb-8 md:pb-5 whitespace-nowrap font-sans font-semibold uppercase leading-10 !text-white/80 drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] before:absolute before:left-0 before:top-0 before:w-full before:bg-[length:200%] before:bg-clip-text before:bg-right before:text-transparent before:content-[attr(data-parent)] md:text-[2.5vw] md:transition-[font-size,padding] md:duration-300 md:group-hover/section:text-[3vw] xl:group-hover/section:text-[4rem] md:group-hover/section:before:animate-shine"
            >
              {title}
            </h1>
          )}
          {subscript && (
            <h3 className="text-center px-5 text-sm xl:text-2xl font-sans font-thin uppercase tracking-widest text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] sm:mt-0 md:text-[1vw] md:transition-all md:duration-300 md:group-hover/section:text-[1.6vw] xl:group-hover/section:text-[2.25rem]">
              {subscript}
            </h3>
          )}
        </div>
      )}
      {superscript && (
        <div className="absolute top-[6vh] transition-all md:top-[9vh] md:opacity-0 md:group-hover/section:top-[5vh] md:group-hover/section:opacity-100 md:group-hover/section:delay-100 md:group-hover/section:duration-700">
          <p className="font-sans text-[12px] text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] transition-[font-size] md:text-[0.5vw] md:group-hover/section:text-[1vw] md:group-hover/section:duration-500">
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
    </Link>
  );
}
