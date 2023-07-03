import SidebarHeaderControls from '@components/nearlock-app/SidebarHeaderControls';
import { Tab } from '@headlessui/react';
import { NearLockAppType } from '@interfaces/nearlock-app';
import classnames from 'classnames';

type Props = Pick<
  NearLockAppType,
  'isSidebarOpen' | 'menuItems' | 'activeTab' | 'toggleTab' | 'isSetupDone' | 'isDarkMode' | 'owner'
>;

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  menuItems,
  activeTab,
  toggleTab,
  isSetupDone,
  isDarkMode,
  owner,
}) => (
  <div
    // eslint-disable-next-line tailwindcss/no-custom-classname
    className={classnames(
      'sidebar h-full w-0 min-w-0 transition-all duration-500',
      isSidebarOpen
        ? 'w-[230px] min-w-[230px] border-r-[1.25px] border-black/[0.15]'
        : 'border-r-0 border-transparent',
    )}
  >
    {/* positioning classes are defined here because the component is used elsewhere */}
    <SidebarHeaderControls isDarkMode={isDarkMode} className="absolute left-5 top-5 z-[2]" />
    {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
    <div className="sidebar-content absolute left-[10px] flex h-full w-[210px] flex-col justify-between overflow-hidden pb-2 pt-12">
      <input
        // flex or hidden
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="sidebar-search left-[10px] z-[3] mb-2 mt-1 hidden w-full flex-col justify-between overflow-hidden rounded-lg border-0 bg-black/[0.06] px-3 py-1.5 text-[13px] shadow-[0_0_0_1.5px_hsla(0,0%,0%,0.09)] outline-none placeholder:text-white/[0.25]"
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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/nearlock-app/menu/${title.toLowerCase().split(' ').join('-')}.svg`}
                  className="ml-1 mr-2 h-[17px]"
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nearlock-app/menu/iphone.svg" className="ml-1 mr-2 h-[17px]" alt="" />
          {owner}&apos;s iPhone
          <div className="ml-auto mr-1 h-2 w-2 rounded bg-gradient-to-b from-[#2dff1a] to-[#13e600] shadow-[0_0_0_1px_hsla(0,0%,0%,0.1),0_0_0_2px_hsla(0,0%,0%,0.05),0_0_10px_0px_hsla(121,100%,59%,0.75)]" />
        </div>
      )}
    </div>
  </div>
);

export default Sidebar;
