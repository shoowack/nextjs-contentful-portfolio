import ContentfulImage from '@components/ContentfulImage';
import Layout from '@components/Layout';
import { FrontPage } from '@interfaces/front-page';
import { getAllCategories } from '@lib/api';
import Link from 'next/link';

const Index: React.FC<FrontPage> = ({ allCategories }) => (
  <Layout>
    <div className="site-main flex h-screen w-full flex-col md:flex-row">
      {allCategories.map(
        ({
          sys: { id },
          link,
          openInNewTab,
          title,
          subscript,
          superscript,
          backgroundImage: { url, description },
        }) => (
          <Link
            href={link}
            key={id}
            className="group/section relative flex h-1/3 w-full flex-1 justify-center transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#333] before:content-[''] md:h-full md:before:bg-none md:hover:grow-[1.8]"
            target={openInNewTab ? '_blank' : '_self'}
          >
            {title && subscript && (
              <div className="absolute bottom-[2vh] flex flex-col items-center md:bottom-[6vh]">
                {title && (
                  <h1
                    data-parent={title}
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className="bg:bg-shine whitespace-nowrap font-graphik text-lg font-semibold uppercase leading-10 !text-white/80 drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] before:absolute before:left-0 before:top-0 before:w-full before:bg-[length:200%] before:bg-clip-text before:bg-right before:text-transparent before:content-[attr(data-parent)] sm:text-[4vw] md:pb-5 md:text-[2.5vw] md:transition-[font-size,padding] md:duration-300 md:group-hover/section:pb-8 md:group-hover/section:text-[3vw] md:group-hover/section:before:animate-shine xl:text-6xl xl:group-hover/section:text-[4rem]"
                  >
                    {title}
                  </h1>
                )}
                {subscript && (
                  <p className="mb-0 px-5 text-center font-graphik text-sm font-light uppercase tracking-widest text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] sm:mt-0 md:text-[1vw] md:transition-all md:duration-300 md:group-hover/section:text-[1.6vw] xl:text-2xl xl:group-hover/section:text-[2.25rem]">
                    {subscript}
                  </p>
                )}
              </div>
            )}
            {superscript && (
              <div className="absolute top-[6vh] transition-all md:top-[9vh] md:opacity-0 md:group-hover/section:top-[5vh] md:group-hover/section:opacity-100 md:group-hover/section:delay-100 md:group-hover/section:duration-700">
                <p className="font-graphik text-[12px] text-white drop-shadow-[0px_2px_5px_rgba(0,0,0,0.5)] transition-[font-size] md:text-[0.5vw] md:group-hover/section:text-[1vw] md:group-hover/section:duration-500">
                  {superscript}
                </p>
              </div>
            )}
            {url && (
              <ContentfulImage
                quality={100}
                src={url}
                sizes="(max-width: 768px) 100vw, 70vw" // 50vw because the image is wider than 33% on hover
                fill
                className="absolute -z-10 h-full w-full object-cover"
                alt={description}
              />
            )}
          </Link>
        ),
      )}
    </div>
  </Layout>
);

export default Index;

export async function getStaticProps({ preview = false }) {
  const allCategories = (await getAllCategories(preview)) ?? [];
  return {
    props: { preview, allCategories },
  };
}
