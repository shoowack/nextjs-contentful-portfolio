import React, {useState, useRef} from "react";
import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";
import Modal from "./modal";
import Content from "./Content";
import Sidebar from "./Sidebar";

function NearLockApp({isDarkMode}) {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSetupDone, setIsSetupDone] = useState(false);
  const searchRef = useRef(null);

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setIsSearchOpen(false);
    }

    // if (tab === "Devices")
    //   setIsModalOpen(true);
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
        searchRef.current.value = "";
      }
    }, 1);
  };

  const content = [
    {
      title: "Advanced"
    }, {
      title: "Clipboard",
      enabled: true
    }, {
      title: "Devices",
      enabled: true
    }, {
      title: "Music"
    }, {
      title: "WiFi Unlock"
    }, {
      title: "Help"
    }, {
      title: "Setup",
      enabled: true
    }, {
      title: "Photos and History"
    }, {
      title: "Updates"
    }, {
      title: "Share"
    }
  ];

  return (<div className={classnames({
      [styles["dark-nearlock-app"]]: isDarkMode
    }, styles["nearlock-app"])}>
    <Modal isDarkMode={isDarkMode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab} setIsSetupDone={setIsSetupDone}/>
    <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} content={content} activeTab={activeTab} toggleTab={toggleTab} isSetupDone={isSetupDone}/>
    <Content isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} activeTab={activeTab} toggleSidebar={toggleSidebar} toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} searchRef={searchRef} setActiveTab={setActiveTab} setIsModalOpen={setIsModalOpen} isSetupDone={isSetupDone} setIsSetupDone={setIsSetupDone}/>
  </div>);
}

export default NearLockApp;