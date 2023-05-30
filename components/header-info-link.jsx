import { Popover, Transition } from '@headlessui/react';
import classnames from 'classnames';
import { useTheme } from 'next-themes';
import { Fragment, createElement, useState } from 'react';
import * as RI from 'react-icons/ri';
import sanitizeHtml from 'sanitize-html';

const HeaderInfoLink = ({
  link,
  tooltipText,
  openInNewTab = false,
  className,
  icon,
  size,
  i,
  linksLength,
  iconColor,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Popover className="relative">
      <a
        href={link}
        target={openInNewTab ? '_blank' : ''}
        rel="noreferrer"
        className={classnames(
          'group inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
          className,
        )}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        {createElement(RI[`${icon}`], {
          style: { animationDelay: `${(i + 2) * 100}ms` },
          className: 'absolute animate-preload opacity-0',
          color: iconColor || (currentTheme === 'dark' ? '#fff' : '000'),
          size,
        })}
      </a>

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
        <Popover.Panel
          className={classnames(
            'absolute bottom-2 translate-y-[calc(100%+10px)] transform whitespace-nowrap bg-white text-center dark:bg-black',
            linksLength === i + 1 ? 'right-0' : 'left-1/2 -translate-x-1/2',
          )}
        >
          <div
            className="rounded-lg  px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 "
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(tooltipText) }}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default HeaderInfoLink;
