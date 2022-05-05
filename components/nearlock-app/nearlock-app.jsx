import React, {useState, useRef} from "react";
import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";
import Modal from "./../nearlock-app/modal";
import Content from "./Content";

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
    <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} content={content} activeTab={activeTab} toggleTab={toggleTab}/>
    <Content isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} activeTab={activeTab} toggleSidebar={toggleSidebar} toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} searchRef={searchRef} setActiveTab={setActiveTab} setIsModalOpen={setIsModalOpen} isSetupDone={isSetupDone} setIsSetupDone={setIsSetupDone}/>
  </div>);
}

const Sidebar = ({isDarkMode, isSidebarOpen, content, activeTab, toggleTab}) => (<div className={classnames({
    [styles["nearlock-app-sidebar-open"]]: isSidebarOpen
  }, styles["nearlock-app-sidebar"])}>
  <div className={styles["nearlock-app-sidebar-header-controls"]}>
    {Array.from({length: 3}).map((_, i) => (<div key={`nearlock-app-sidebar-header-controls__item-${i}`} className={styles["nearlock-app-sidebar-header-controls__item"]}/>))}
  </div>
  <div className={`${styles["nearlock-app-sidebar-content"]} mt-3`}>
    {/* <div className={`${styles["nearlock-app-sidebar-header"]} mb-3`}>
      <input className={`${styles["nearlock-app-sidebar-search"]} mt-3 w-100`} placeholder="Search"/>
    </div> */
    }
    {
      content.map(
        ({
        title,
        enabled
      }, i) => enabled
        ? (<a key={`nearlock-app-sidebar__item-${i}`} className={classnames({
            [styles["dark-nearlock-app-sidebar__item"]]: isDarkMode,
            [styles["nearlock-app-sidebar__item__active"]]: activeTab === title
          }, `d-flex align-items-center ${styles["nearlock-app-sidebar__item"]}`)} onClick={() => {
            toggleTab(title);
          }}>
          <img src={`/nearlock-app/menu/${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
          {title}
        </a>)
        : (<div key={`nearlock-app-sidebar__item-${i}`} className={classnames({
            [styles["dark-nearlock-app-sidebar__item__disabled"]]: isDarkMode
          }, `${styles["nearlock-app-sidebar__item__disabled"]} m-0 d-flex align-items-center`)}>
          <img src={`/nearlock-app/menu/${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
          {title}
        </div>))
    }
  </div>
</div>);

export default NearLockApp;
