import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import classnames from 'classnames';

import {
  ACF,
  Firebase,
  Formik,
  Contentful,
  ContentfulAlt,
  Bootstrap,
  GraphQL,
  jQuery,
  jQueryAlt,
  NextJS,
  NextJSAlt,
  React,
  Redux,
  Sketch,
  Symfony,
  SymfonyAlt,
  WordPress,
  WordPressAlt,
  PHP,
  Photoshop,
  MySQL,
  Illustrator,
  SASS,
  SASSAlt,
  Tailwind,
} from '@lib/stackLogos';

export default function StackIcon({ stackIcon, contrast, section, isMobile }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  let src;
  let height;
  let tooltip;
  const iconHeight = 30;
  const heightPercentage = (percentage) => (iconHeight * percentage) / 100;
  const project = section.replace(/\./g, '-').replace(/ /g, '-').toLowerCase();
  const stackName = stackIcon.replace(/ /g, '-').toLowerCase();

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
      src = contrast ? Contentful.src : ContentfulAlt.src;
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
      src = contrast ? jQuery.src : jQueryAlt.src;
      break;
    case 'MySQL':
      src = MySQL.src;
      break;
    case 'NextJS':
      src = contrast ? NextJS.src : NextJSAlt.src;
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
    case 'Sketch':
      src = Sketch.src;
      height = heightPercentage(93);
      break;
    case 'Symfony':
      src = contrast ? Symfony.src : SymfonyAlt.src;
      break;
    case 'WordPress':
      src = contrast ? WordPress.src : WordPressAlt.src;
      height = heightPercentage(93);
      break;
    case 'SASS':
      src = contrast ? SASS.src : SASSAlt.src;
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
    default:
      return;
  }

  // eslint-disable-next-line consistent-return
  return isMobile ? (
    <tr>
      <td width="50%" className="text-right">
        <img
          src={src}
          style={{ height: `${height || heightPercentage(100)}px` }}
          alt={tooltip || stackIcon}
          className="inline"
        />
      </td>
      <td width="50%">
        <p className="m-0 text-left">{stackIcon}</p>
      </td>
    </tr>
  ) : (
    <Popover className="relative">
      <div key={`${project}-${stackName}`}>
        <img
          src={src}
          style={{ height: `${height || heightPercentage(100)}px` }}
          alt={tooltip || stackIcon}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          className="mx-2"
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
        <Popover.Panel className="absolute left-1/2 top-0 translate-y-[calc(-100%-10px)] -translate-x-1/2 transform whitespace-nowrap text-center">
          <div
            className={classnames(
              `rounded-lg px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5`,
              contrast ? 'bg-black text-white' : 'bg-white text-black',
            )}
          >
            {tooltip || stackIcon}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
