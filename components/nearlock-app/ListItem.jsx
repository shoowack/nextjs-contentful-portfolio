import { useState } from 'react';
import classNames from 'classnames';

const ListItem = ({ icon, title, desc, checked, newBadge, extraInfo, setActiveTab }) => {
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <div
      className="setup_list-item mx-2 flex p-2"
      onClick={() => {
        setIsChecked((prev) => !prev);
      }}
      onKeyDown={() => {
        setIsChecked((prev) => !prev);
      }}
      aria-hidden
    >
      {newBadge && <div className="setup_list-item__icon_new-badge">New</div>}
      <div
        className={classNames(
          {
            checked: isChecked,
          },
          'setup_list-item__icon flex justify-center items-center',
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
