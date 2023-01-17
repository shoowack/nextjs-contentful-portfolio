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
      title: 'Advanced',
    },
    {
      title: 'Clipboard',
      enabled: true,
    },
    {
      title: 'Devices',
      enabled: true,
    },
    {
      title: 'Music',
    },
    {
      title: 'WiFi Unlock',
    },
    {
      title: 'Help',
    },
    {
      title: 'Setup',
      enabled: true,
    },
    {
      title: 'Photos and History',
    },
    {
      title: 'Updates',
    },
    {
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
