import classnames from 'classnames';
import { Tab } from '@headlessui/react';

const Sidebar = ({ isSidebarOpen, menuItems, activeTab, toggleTab, isSetupDone }) => (
  <div
    className={classnames('sidebar h-full w-0 min-w-0 transition-all duration-500', {
      'w-[230px] min-w-[230px] border-r-[1.25px] border-black/[0.15]': isSidebarOpen,
      'border-r-0': !isSidebarOpen,
    })}
  >
    <div className="sidebar-header-controls hover:group-[.is-published]:bg-yellow-500 absolute top-5 left-5 z-[2] flex flex-row gap-2.5">
      {Array.from({ length: 3 }, (_, i) => ({ id: i })).map((arr) => (
        <div
          key={`sidebar-header-controls__item-${arr.id}`}
          className="group is-published sidebar-header-controls__item

          relative

          h-3 w-3
          rounded-full

          before:absolute
          before:opacity-0
          before:content-['']

          after:absolute
          after:opacity-0
          after:content-['']

          [&:nth-child(1)]:bg-[#FF6157]
          [&:nth-child(1)]:ring-1
          [&:nth-child(1)]:ring-[#E24640]
          [&:nth-child(1)]:before:top-[5px]
          [&:nth-child(1)]:before:left-[2px]
          [&:nth-child(1)]:before:h-0.5
          [&:nth-child(1)]:before:w-2
          [&:nth-child(1)]:before:rotate-45
          [&:nth-child(1)]:before:rounded-full
          [&:nth-child(1)]:before:bg-black/[0.4]
          [&:nth-child(1)]:after:top-[5px]
          [&:nth-child(1)]:after:left-[2px]
          [&:nth-child(1)]:after:h-0.5
          [&:nth-child(1)]:after:w-2
          [&:nth-child(1)]:after:-rotate-45
          [&:nth-child(1)]:after:rounded-full
          [&:nth-child(1)]:after:bg-black/[0.4]

          [&:nth-child(2)]:bg-[#FFC12F]
          [&:nth-child(2)]:ring-1
          [&:nth-child(2)]:ring-[#DFA023]
          [&:nth-child(2)]:before:top-[5px]
          [&:nth-child(2)]:before:left-[2px]
          [&:nth-child(2)]:before:h-0.5
          [&:nth-child(2)]:before:w-2
          [&:nth-child(2)]:before:rounded-full
          [&:nth-child(2)]:before:bg-black/[0.4]

          [&:nth-child(3)]:bg-[#2ACB42]
          [&:nth-child(3)]:ring-1
          [&:nth-child(3)]:ring-[#1BAC2C]


          "
        />
      ))}
    </div>
    <div className="sidebar-content absolute left-[10px] flex h-full w-[210px] flex-col justify-between overflow-hidden pt-12 pb-2">
      <Tab.List className="flex flex-col">
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
