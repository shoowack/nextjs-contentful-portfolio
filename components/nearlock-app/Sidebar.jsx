import classnames from 'classnames';

const Sidebar = ({ isSidebarOpen, menuItems, activeTab, toggleTab, isSetupDone }) => (
  <div
    className={classnames(
      {
        open: isSidebarOpen,
      },
      'sidebar',
    )}
  >
    <div className="sidebar-header-controls">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={`sidebar-header-controls__item-${i}`} className="sidebar-header-controls__item" />
      ))}
    </div>
    <div className="sidebar-content d-flex flex-column h-100 justify-content-between pt-5 pb-2">
      <div>
        {/* <div className="sidebar-header mb-3">
        <input className="sidebar-search mt-3 w-100" placeholder="Search"/>
      </div> */}
        {menuItems.map(({ title, enabled }, i) =>
          enabled ? (
            <a
              key={`sidebar__item-${i}`}
              className={classnames(
                {
                  active: activeTab === title,
                },
                'd-flex align-items-center sidebar__item',
              )}
              onClick={() => {
                toggleTab(title);
              }}
            >
              <img
                src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
                height="17px"
                className="mr-2 ml-1"
              />{' '}
              {title}
            </a>
          ) : (
            <div
              key={`sidebar__item-${i}`}
              className="sidebar__item disabled d-flex align-items-center m-0"
            >
              <img
                src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
                height="17px"
                className="mr-2 ml-1"
              />{' '}
              {title}
            </div>
          ),
        )}
      </div>
      <div>
        {isSetupDone && (
          <span
            style={{
              cursor: 'default !important', // ?
            }}
            className="d-flex align-items-center sidebar__item"
          >
            <img src="/nearlock-app/menu/iphone.svg" height="17px" className="mr-2 ml-1" />{' '}
            Ivan&apos;s iPhone <div className="sidebar__connected-dot ml-auto" />
          </span>
        )}
      </div>
    </div>
  </div>
);

export default Sidebar;
