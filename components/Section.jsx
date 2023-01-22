import { useState } from 'react';
import Container from '@components/Container';
import RichText from '@madebyconnor/rich-text-to-jsx';
import { StickyContainer, Sticky } from '@dior/react-sticky';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
// import LightGallery from 'lightgallery/react';
// import { LightGallerySettings } from 'lightgallery/lg-settings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import StackIcon from '@components/StackIcon';
import Link from 'next/link';
// import FsLightbox from 'fslightbox-react';
import Balancer from 'react-wrap-balancer';
import hexAlpha from 'hex-alpha';
import contrast from 'contrast';
import useCopyToClipboard from '@lib/useCopyToClipboard';
import ContentfulImage from '@components/contentful-image';
import NearLockApp from '@components/nearlock-app/NearLockApp';

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const Section = ({
  backgroundColor = '#ffffff',
  title,
  description,
  gallery,
  stack,
  windowWidth,
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copyToClipboard, { copyIcon }] = useCopyToClipboard();
  const sectionSlug = title.toLowerCase().split(' ').join('-');
  const contrastColor = contrast(backgroundColor);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <StickyContainer>
      <section
        style={{ backgroundColor }}
        className={`w-full overflow-hidden md:py-20 md:px-0 ${
          contrastColor === 'light' ? 'darker' : 'lighter'
        }`}
        id={sectionSlug}
      >
        <Sticky topOffset={50}>
          {({ style, isSticky }) => (
            <header
              style={{
                ...style,
                backgroundColor: hexAlpha(backgroundColor, 0.8),
                zIndex: 1080, // above tooltips
                boxShadow: isSticky ? '0px 0px 20px -10px rgba(0,0,0,.3)' : 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Container
                className={classnames(
                  {
                    sticky: isSticky,
                  },
                  'py-2',
                )}
              >
                <div className="flex items-center justify-center md:justify-between">
                  {isSticky &&
                    windowWidth > 550 &&
                    (slug === 'apps-and-websites' || slug === 'designs') && (
                      <Link href="/" className="flex items-center">
                        <a>
                          <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
                          Home
                        </a>
                      </Link>
                    )}
                  {/* "clipboard-title" class is needed for share section link (md:-mr-12) */}
                  <div className="clipboard-title flex items-center justify-center md:m-auto">
                    <h2 className="align-self-center text-nowrap text-3xl font-black md:text-6xl">
                      {title}
                    </h2>
                    {typeof window !== 'undefined' && windowWidth > 768 && (
                      <button
                        type="button"
                        color="link"
                        className="clipboard-btn ml-2"
                        onClick={() =>
                          copyToClipboard(`${window.location.origin}/${slug}#${sectionSlug}`)
                        }
                      >
                        <FontAwesomeIcon
                          icon={copyIcon}
                          color={contrastColor === 'light' ? '#000' : '#fff'}
                        />
                      </button>
                    )}
                  </div>
                  {isSticky &&
                    windowWidth > 550 &&
                    (slug === 'apps-and-websites' || slug === 'designs') && (
                      <Link
                        className="text-right"
                        href={slug === 'designs' ? '/apps-and-websites' : '/designs'}
                      >
                        <a>
                          {slug === 'designs' ? 'Apps And Websites' : 'Designs'}
                          <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                        </a>
                      </Link>
                    )}
                </div>
              </Container>
            </header>
          )}
        </Sticky>

        <div className="flex flex-col md:pb-5">
          <Container className="pb-4 text-center">
            <Balancer>{description && <RichText richText={description} />}</Balancer>
          </Container>
          {stack && (
            <>
              <Container>
                <h3 className="mb-4 text-center">Stack</h3>
              </Container>
              <Container
                className="flex flex-col items-center justify-center pb-4 md:flex-row"
                style={{
                  gap: '15px',
                }}
              >
                <ConditionalWrapper
                  condition={windowWidth < 768}
                  wrapper={(children) => (
                    <table className="border-separate border-spacing-4">{children}</table>
                  )}
                >
                  {stack.map((item) => (
                    <StackIcon
                      stackIcon={item}
                      isMobile={windowWidth < 768}
                      contrast={contrastColor === 'dark'}
                      section={title}
                    />
                  ))}
                </ConditionalWrapper>
              </Container>
            </>
          )}

          {gallery?.map(({ fields: { type, images }, sys: { id } }, i) => {
            const iphone = type === 'iPhone';
            const website = type === 'Website';
            const desktopApp = type === 'Desktop App';
            const webApp = type === 'Web App';
            const ipad = type === 'iPad' || type === 'iPad Landscape';
            // const [lightboxController, setLightboxController] = useState({
            //   toggler: false,
            //   slide: 1,
            // });

            return (
              <div key={`gallery-container-${id}`}>
                {!website ||
                  (!webApp && (
                    <Container>
                      <h3 className="mb-4 text-center">{type}</h3>
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
                    renderBullet: (className) =>
                      `<span class="${className}"><div class="owl-dot-el-1" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-2" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-3" style="background-color:${backgroundColor}"></div></span>`,
                  }}
                  className={type.replace(/ /g, '-').toLowerCase()}
                  navigation
                  modules={[Pagination, Navigation]}
                  style={{
                    padding:
                      website || desktopApp || webApp
                        ? windowWidth > 768
                          ? '0 20%'
                          : '0 15px'
                        : '0 40px',
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

                {i !== gallery.length - 1 && (
                  <Container className="my-5">
                    <hr className="m-0" />
                  </Container>
                )}
              </div>
            );
          })}
        </div>
      </section>
      {/* render MacOS Nearlock app */}
      {title === 'Near Lock App' && slug === 'designs' && (
        <div
          id="near-lock-interactive-app"
          className={classnames(
            {
              dark: isDarkMode,
            },
            'nearlock-app-wrapper overflow-hidden py-5',
          )}
        >
          {windowWidth >= 1120 && (
            <button
              type="button"
              onClick={toggleDarkMode}
              className={classnames('nearlock-app-wrapper-theme-toggler', { dark: isDarkMode })}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" />
            </button>
          )}
          <div
            className={classnames('my-2', {
              'mx-4': windowWidth < 768,
            })}
          >
            <Container
              fluid="lg"
              className={`${windowWidth >= 1120 && 'pb-5'} lighter text-center`}
            >
              <div className="d-flex justify-content-center align-items-center clipboard-title mr-md-n5">
                <p className="mb-0">Interactive preview of the Near Lock desktop app</p>
                {typeof window !== 'undefined' && windowWidth > 768 && (
                  <button
                    type="button"
                    color="link"
                    className="clipboard-btn ml-2"
                    onClick={() =>
                      copyToClipboard(`${window.location.origin}/${slug}#near-lock-interactive-app`)
                    }
                  >
                    <FontAwesomeIcon icon={copyIcon} color="#fff" />
                  </button>
                )}
              </div>
              <small
                style={{
                  color: 'hsla(0, 0%, 100%, .75)',
                }}
              >
                {windowWidth >= 1120
                  ? 'some of the features are not available yet'
                  : 'for an interactive preview, please visit desktop version of the website'}
              </small>
            </Container>
          </div>
          {windowWidth >= 1120 && (
            <div className="mb-5">
              <NearLockApp isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      )}
    </StickyContainer>
  );
};

export default Section;
