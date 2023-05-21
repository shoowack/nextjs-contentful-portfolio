import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import SidebarHeaderControls from '@components/nearlock-app/SidebarHeaderControls';

const Sidebar = ({
  isSidebarOpen,
  menuItems,
  activeTab,
  toggleTab,
  isSetupDone,
  isDarkMode,
  owner,
}) => (
  <div
    className={classnames(
      'sidebar h-full w-0 min-w-0 transition-all duration-500',
      isSidebarOpen
        ? 'w-[230px] min-w-[230px] border-r-[1.25px] border-black/[0.15]'
        : 'border-r-0 border-transparent',
    )}
  >
    {/* positioning classes are defined here because the component is used elsewhere */}
    <SidebarHeaderControls isDarkMode={isDarkMode} className="absolute top-5 left-5 z-[2]" />
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
              'flex items-center rounded-lg px-[8px] py-[7px] text-sm font-normal [transition:color_0.5s] hover:bg-black/[0.09] focus:outline-0',
              {
                hidden: !showInMenu,
                'bg-black/[0.09]': activeTab === id,
                'opacity-50 hover:bg-transparent': disabled,
                'hover:cursor-pointer': !disabled,
                'text-white': isDarkMode,
                'text-black': !isDarkMode,
              },
            )}
            onClick={() => {
              toggleTab(id);
            }}
          >
            {
              // this condition is needed so that it doesn't try to load images that are not even shown
              showInMenu && (
                <img
                  src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
                  className="mr-2 ml-1 h-[17px]"
                  alt=""
                />
              )
            }
            {title}
          </Tab>
        ))}
      </Tab.List>
      {isSetupDone && (
        <div
          className={classnames(
            'flex items-center px-[8px] py-[7px] text-sm font-normal [transition:color_0.5s]',
            {
              'text-white': isDarkMode,
              'text-black': !isDarkMode,
            },
          )}
        >
          <img src="/nearlock-app/menu/iphone.svg" className="mr-2 ml-1 h-[17px]" alt="" />
          {owner}&apos;s iPhone
          <div className="ml-auto mr-1 h-2 w-2 rounded bg-gradient-to-b from-[#2dff1a] to-[#13e600] shadow-[0_0_0_1px_hsla(0,0%,0%,0.1),0_0_0_2px_hsla(0,0%,0%,0.05),0_0_10px_0px_hsla(121,100%,59%,0.75)]" />
        </div>
      )}
    </div>
  </div>
);

export default Sidebar;
