import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import Modal from './modal';
import Content from './Content';
import Sidebar from './Sidebar';

function NearLockApp({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState('Welcome');
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
      id: 1,
      title: 'Advanced',
    },
    {
      id: 2,
      title: 'Clipboard',
      enabled: true,
    },
    {
      id: 3,
      title: 'Devices',
      enabled: true,
    },
    {
      id: 4,
      title: 'Music',
    },
    {
      id: 5,
      title: 'WiFi Unlock',
    },
    {
      id: 6,
      title: 'Help',
    },
    {
      id: 7,
      title: 'Setup',
      enabled: true,
    },
    {
      id: 8,
      title: 'Photos and History',
    },
    {
      id: 9,
      title: 'Updates',
    },
    {
      id: 10,
      title: 'Share',
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
  };

  return (
    <div
      className={classnames(
        {
          dark: isDarkMode,
        },
        'nearlock-app',
      )}
    >
      <Modal {...props} />
      <Sidebar {...props} toggleTab={toggleTab} menuItems={menuItems} />
      <Content {...props} searchRef={searchRef} />
    </div>
  );
}

export default NearLockApp;
