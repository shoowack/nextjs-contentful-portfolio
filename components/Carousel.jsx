import { useEffect, useState, useRef } from 'react';
import ContentfulImage from '@components/contentful-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import classnames from 'classnames';
import Container from '@components/Container';

export default function Carousel({
  fields: { type, images },
  sys: { id },
  i,
  contrastColor,
  windowWidth,
  galleryLength,
  backgroundColor,
}) {
  console.log();
  const iphone = type === 'iPhone';
  const website = type === 'Website';
  const desktopApp = type === 'Desktop App';
  const webApp = type === 'Web App';
  const ipad = type === 'iPad' || type === 'iPad Landscape';
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
    <div key={`gallery-container-${id}`}>
      {!website ||
        (!webApp && (
          <Container>
            {' '}
            <h3
              className={classnames(
                'mb-4 text-center text-2xl font-extralight',
                contrastColor === 'light' ? 'text-black/50' : 'text-white/50',
              )}
            >
              {type}
            </h3>
          </Container>
        ))}

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
                      ? 6
                      : 5
                    : 4
                  : 3
                : 2
              : 1
            : ipad
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
            `<span class="${className}"><div class="owl-dot-el-1" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-2" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-3" style="background-color:${backgroundColor}"></div></span>`,
        }}
        className={type.replace(/ /g, '-').toLowerCase()}
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        style={{
          padding:
            website || desktopApp || webApp ? (windowWidth > 768 ? '0 20%' : '0 15px') : '0 40px',
        }}
      >
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
            },
            sys: { id: imageId },
          }) => {
            return (
              <SwiperSlide key={`gallery-slide-${imageId}`}>
                {/* <a
                          data-lg-size={`${width}-${height}`}
                          className="gallery-item"
                          data-src={url}
                          data-sub-html="<h4>Photo by - <a href='https://ii.photography'>Ivan Suvak </a></h4><p>Location - Croatia</p>"
                        > */}
                {/* <a
                              style={{ padding: 'unset' }}
                              onClick={() => {
                                setLightboxController({
                                  toggler: !lightboxController.toggler,
                                  slide: i + 1,
                                });
                              }}
                            > */}
                <ContentfulImage
                  quality={100}
                  src={url}
                  alt=""
                  height={height}
                  width={width}
                  layout="responsive"
                  sizes={
                    website || desktopApp || webApp
                      ? '(max-width: 768px) 100vw, 60vw'
                      : iphone
                      ? '(max-width: 550px) 100vw, (max-width: 991px) 44vw, (max-width: 2200px) 29vw, (max-width: 2600px) 18vw, 20vw'
                      : ipad
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
      <div className="flex justify-center mt-16 mb-24">
        <div
          className={classnames(
            'swiper-button-prev transition-opacity duration-200 py-1',
            contrastColor === 'dark' ? 'bg-white text-black' : 'bg-[#333333]',
            { 'opacity-25 transition-opacity duration-200': isBeginning },
          )}
          onClick={() => {
            swiperRef.current?.slidePrev();
            setIsEnd(swiperRef.current.isEnd);
            setIsBeginning(swiperRef.current.isBeginning);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
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
            'swiper-button-next transition-opacity duration-200 py-1',
            contrastColor === 'dark' ? 'bg-white text-black' : 'bg-[#333333]',
            { 'opacity-25 transition-opacity duration-200': isEnd },
          )}
          onClick={() => {
            swiperRef.current?.slideNext();
            setIsEnd(swiperRef.current.isEnd);
            setIsBeginning(swiperRef.current.isBeginning);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {i !== galleryLength - 1 && (
        <Container className="my-12">
          <hr className="m-0" />
        </Container>
      )}
    </div>
  );
}
