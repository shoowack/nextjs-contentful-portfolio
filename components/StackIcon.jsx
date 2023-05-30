import { Popover, Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import {
  ACF,
  Bootstrap,
  Contentful,
  ContentfulAlt,
  Firebase,
  Formik,
  GraphQL,
  Illustrator,
  MySQL,
  NextJS,
  NextJSAlt,
  PHP,
  Photoshop,
  React,
  Redux,
  SASS,
  SASSAlt,
  Sketch,
  Symfony,
  SymfonyAlt,
  Tailwind,
  TypeScript,
  WordPress,
  WordPressAlt,
  jQuery,
  jQueryAlt,
} from '@lib/stackLogos';

const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function StackIcon({ stackIcon, section, isMobile }) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  let src;
  let height;
  const width = 40;
  let tooltip;
  const iconHeight = 30;
  const heightPercentage = (percentage) => (iconHeight * percentage) / 100;
  // const heightPercentage = (percentage) => (iconHeight * percentage) / 100;
  const project = section.replace(/\./g, '-').replace(/ /g, '-').toLowerCase();
  const stackName = stackIcon.replace(/ /g, '-').toLowerCase();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (stackIcon) {
    case 'ACF':
      src = ACF.src;
      tooltip = 'Advanced Custom Fields';
      break;
    case 'Bootstrap':
      src = Bootstrap.src;
      height = heightPercentage(97);
      break;
    case 'Contentful':
      src = currentTheme === 'dark' ? Contentful.src : ContentfulAlt.src;
      break;
    case 'Firebase':
      src = Firebase.src;
      break;
    case 'GraphQL':
      src = GraphQL.src;
      break;
    case 'Illustrator':
      src = Illustrator.src;
      break;
    case 'jQuery':
      src = currentTheme === 'dark' ? jQuery.src : jQueryAlt.src;
      break;
    case 'MySQL':
      src = MySQL.src;
      break;
    case 'NextJS':
      src = currentTheme === 'dark' ? NextJS.src : NextJSAlt.src;
      break;
    case 'Photoshop':
      src = Photoshop.src;
      break;
    case 'PHP':
      src = PHP.src;
      height = heightPercentage(63);
      break;
    case 'React':
      src = React.src;
      height = heightPercentage(90);
      break;
    case 'React Native':
      src = React.src;
      height = heightPercentage(90);
      break;
    case 'Sketch':
      src = Sketch.src;
      height = heightPercentage(93);
      break;
    case 'Symfony':
      src = currentTheme === 'dark' ? Symfony.src : SymfonyAlt.src;
      break;
    case 'WordPress':
      src = theme === 'dark' ? WordPress.src : WordPressAlt.src;
      height = heightPercentage(93);
      break;
    case 'SASS':
      src = theme === 'dark' ? SASS.src : SASSAlt.src;
      height = heightPercentage(95);
      break;
    case 'Formik':
      src = Formik.src;
      break;
    case 'Redux':
      src = Redux.src;
      break;
    case 'Tailwind':
      src = Tailwind.src;
      height = heightPercentage(70);
      break;
    case 'TypeScript':
      src = TypeScript.src;
      break;
    default:
      // eslint-disable-next-line consistent-return
      return;
  }

  // eslint-disable-next-line consistent-return
  return isMobile ? (
    <tr>
      <td className="text-right">
        <div style={{ height: `${height || heightPercentage(100)}px`, width }} className="relative">
          <Image
            src={src}
            alt={tooltip || stackIcon}
            className="inline"
            loader={loader}
            fill
            sizes="(max-width: 768px) 20vw, 10vw"
          />
        </div>
      </td>
      <td>
        <p className="m-0 text-left text-[#333333] dark:text-[#eeeeee]">{stackIcon}</p>
      </td>
    </tr>
  ) : (
    <Popover className="relative">
      <div
        key={`${project}-${stackName}`}
        style={{ height: `${height || heightPercentage(100)}px`, width }}
        className="relative mx-1"
      >
        <Image
          src={src}
          alt={tooltip || stackIcon}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          loader={loader}
          fill
          sizes="(max-width: 768px) 20vw, 10vw"
        />
      </div>

      <Transition
        as={Fragment}
        show={tooltipOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-[calc(-100%-10px)] transform whitespace-nowrap text-center">
          <div className="rounded-lg bg-white px-2 py-1 text-black shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black dark:text-white">
            {tooltip || stackIcon}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
