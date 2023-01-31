import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import SidebarHeaderControls from '@components/nearlock-app/SidebarHeaderControls';

const Sidebar = ({ isSidebarOpen, menuItems, activeTab, toggleTab, isSetupDone, isDarkMode }) => (
  <div
    className={classnames('sidebar h-full w-0 min-w-0 transition-all duration-500', {
      'w-[230px] min-w-[230px] border-r-[1.25px] border-black/[0.15]': isSidebarOpen,
      'border-r-0': !isSidebarOpen,
    })}
  >
    <SidebarHeaderControls isDarkMode={isDarkMode} />
    <div className="sidebar-content absolute left-[10px] flex h-full w-[210px] flex-col justify-between overflow-hidden pt-12 pb-2">
      <input
        // flex or hidden
        className="sidebar-search left-[10px] z-[3] mt-1 mb-2 hidden w-full flex-col justify-between overflow-hidden rounded-lg border-0 bg-black/[0.06] py-1.5 px-3 text-[13px] shadow-[0_0_0_1.5px_hsla(0,0%,0%,0.09)] outline-none placeholder:text-white/[0.25]"
        placeholder="Search..."
      />
      <Tab.List className="flex grow flex-col">
        {menuItems.map(({ id, title, disabled, showInMenu }) => (
          <Tab
            disabled={disabled}
            key={`sidebar__item-${id}`}
            className={classnames(
              {
                hidden: !showInMenu,
                active: activeTab === id,
                disabled,
              },
              'sidebar__item flex items-center focus:outline-0',
            )}
            onClick={() => {
              toggleTab(id);
            }}
          >
            <img
              src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
              height="17px"
              className="mr-2 ml-1"
              alt=""
            />
            {title}
          </Tab>
        ))}
      </Tab.List>
      <div>
        {isSetupDone && (
          <span
            style={{
              cursor: 'default !important', // ?
            }}
            className="sidebar__item flex items-center"
          >
            <img src="/nearlock-app/menu/iphone.svg" height="17px" className="mr-2 ml-1" alt="" />
            Ivan&apos;s iPhone <div className="sidebar__connected-dot ml-auto" />
          </span>
        )}
      </div>
    </div>
  </div>
);

export default Sidebar;
