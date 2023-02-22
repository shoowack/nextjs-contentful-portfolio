import { useEffect, useState, useRef } from 'react';
import ContentfulImage from '@components/contentful-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import classnames from 'classnames';
import Container from '@components/Container';
import SidebarHeaderControls from './nearlock-app/SidebarHeaderControls';
// import LightGallery from 'lightgallery/react';
// import FsLightbox from 'fslightbox-react';

export default function Carousel({
  fields: { type, images, deviceBezel, browserThemeColor },
  sys: { id },
  i,
  windowWidth,
  galleryLength,
  isOdd,
}) {
  const iphone = type === 'iPhone';
  const website = type === 'Website';
  const desktopApp = type === 'Desktop App';
  const webApp = type === 'Web App';
  const ipad = type === 'iPad';
  const ipadLandscape = type === 'iPad Landscape';
  const ipads = ipad || ipadLandscape;
  const swiperRef = useRef();
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(false);

  // const [lightboxController, setLightboxController] = useState({
  //   toggler: false,
  //   slide: 1,
  // });

  useEffect(() => {
    setIsEnd(swiperRef?.current?.isEnd);
    setIsBeginning(swiperRef?.current?.isBeginning);
  }, []);

  return (
    <div key={`gallery-container-${id} relative`}>
      {(!website || !webApp) && (
        <Container>
          <h3
            className={classnames(
              'mb-4 text-center text-2xl font-extralight dark:font-normal text-[#333]/50 dark:text-[#aaa]/40',
              {
                'mb-10': deviceBezel && windowWidth >= 768 && iphone,
                'mb-16': deviceBezel && windowWidth >= 900 && ipads,
                'mb-14': (website || webApp) && windowWidth >= 768,
              },
            )}
          >
            {type}
          </h3>
        </Container>
      )}

      {/* <FsLightbox
        toggler={lightboxController.toggler}
        sources={images?.map(
          ({
            fields: {
              file: { url },
            },
          }) => url,
        )}
        slide={lightboxController.slide}
      /> */}

      <Swiper
        allowTouchMove={false}
        spaceBetween={50}
        slidesPerView={
          website || desktopApp || webApp
            ? 1
            : iphone
            ? windowWidth > 550
              ? windowWidth > 991
                ? windowWidth > 1200
                  ? windowWidth > 2200
                    ? windowWidth > 2600
                      ? 7
                      : 6
                    : 5
                  : 4
                : 3
              : 1
            : ipads
            ? windowWidth > 900
              ? windowWidth > 1400
                ? windowWidth > 2600
                  ? 4
                  : 3
                : 2
              : 1
            : 3
        }
        centeredSlides
        pagination={{
          dynamicBullets: true,
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">${[...Array(3)].map((_, bulletIndex) => {
              return `<div class="owl-dot-el-${bulletIndex} ${
                isOdd ? 'bg-[#f7f8fa] dark:bg-[#0d1117]' : 'bg-white dark:bg-[#010409]'
              }"></div>`;
            })}
            </span>`,
        }}
        className={classnames(
          type.replace(/ /g, '-').toLowerCase(),
          isOdd
            ? ' before:from-[#f7f8fa] after:from-[#f7f8fa] dark:before:from-[#0d1117] dark:after:from-[#0d1117]'
            : 'before:from-white after:from-white dark:before:from-[#010409] dark:after:from-[#010409]',
          {
            'before:absolute before:inset-y-0 before:left-0 before:z-[10] before:h-full before:bg-gradient-to-r before:content-[""] after:absolute after:inset-y-0 after:right-0 after:z-[2] after:h-full after:bg-gradient-to-l after:content-[""]':
              (windowWidth > 550 && iphone) ||
              (windowWidth > 900 && ipads) ||
              (windowWidth >= 768 && desktopApp) ||
              webApp ||
              website,
            'before:w-[220px] after:w-[220px]': windowWidth > 550 && windowWidth <= 1400 && ipads,
            'before:w-[350px] after:w-[350px]': windowWidth > 1400 && ipads,
            'before:w-[150px] after:w-[150px]': windowWidth > 550 && windowWidth <= 991 && iphone,
            'before:w-[250px] after:w-[300px]': windowWidth > 991 && windowWidth <= 1200 && iphone,
            'before:w-[400px] after:w-[400px]': windowWidth > 1200 && iphone,
            'before:w-[15%] after:w-[15%]': windowWidth >= 768 && (desktopApp || webApp || website),
          },
        )}
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        style={{
          padding:
            website || desktopApp || webApp ? (windowWidth >= 768 ? '0 20%' : '0 15px') : '0 40px',
        }}
      >
        {((deviceBezel && windowWidth > 900 && ipads) ||
          (deviceBezel && windowWidth >= 768 && iphone)) && (
          <div
            aria-hidden
            className={classnames(
              'pointer-events-none absolute left-[50%] z-50 w-full -translate-x-1/2 select-none',
              {
                'top-[-2.3%] h-[104.5%]': iphone,
                'top-[-3.64%] left-[50.03%] h-[107%]': ipad,
                'top-[-4.7%] h-[109.2%]': ipadLandscape,
              },
            )}
          >
            <ContentfulImage
              quality={100}
              layout="fill"
              src={deviceBezel?.fields.file.url}
              objectFit="contain"
              aria-hidden
            />
          </div>
        )}
        {(website || webApp) && windowWidth >= 768 && (
          <div
            aria-hidden
            style={{ background: browserThemeColor || '#eee' }}
            className={classnames(
              'flex justify-between w-[calc(100%-30px)] items-center md:w-[60%] pointer-events-none absolute left-[50%] top-[-35px] z-50 -translate-x-1/2 select-none h-[35px] rounded-t-[11px]',
            )}
          >
            <SidebarHeaderControls className="ml-2 scale-75" />
            <div className="self-center -ml-14 bg-black/10 w-96 h-5 rounded-[4px]" />
            <div />
          </div>
        )}
        {/* <LightGallery mode="lg-fade"> */}
        {images?.map(
          ({
            fields: {
              file: {
                url,
                details: {
                  image: { width, height },
                },
              },
              description,
            },
            sys: { id: imageId },
          }) => {
            return (
              <SwiperSlide
                key={`gallery-slide-${imageId}`}
                className={classnames('select-none', {
                  'rounded-[26px]': windowWidth >= 768 && iphone,
                  'rounded-[10px]': windowWidth < 768 && iphone,
                  'rounded-[7px]': windowWidth > 550 && ipad,
                  'rounded-[4px]':
                    ipads || ((website || webApp || desktopApp) && windowWidth < 1024),
                  'rounded-[11px]': desktopApp && windowWidth >= 1024,
                  'rounded-b-[11px]': (website || webApp) && windowWidth >= 1024,
                })}
              >
                {/* <a
                    data-lg-size={`${width}-${height}`}
                    className="gallery-item hover:cursor-zoom-in"
                    data-src={url}
                    data-sub-html="<h4>Photo by - <a href='https://ii.photography'>Ivan Suvak </a></h4><p>Location - Croatia</p>"
                    style={{ padding: 'unset' }}
                    onClick={() => {
                      setLightboxController({
                        toggler: !lightboxController.toggler,
                        slide: 1,
                      });
                    }}
                    aria-hidden
                  > */}
                <ContentfulImage
                  quality={100}
                  src={url}
                  alt={description}
                  height={height}
                  width={width}
                  layout="responsive"
                  className="select-none"
                  sizes={
                    website || desktopApp || webApp
                      ? '(max-width: 768px) 100vw, 60vw'
                      : iphone
                      ? '(max-width: 550px) 100vw, (max-width: 991px) 44vw, (max-width: 2200px) 29vw, (max-width: 2600px) 18vw, 20vw'
                      : ipads
                      ? '(max-width: 900px) 90vw, (max-width: 1400px) 45vw, 31vw'
                      : '1vw'
                  }
                />
                {/* </a> */}
              </SwiperSlide>
            );
          },
        )}
        {/* </LightGallery> */}
      </Swiper>
      {
        // this is not the same as galleryLength which is used for managing last divider
        images.length > 1 && (
          <div className="mt-5 flex justify-center md:mt-16 md:mb-24">
            <div
              className={classnames(
                'swiper-button-prev rounded-md bg-[#333333] p-3 text-white transition-opacity duration-200 dark:bg-white dark:text-black md:rounded md:py-2.5 md:px-1',
                { 'opacity-50 transition-opacity duration-200': isBeginning },
              )}
              onClick={() => {
                swiperRef.current?.slidePrev();
                setIsEnd(swiperRef.current.isEnd);
                setIsBeginning(swiperRef.current.isBeginning);
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div
              className={classnames(
                'swiper-button-next rounded-md bg-[#333333] p-3 text-white transition-opacity duration-200 dark:bg-white dark:text-black md:rounded md:py-2.5 md:px-1',
                { 'opacity-50 transition-opacity duration-200': isEnd },
              )}
              onClick={() => {
                swiperRef.current?.slideNext();
                setIsEnd(swiperRef.current.isEnd);
                setIsBeginning(swiperRef.current.isBeginning);
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )
      }
      <Container className="my-12">
        {i !== galleryLength - 1 && (
          <hr className="m-0 h-px border-0 bg-[#e1e4e8] dark:bg-[#30363d]" />
        )}
      </Container>
    </div>
  );
}
