import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import {
  ContentHeader,
  Welcome,
  Devices,
  Clipboard,
  Setup,
  Notifications,
} from '@components/nearlock-app/Content/';
// import btOff from "./btOff.json";
// import wifiConnected from "./wifiConnected.json";

const Content = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  toggleSidebar,
  isSearchOpen,
  toggleSearch,
  searchRef,
  isDarkMode,
  setIsModalOpen,
  isSetupDone,
  setIsSetupDone,
  menuItems,
  owner,
}) => {
  return (
    <div
      className={classnames('content relative z-[1] h-full grow [transition:background_0.5s]', {
        'bg-[#211C21]': isDarkMode,
        'bg-white': !isDarkMode,
      })}
    >
      <ContentHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        searchRef={searchRef}
        menuItems={menuItems}
        isDarkMode={isDarkMode}
        activeTab={activeTab}
      />

      <Tab.Panels
        className="tab-content h-full overflow-scroll pt-[52px]"
        selectedIndex={activeTab}
      >
        {/* Welcome - ID: 0 */}
        <Welcome setIsModalOpen={setIsModalOpen} isDarkMode={isDarkMode} />
        {/* Advanced - ID: 1 */}
        <Tab.Panel />
        {/* Clipboard - ID: 2 */}
        <Clipboard isSetupDone={isSetupDone} isDarkMode={isDarkMode} setActiveTab={setActiveTab} />
        {/* Devices - ID: 3 */}
        <Devices
          isSetupDone={isSetupDone}
          isDarkMode={isDarkMode}
          owner={owner}
          setIsSetupDone={setIsSetupDone}
          setIsModalOpen={setIsModalOpen}
        />
        {/* Music - ID: 4 */}
        <Tab.Panel />
        {/* WiFi Unlock - ID: 5 */}
        <Tab.Panel />
        {/* Help - ID: 6 */}
        <Tab.Panel />
        {/* Setup - ID: 7 */}
        <Setup setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
        {/* Photos and History - ID: 8 */}
        <Tab.Panel />
        {/* Updates - ID: 9 */}
        <Tab.Panel />
        {/* Share - ID: 10 */}
        <Tab.Panel />
        {/* Notifications - ID: 11 */}
        <Notifications isDarkMode={isDarkMode} />
      </Tab.Panels>
    </div>
  );
};

export default Content;
