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
import StackIcon from '@components/StackIcon';
import Link from 'next/link';
// import FsLightbox from 'fslightbox-react';
import Balancer from 'react-wrap-balancer';
import hexAlpha from 'hex-alpha';
import contrast from 'contrast';
import useCopyToClipboard from '@lib/useCopyToClipboard';
import NearLockApp from '@components/nearlock-app/NearLockApp';
import Carousel from '@components/Carousel';

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
  const {
    query: { slug },
  } = useRouter();
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
        className={classnames(
          `w-full overflow-hidden md:py-10 md:px-0`,
          contrastColor === 'light' ? 'darker text-black/75' : 'lighter text-white/75',
        )}
        id={sectionSlug}
      >
        <Sticky topOffset={windowWidth > 767 ? 45 : 20}>
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
                <div
                  className={classnames(
                    {
                      'sm:justify-between': isSticky,
                    },
                    'flex items-center justify-center',
                  )}
                >
                  {isSticky &&
                    windowWidth > 639 &&
                    (slug === 'apps-and-websites' || slug === 'designs') && (
                      <Link href="/">
                        <a className="px-2 py-0.5 !text-base">
                          <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
                          Home
                        </a>
                      </Link>
                    )}
                  {/* "clipboard-title" class is needed for share section link */}
                  <div className="group clipboard-title flex items-center justify-center md:-mr-8">
                    <h2
                      className={classnames(
                        'align-self-center text-nowrap font-black [transition:font-size_0.2s]', // don't animate all properties!
                        contrastColor === 'light' ? 'text-black' : 'text-white',
                        {
                          'sm:text-2xl': isSticky,
                          'sm:ml-28 md:ml-24': slug === 'designs' && isSticky, // has to take into consideration width of the "apps and websites" button
                          'sm:ml-8 md:ml-2': slug === 'apps-and-websites' && isSticky, // has to take into consideration width of the "designs" button
                          'text-3xl leading-[78px] sm:ml-6 md:mr-4 md:text-[60px]': !isSticky,
                        },
                      )}
                    >
                      {title}
                    </h2>
                    {typeof window !== 'undefined' && windowWidth > 639 && (
                      <button
                        type="button"
                        color="link"
                        className="clipboard-btn ml-2 opacity-0 [transition:opacity_0.25s_1500ms] sm:group-hover-[.clipboard-title]:opacity-100 sm:group-hover-[.clipboard-title]:[transition:opacity_0.25s_0ms]"
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
                    windowWidth > 639 &&
                    (slug === 'apps-and-websites' || slug === 'designs') && (
                      <Link href={slug === 'designs' ? '/apps-and-websites' : '/designs'}>
                        <a className="px-2 py-0.5 !text-base">
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
                <h3
                  className={classnames(
                    'mb-4 text-center text-2xl font-extralight',
                    contrastColor === 'light' ? 'text-black/50' : 'text-white/50',
                  )}
                >
                  Stack
                </h3>
              </Container>
              <Container className="flex flex-col items-center justify-center pb-10 md:flex-row">
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

          {gallery?.map((props, i) => (
            <Carousel
              {...props}
              contrastColor={contrastColor}
              windowWidth={windowWidth}
              galleryLength={gallery.length}
              backgroundColor={backgroundColor}
              i={i}
            />
          ))}
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
            'nearlock-app-wrapper relative overflow-hidden py-12',
          )}
          style={{
            background: isDarkMode
              ? '#20364b linear-gradient(32deg, #0F022B 0%, #760697 50%, #360EB0 80%)'
              : '#D667A3 linear-gradient(32deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
          }}
        >
          {windowWidth >= 1120 && (
            <button
              type="button"
              onClick={toggleDarkMode}
              className={classnames(
                'group nearlock-app-wrapper-theme-toggler absolute right-12 top-10 z-[1] flex h-12 w-12 items-center justify-center rounded-full [transition:background_0.5s]',
                isDarkMode ? 'bg-[#211C21]' : 'bg-white',
                {
                  dark: isDarkMode,
                },
              )}
            >
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                size="1x"
                color={isDarkMode ? 'yellow' : '#368EFC'}
                className="rotate-0 scale-100 transition-transform duration-1000 group-active-[.nearlock-app-wrapper-theme-toggler]:rotate-180 group-active-[.nearlock-app-wrapper-theme-toggler]:scale-50 group-active-[.nearlock-app-wrapper-theme-toggler]:duration-[100ms]"
              />
            </button>
          )}
          <div
            className={classnames('my-2', {
              'mx-4': windowWidth < 768,
            })}
          >
            <Container
              fluid="lg"
              className={`${windowWidth >= 1120 && 'pb-12'} lighter text-center`}
            >
              <div className="group clipboard-title mr-md-n5 flex items-center justify-center">
                <Balancer>
                  <p className="mb-0 text-white">
                    Interactive preview of the Near Lock desktop app
                  </p>
                </Balancer>
                {typeof window !== 'undefined' && windowWidth > 768 && (
                  <button
                    type="button"
                    className="clipboard-btn ml-2 opacity-0 [transition:opacity_0.25s_1500ms] sm:group-hover-[.clipboard-title]:opacity-100 sm:group-hover-[.clipboard-title]:[transition:opacity_0.25s_0ms]"
                    onClick={() =>
                      copyToClipboard(`${window.location.origin}/${slug}#near-lock-interactive-app`)
                    }
                  >
                    <FontAwesomeIcon icon={copyIcon} color="#fff" />
                  </button>
                )}
              </div>
              <Balancer>
                <small className="text-white/[0.75]">
                  {windowWidth >= 1120
                    ? 'some of the features are not available yet'
                    : 'for an interactive preview, please visit desktop version of the website'}
                </small>
              </Balancer>
            </Container>
          </div>
          {windowWidth >= 1120 && (
            <div className="mb-12">
              <NearLockApp isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      )}
    </StickyContainer>
  );
};

export default Section;
