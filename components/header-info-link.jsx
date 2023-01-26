import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Popover, Transition } from '@headlessui/react';

const HeaderInfoLink = ({
  sys: { id },
  link,
  tooltipText,
  icon,
  openInNewTab = false,
  size = 'lg',
  iconColor,
  animationDelay,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  library.add(fab, fas);

  return (
    <Popover className="relative">
      <a
        key={id}
        href={link}
        target={openInNewTab ? '_blank' : ''}
        rel="noreferrer"
        id={`tooltip-${id}`}
        className="group  inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        <FontAwesomeIcon
          className={`absolute top-0 animate-preload opacity-0 ${animationDelay}`}
          icon={icon.split(',')}
          size={size}
          color={iconColor}
        />
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
          className="absolute left-1/2 top-0 transform whitespace-nowrap text-center"
          style={{ transform: 'translateY(calc(-100% - 10px)) translateX(-50%)' }}
        >
          <div
            className="rounded-lg  px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 "
            dangerouslySetInnerHTML={{ __html: tooltipText }}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

HeaderInfoLink.propTypes = {
  link: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  icon: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool,
  size: PropTypes.string,
  iconColor: PropTypes.string,
};

HeaderInfoLink.defaultProps = {
  tooltipText: '',
  openInNewTab: false,
  size: 'lg',
  iconColor: '#000',
};

export default HeaderInfoLink;
