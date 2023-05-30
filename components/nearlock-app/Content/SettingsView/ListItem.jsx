import classnames from 'classnames';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

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
        <div className="absolute left-0 top-px z-[1] rounded-full bg-red-500 px-[7px] py-[2px] text-[9px] uppercase text-white">
          New
        </div>
      )}
      <div
        className={classnames(
          'flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl [transition:background_0.5s]',
          {
            'before:border--0 relative shadow-[0_0_0_3px_#368EFC_inset] before:absolute before:right-0 before:top-0 before:border-b-[30px] before:border-r-[30px] before:border-t-0 before:border-solid before:border-y-transparent before:border-l-transparent before:border-r-[#368EFC] before:content-[""]':
              isChecked,
            'bg-[#EAEAEA]': !isDarkMode,
            'bg-white/[0.075]': isDarkMode,
          },
        )}
      >
        <img src={icon?.src} alt="" />
        {isChecked && (
          <FaCheck
            className={classnames(
              'absolute right-[6px] top-[6px] h-2 w-2 [transition:color_0.5s]',
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
