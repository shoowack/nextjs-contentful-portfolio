import ContentView from '@components/nearlock-app/ContentView';
import Modal from '@components/nearlock-app/Modal/ModalWindow';
import Sidebar from '@components/nearlock-app/Sidebar';
import { Tab } from '@headlessui/react';
import classnames from 'classnames';
import { useRef, useState } from 'react';

function NearLockApp({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSetupDone, setIsSetupDone] = useState(false);
  const searchRef = useRef(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setIsSearchOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setTimeout(() => {
      searchRef.current.focus();

      if (!isSearchOpen) {
        searchRef.current.value = '';
      }
    }, 1);
  };

  const owner = 'Ivan';
  const device = 'iPhone 14 Pro';

  const menuItems = [
    {
      id: 0,
      title: 'Welcome',
      showInMenu: false,
    },
    {
      id: 1,
      title: 'Advanced',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 2,
      title: 'Clipboard',
      showInMenu: true,
    },
    {
      id: 3,
      title: 'Devices',
      showInMenu: true,
    },
    {
      id: 4,
      title: 'Music',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 5,
      title: 'WiFi Unlock',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 6,
      title: 'Help',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 7,
      title: 'Settings',
      showInMenu: true,
    },
    {
      id: 8,
      title: 'Photos and History',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 9,
      title: 'Updates',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 10,
      title: 'Share',
      showInMenu: true,
      disabled: true,
    },
    {
      id: 11,
      title: 'Notifications',
      showInMenu: false,
      // disabled: true,
    },
  ];

  const props = {
    isDarkMode,
    isSidebarOpen,
    setIsSidebarOpen,
    isSearchOpen,
    setIsSearchOpen,
    isSetupDone,
    setIsSetupDone,
    toggleSidebar,
    toggleSearch,
    activeTab,
    setActiveTab,
    isModalOpen,
    setIsModalOpen,
    menuItems,
    owner,
    device,
  };

  return (
    <div
      className={classnames(
        'nearlock-app relative mx-auto flex h-[626px] w-[1082px] flex-row overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_60px_300px_rgba(0,0,0,0.4),0_0_2px_0_hsla(0,0%,100%,0.15)_inset] backdrop-blur-[50px] [transition:background_0.5s,color_0.5s]',
        {
          dark: isDarkMode,
          'bg-[#252b31]/[0.8] text-[#A9A9A9]': isDarkMode,
          'bg-[#f5f5f5]/[0.65] text-[#535353]': !isDarkMode,
        },
      )}
    >
      <Modal {...props} />
      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab} vertical>
        <Sidebar {...props} toggleTab={toggleTab} />
        <ContentView {...props} searchRef={searchRef} />
      </Tab.Group>
    </div>
  );
}

export default NearLockApp;
