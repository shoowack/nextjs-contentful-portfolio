import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { Tab } from '@headlessui/react';
import Modal from './modal';
import Content from './Content';
import Sidebar from './Sidebar';

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
      title: 'Setup',
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
  };

  return (
    <div
      className={classnames(
        {
          dark: isDarkMode,
        },
        'nearlock-app relative mx-auto flex h-[626px] w-[1082px] flex-row overflow-hidden rounded-xl text-[#535353] backdrop-blur-[50px]',
      )}
    >
      <Modal {...props} />
      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab} vertical>
        <Sidebar {...props} toggleTab={toggleTab} />
        <Content {...props} searchRef={searchRef} />
      </Tab.Group>
    </div>
  );
}

export default NearLockApp;
