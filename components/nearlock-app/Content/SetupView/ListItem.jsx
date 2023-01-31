import { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({
  icon,
  title,
  desc,
  checked,
  newBadge,
  extraInfo,
  setActiveTab,
  isDarkMode,
}) => {
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <div
      className={classnames(
        'relative mx-2 flex rounded-2xl p-2 [transition:all_0.25s] hover:cursor-pointer hover:[transition:all_0.25s]',
        {
          'hover:bg-black/[0.04]': !isDarkMode,
          'hover:bg-white/[0.04]': isDarkMode,
        },
      )}
      onClick={() => {
        setIsChecked((prev) => !prev);
      }}
      onKeyDown={() => {
        setIsChecked((prev) => !prev);
      }}
      aria-hidden
    >
      {newBadge && (
        <div className="absolute top-px left-0 z-[1] rounded-full bg-red-500 px-[7px] py-[2px] text-[9px] uppercase text-white">
          New
        </div>
      )}
      <div
        className={classnames(
          'flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl [transition:background_0.5s]',
          {
            'before:border--0 relative shadow-[0_0_0_3px_#368EFC_inset] before:absolute before:top-0 before:right-0 before:border-r-[30px] before:border-b-[30px] before:border-t-0 before:border-solid before:border-y-transparent before:border-r-[#368EFC] before:border-l-transparent before:content-[""]':
              isChecked,
            'bg-[#EAEAEA]': !isDarkMode,
            'bg-white/[0.075]': isDarkMode,
          },
        )}
      >
        <img src={icon?.src} alt="" />
        {isChecked && (
          <FontAwesomeIcon
            icon={faCheck}
            className={classnames(
              'absolute top-[6px] right-[2px] h-2 w-2 [transition:color_0.5s]',
              {
                'text-black': isDarkMode,
                'text-white': !isDarkMode,
              },
            )}
          />
        )}
      </div>
      <div className="ml-3 flex grow flex-col justify-center">
        {title}
        {desc && <small>{desc}</small>}
      </div>
      {extraInfo && (
        <div className="flex items-end">
          <small
            onClick={() => setActiveTab(11)}
            aria-hidden
            className="mx-[5px] p-[5px] text-[#007bff]"
          >
            Read More
          </small>
        </div>
      )}
    </div>
  );
};

export default ListItem;
