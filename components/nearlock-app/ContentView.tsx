import {
  Clipboard,
  ContentHeader,
  Devices,
  Notifications,
  Settings,
  Welcome,
} from '@components/nearlock-app/Content/';
import { Tab } from '@headlessui/react';
import { NearLockAppType } from '@interfaces/nearlock-app';
import classnames from 'classnames';
// import btOff from "./btOff.json";
// import wifiConnected from "./wifiConnected.json";

const Content: React.FC<NearLockAppType> = ({
  setIsModalOpen,
  setActiveTab,
  setIsSetupDone,
  toggleSidebar,
  toggleSearch,
  activeTab,
  isSidebarOpen,
  isSearchOpen,
  searchRef,
  isDarkMode,
  isSetupDone,
  menuItems,
  owner,
  device,
}) => (
  <div
    className={classnames('relative z-[1] h-full grow [transition:background_0.5s]', {
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

    <Tab.Panels className="tab-content h-full overflow-scroll pt-[52px]">
      {/* Welcome - ID: 0 */}
      <Welcome setIsModalOpen={setIsModalOpen} isDarkMode={isDarkMode} />
      {/* Advanced - ID: 1 */}
      <Tab.Panel />
      {/* Clipboard - ID: 2 */}
      <Clipboard
        isSidebarOpen={isSidebarOpen}
        isSetupDone={isSetupDone}
        isDarkMode={isDarkMode}
        setActiveTab={setActiveTab}
      />
      {/* Devices - ID: 3 */}
      <Devices
        isSetupDone={isSetupDone}
        isDarkMode={isDarkMode}
        owner={owner}
        setIsSetupDone={setIsSetupDone}
        setIsModalOpen={setIsModalOpen}
        device={device}
      />
      {/* Music - ID: 4 */}
      <Tab.Panel />
      {/* WiFi Unlock - ID: 5 */}
      <Tab.Panel />
      {/* Help - ID: 6 */}
      <Tab.Panel />
      {/* Settings - ID: 7 */}
      <Settings setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
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

export default Content;
