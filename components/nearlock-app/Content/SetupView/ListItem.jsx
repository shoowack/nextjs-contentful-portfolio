import { useState } from 'react';
import classnames from 'classnames';

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
          'setup_list-item__icon flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl [transition:background_0.5s]',
          {
            checked: isChecked,
            'bg-[#EAEAEA]': !isDarkMode,
            'bg-white/[0.075]': isDarkMode,
          },
        )}
      >
        <img src={icon?.src} alt="" />
      </div>
      <div className="ml-3 flex grow flex-col justify-center">
        <div className="setup_list-item__title">{title}</div>
        {desc && (
          <div className="setup_list-item__desc">
            <small>{desc}</small>
          </div>
        )}
      </div>
      {extraInfo && (
        <div className="flex items-end">
          <small
            onClick={() => setActiveTab(11)}
            // onKeyDown={() => setActiveTab(11)}
            aria-hidden
            style={{ background: 'unset', padding: '5px', margin: '0 5px', color: '#007bff' }}
          >
            Read More
          </small>
        </div>
      )}
    </div>
  );
};

export default ListItem;
