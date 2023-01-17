import { useState } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function HeaderInfoLink({
  sys: { id },
  link,
  tooltipText,
  icon,
  openInNewTab = false,
  size = 'lg',
  tooltipPlacement = 'top',
  iconColor,
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  library.add(fab, fas);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <a
        key={id}
        href={link}
        target={openInNewTab ? '_blank' : ''}
        rel="noreferrer"
        id={`tooltip-${id}`}
      >
        <FontAwesomeIcon icon={icon.split(',')} size={size} color={iconColor} />
      </a>
      {tooltipText && (
        <Tooltip
          placement={tooltipPlacement}
          isOpen={tooltipOpen}
          target={`tooltip-${id}`}
          toggle={toggle}
          dangerouslySetInnerHTML={{ __html: tooltipText }}
        />
      )}
    </>
  );
}

HeaderInfoLink.propTypes = {
  link: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  order: PropTypes.number,
  icon: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
  size: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  color: PropTypes.string,
};
