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
              'sidebar__item flex items-center rounded-lg px-[8px] py-[7px] text-sm font-normal text-black [transition:color_0.5s] hover:bg-black/[0.09] focus:outline-0',
              {
                hidden: !showInMenu,
                'bg-black/[0.09]': activeTab === id,
                'opacity-50 hover:bg-transparent': disabled,
                'hover:cursor-pointer': !disabled,
              },
            )}
            onClick={() => {
              toggleTab(id);
            }}
          >
            <img
              src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
              className="mr-2 ml-1 h-[17px]"
              alt=""
            />
            {title}
          </Tab>
        ))}
      </Tab.List>
      {isSetupDone && (
        <div className="flex items-center px-[4px] py-[7px] text-sm font-normal text-black">
          <img src="/nearlock-app/menu/iphone.svg" className="mr-2 ml-1 h-[17px]" alt="" />
          Ivan&apos;s iPhone <div className="sidebar__connected-dot ml-auto mr-1 h-2 w-2 rounded" />
        </div>
      )}
    </div>
  </div>
);

export default Sidebar;
