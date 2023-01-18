/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import RichText from '@madebyconnor/rich-text-to-jsx';
import { StickyContainer, Sticky } from '@dior/react-sticky';
// import Link from "next/link";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
// import LightGallery from 'lightgallery/react';
// import { LightGallerySettings } from 'lightgallery/lg-settings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import StackIcons from 'components/StackIcons';
import Link from 'next/link';
// import FsLightbox from 'fslightbox-react';
import Balancer from 'react-wrap-balancer';
import useCopyToClipboard from '../lib/useCopyToClipboard';
import ContentfulImage from './contentful-image';
import NearLockApp from './nearlock-app/NearLockApp';
import hexToRgbA from '../lib/hexToRgba';
import { getContrast } from '../lib/getContrast';

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <StickyContainer>
      <section
        style={{ backgroundColor }}
        className={`px-md-0 py-md-5 ${getContrast(backgroundColor)}`}
        id={sectionSlug}
      >
        <Sticky topOffset={50}>
          {({ style, isSticky }) => (
            <header
              style={{
                ...style,
                backgroundColor: hexToRgbA(backgroundColor),
                zIndex: 1080, // above tooltips
                boxShadow: isSticky ? '0px 0px 20px -10px rgba(0,0,0,.3)' : 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Row>
                <Col md={12}>
                  <Container
                    fluid="lg"
                    className={classnames(
                      {
                        sticky: isSticky,
                      },
                      'py-2',
                    )}
                  >
                    <Row>
                      {isSticky &&
                        windowWidth > 550 &&
                        (slug === 'apps-and-websites' || slug === 'designs') && (
                          <Col>
                            <Link href="/">
                              <a>
                                <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
                                Home
                              </a>
                            </Link>
                          </Col>
                        )}
                      <Col>
                        <div className="d-flex justify-content-center align-items-center mr-md-n5">
                          <h2 className="align-self-center text-nowrap">{title}</h2>
                          {typeof window !== 'undefined' && windowWidth > 768 && (
                            <Button
                              color="link"
                              className="clipboard-btn ml-2"
                              onClick={() =>
                                copyToClipboard(`${window.location.origin}/${slug}#${sectionSlug}`)
                              }
                            >
                              <FontAwesomeIcon
                                icon={copyIcon}
                                color={getContrast(backgroundColor) === 'darker' ? '#000' : '#fff'}
                              />
                            </Button>
                          )}
                        </div>
                      </Col>
                      {isSticky &&
                        windowWidth > 550 &&
                        (slug === 'apps-and-websites' || slug === 'designs') && (
                          <Col className="text-right">
                            <Link href={slug === 'designs' ? '/apps-and-websites' : '/designs'}>
                              <a>
                                {slug === 'designs' ? 'Apps And Websites' : 'Designs'}
                                <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                              </a>
                            </Link>
                          </Col>
                        )}
                    </Row>
                  </Container>
                </Col>
              </Row>
            </header>
          )}
        </Sticky>

        <Row className="pb-md-5">
          <Col md={12}>
            <Container fluid="lg" className="pb-4 text-center">
              <Balancer>{description && <RichText richText={description} />}</Balancer>
            </Container>
            {stack && (
              <div>
                <Container>
                  <h3 className="mb-4 text-center">Stack</h3>
                </Container>
                <Container
                  fluid="lg"
                  className="d-flex flex-column flex-md-row align-items-center justify-content-center pb-4"
                  style={{
                    gap: '15px',
                  }}
                >
                  <ConditionalWrapper
                    condition={windowWidth < 768}
                    wrapper={(children) => (
                      <Table borderless className="m-0">
                        {children}
                      </Table>
                    )}
                  >
                    {stack && (
                      <StackIcons
                        stack={stack}
                        isMobile={windowWidth < 768}
                        contrast={getContrast(backgroundColor) === 'lighter'}
                        section={title}
                      />
                    )}
                  </ConditionalWrapper>
                </Container>
              </div>
            )}
          </Col>

          <Col md={12}>
            {gallery?.map(({ fields: { type, images } }, i) => {
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
                <div key={`gallery-container-${i}`}>
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
                      renderBullet: (index, className) =>
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
                      (
                        {
                          fields: {
                            file: {
                              url,
                              details: {
                                image: { width, height },
                              },
                            },
                          },
                        },
                        i,
                      ) => {
                        return (
                          <SwiperSlide key={`gallery-slide-${i}`}>
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
                              // quality={100}
                              src={url}
                              alt=""
                              height={height}
                              width={width}
                              layout="responsive"
                            />{' '}
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
          </Col>
        </Row>
      </section>
      {/* render MacOS Nearlock app */}
      {title === 'Near Lock App' && slug === 'designs' && (
        <Row
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
              onClick={toggleDarkMode}
              className={classnames('nearlock-app-wrapper-theme-toggler', { dark: isDarkMode })}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" />
            </button>
          )}
          <Col
            md={12}
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
                  <Button
                    color="link"
                    className="clipboard-btn ml-2"
                    onClick={() =>
                      copyToClipboard(`${window.location.origin}/${slug}#near-lock-interactive-app`)
                    }
                  >
                    <FontAwesomeIcon icon={copyIcon} color="#fff" />
                  </Button>
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
          </Col>
          {windowWidth >= 1120 && (
            <Col md={12} className="mb-5">
              <NearLockApp isDarkMode={isDarkMode} />
            </Col>
          )}
        </Row>
      )}
    </StickyContainer>
  );
};

Section.propTypes = {
  backgroundColor: PropTypes.string,
  layout: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.object,
  gallery: PropTypes.array,
};

export default Section;
