import { useState } from 'react';
import classNames from 'classnames';

const ListItem = ({ icon, title, desc, checked, newBadge, extraInfo, setActiveTab }) => {
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <div
      className="d-flex mx-2 list-item p-2"
      onClick={() => {
        setIsChecked((prev) => !prev);
      }}
      onKeyDown={() => {
        setIsChecked((prev) => !prev);
      }}
      aria-hidden
    >
      {newBadge && <div className="list-item__icon_new-badge">New</div>}
      <div
        className={classNames(
          {
            checked: isChecked,
          },
          'list-item__icon d-flex justify-content-center align-items-center',
        )}
      >
        <img src={icon?.src} alt="" />
      </div>
      <div className="d-flex flex-column justify-content-center flex-grow-1 ml-3">
        <div className="list-item__title">{title}</div>
        {desc && (
          <div className="list-item__desc">
            <small>{desc}</small>
          </div>
        )}
      </div>
      {extraInfo && (
        <div className="d-flex align-items-end">
          <small
            onClick={() => setActiveTab(extraInfo)}
            onKeyDown={() => setActiveTab(extraInfo)}
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
