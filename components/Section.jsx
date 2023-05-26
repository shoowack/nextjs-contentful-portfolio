import Carousel from '@components/Carousel';
import Container from '@components/Container';
import StackIcon from '@components/StackIcon';
import NearLockApp from '@components/nearlock-app/NearLockApp';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCopyToClipboard from '@lib/useCopyToClipboard';
import RichText from '@madebyconnor/rich-text-to-jsx';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Balancer from 'react-wrap-balancer';
// import { useInView } from 'framer-motion';
import AppStoreDownloadBadge from './AppStoreDownloadBadge';

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const Section = ({
  title,
  description,
  gallery,
  stack,
  windowWidth,
  i,
  appLogo,
  storeLink,
  sys,
  sliderRef
}) => {
  const {
    query: { slug },
  } = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copyToClipboard, { copyIcon }] = useCopyToClipboard();
  const sectionSlug = title.toLowerCase().split(' ').join('-');
  const isOdd = i % 2;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // filter galleries by environment tags (production, development)
  const filteredGalleries = gallery?.filter((gal) =>
    gal.metadata.tags.some((tag) => tag.sys.id === process.env.NODE_ENV),
  );

  return (
    <>
      <section
        className={classnames(
          `w-full overflow-hidden border-b border-[#e1e4e8] text-black/75 dark:border-[#30363d] md:py-10 md:px-0`,
          isOdd ? 'lighter bg-[#f7f8fa] dark:bg-[#0d1117]' : 'darker bg-white dark:bg-[#010409]',
        )}
        id={sectionSlug}
        data-sysid={sys.id}
        ref={(el) => (sliderRef.current[i] = el)}
      >
        <header
          className={classnames(
            'z-[1080]',
            i % 2
              ? 'bg-[#f7f8fa]/[0.8] dark:bg-[#0d1117]/[0.6]'
              : 'bg-white/[0.8] dark:bg-[#010409]/[0.6]',
            {
              'backdrop-blur-[10px]': windowWidth <= 639
            },
          )}
        >
          <Container className={'py-2'} >
            <div className={classnames('flex items-center justify-center')}
            >
              {/* "clipboard-title" class is needed for share section link */}
              <div className="clipboard-title group flex items-center justify-center md:-mr-8">
                <div
                  className={'flex items-center md:ml-4 '}
                >
                  <h2
                    // eslint-disable-next-line no-return-assign, no-param-reassign
                    className={'text-3xl leading-[78px] md:text-[60px] align-self-center text-nowrap font-black text-[#333333] [transition:font-size_0.2s] dark:text-[#eeeeee]'}
                  >
                    {title}
                  </h2>
                  {typeof window !== 'undefined' && windowWidth > 639 && (
                    <button
                      type="button"
                      color="link"
                      className={'clipboard-btn md:ml-4 opacity-0 text-[#333333] dark:text-[#eeeeee] [transition:opacity_0.25s_1500ms] sm:group-hover-[.clipboard-title]:opacity-100 sm:group-hover-[.clipboard-title]:[transition:opacity_0.25s_0ms]'}
                      onClick={() =>
                        copyToClipboard(`${window.location.origin}/${slug}#${sectionSlug}`)
                      }
                    >
                      <FontAwesomeIcon icon={copyIcon} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </header>
        <div className="flex flex-col md:mt-10 md:pb-5">
          <Container className="pb-4">
            {stack && (
              <>
                <Container className="flex flex-col items-center justify-center !px-0 pb-5 md:flex-row">
                  <ConditionalWrapper
                    condition={windowWidth < 768}
                    wrapper={(children) => (
                      <table className="border-separate border-spacing-4">
                        <tbody>{children}</tbody>
                      </table>
                    )}
                  >
                    {stack.map((item) => (
                      <StackIcon
                        key={`${sectionSlug}-${item.replace(/ /g, '-').toLowerCase()}`}
                        stackIcon={item}
                        isMobile={windowWidth < 768}
                        section={title}
                      />
                    ))}
                  </ConditionalWrapper>
                </Container>
              </>
            )}
            {description && (
              <div className="pb-8 text-[#333333] dark:text-[#aaa] sm:text-center">
                <ConditionalWrapper
                  condition={windowWidth >= 640}
                  wrapper={(children) => <Balancer>{children}</Balancer>}
                >
                  <RichText richText={description} />
                </ConditionalWrapper>
              </div>
            )}
            {storeLink && (
              <div className="flex justify-center">
                <AppStoreDownloadBadge link={storeLink} />
              </div>
            )}
          </Container>
          {filteredGalleries?.map((entry, index) => (
            <Carousel
              key={entry.sys.id}
              {...entry}
              isOdd={isOdd}
              windowWidth={windowWidth}
              galleryLength={filteredGalleries.length}
              i={index}
            />
          ))}
        </div>
      </section >
      {/* render MacOS Nearlock app */}
      {
        title === 'Near Lock App' && slug === 'designs' && (
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
                  'nearlock-app-wrapper-theme-toggler group absolute right-12 top-10 z-[1] flex h-12 w-12 items-center justify-center rounded-full [transition:background_0.5s]',
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
                <div className="clipboard-title mr-md-n5 group flex items-center justify-center">
                  <Balancer>
                    <p className="mb-0 leading-6 text-white">
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
                  <p className="mt-4 mb-0 text-xs leading-5 tracking-wider text-white/[0.75]">
                    {windowWidth >= 1120
                      ? 'some of the features are not available yet'
                      : 'for an interactive preview, please visit desktop version of the website'}
                  </p>
                </Balancer>
              </Container>
            </div>
            {windowWidth >= 1120 && (
              <div className="mb-12">
                <NearLockApp isDarkMode={isDarkMode} />
              </div>
            )}
          </div>
        )
      }
    </>
  );
};

export default Section;
