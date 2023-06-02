import ContentfulImage from '@components/ContentfulImage';
import { appsAndWebsitesSlug, designsSlug } from '@lib/constants';
import useScrollDirection from '@lib/useScrollDirection';
import cn from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { HiPaintBrush } from 'react-icons/hi2';
import { TbAppWindowFilled } from 'react-icons/tb';

export default function NavigationBar({ aboutSectionRef, slug, width, sections, sliderRef }) {
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const throttleInProgress = useRef(null);
  const scrollDir = useScrollDirection();

  function handleThrottleScroll() {
    if (throttleInProgress.current) {
      return;
    }
    throttleInProgress.current = true;
    setTimeout(() => {
      const scrollPosition = window.scrollY; // => scroll position

      sliderRef.current.map((section) =>
        section && scrollPosition >= section.offsetTop - 30
          ? setCurrentSection(section.dataset.sysid)
          : '',
      );

      throttleInProgress.current = false;
    }, 500);
  }

  useEffect(() => {
    handleThrottleScroll();
    window.addEventListener('scroll', handleThrottleScroll);
    return () => {
      window.removeEventListener('scroll', handleThrottleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const onScroll = () => {
      setScrolled(() => window.pageYOffset > aboutSectionRef?.current?.clientHeight); // optional chaining needed when anchor section links are shared
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  return (
    <div
      className={cn(
        'transition-all items-center overflow-hidden fixed w-[90%] left-1/2 -translate-x-1/2 z-10 backdrop-blur-[12px] rounded-full bg-accent-2/70 dark:bg-accent-7/70 dark:border-accent-2/10 shadow-medium border border-accent-7/10 flex justify-between',
        {
          'xl:w-[50%] lg:w-[60%] md:w-[78%]': slug === designsSlug,
          'lg:w-[40%] md:w-[90%]': slug === appsAndWebsitesSlug,
          'opacity-100 top-5 md:top-8': scrolled,
          'opacity-0 top-0 pointer-events-none': !scrolled,
        },
      )}
    >
      {(slug === appsAndWebsitesSlug || slug === designsSlug) && (
        <Link href="/" className="ml-2 p-4 !text-base">
          {width > 639 ? (
            <>
              <FaAngleLeft className="mr-2 inline" />
              Home
            </>
          ) : (
            <AiFillHome />
          )}
        </Link>
      )}
      {sections.map(({ sys: { id }, fields }) => (
        <LayoutGroup key={`navigation-bar-${id}`}>
          {currentSection === id && (
            <motion.div
              initial={{
                y: scrollDir === 'up' ? -30 : 30,
                display: 'none',
                opacity: 0,
                x: '-50%',
              }}
              animate={{
                y: 0,
                display: 'flex',
                opacity: 1,
                x: '-50%',
              }}
              exit={{
                y: scrollDir === 'up' ? 30 : -30,
                display: 'none',
                opacity: 0,
                x: '-50%',
              }}
              key={id}
              className="absolute left-1/2 flex items-center whitespace-nowrap"
            >
              {fields.appLogo?.fields.file.url && (
                <div className="relative mr-2 inline h-6 w-6">
                  <ContentfulImage
                    src={fields.appLogo.fields.file.url}
                    className="object-contain"
                    alt={fields.title}
                    fill
                    sizes="100vw"
                  />
                </div>
              )}
              <p className="m-0">{fields.title}</p>
            </motion.div>
          )}
        </LayoutGroup>
      ))}
      {(slug === appsAndWebsitesSlug || slug === designsSlug) && (
        <Link
          href={slug === designsSlug ? `/${appsAndWebsitesSlug}` : `/${designsSlug}`}
          className="mr-2 p-4 !text-base"
        >
          {width > 639 && (slug === designsSlug ? 'Apps And Websites' : 'Designs')}
          {/* eslint-disable-next-line no-nested-ternary */}
          {width > 639 ? (
            <FaAngleRight className="ml-2 inline" />
          ) : slug === designsSlug ? (
            <TbAppWindowFilled className="h-5 w-5" />
          ) : (
            <HiPaintBrush />
          )}
        </Link>
      )}
    </div>
  );
}
