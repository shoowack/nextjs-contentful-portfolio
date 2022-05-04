import React, {useState, useRef} from "react";
import {TabContent, TabPane, Row, Col} from "reactstrap";
import classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import btConnect from "./btConnect.json";
// import btOff from "./btOff.json";
// import wifiConnected from "./wifiConnected.json";
import styles from "./../../styles/nearlock-app.module.scss";

function NearLockApp({isDarkMode}) {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setIsSearchOpen(false);
    }

    if (tab === "Devices") 
      setIsModalOpen(true);
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

  return (<div className={`${isDarkMode
      ? styles["dark-nearlock-app"]
      : ""} ${
    styles["nearlock-app"]}`}>
    <Modal isDarkMode={isDarkMode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} content={content} activeTab={activeTab} toggleTab={toggleTab}/>
    <Content isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} activeTab={activeTab} toggleSidebar={toggleSidebar} toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} searchRef={searchRef} setActiveTab={setActiveTab}/>
  </div>);
}

const Modal = ({isModalOpen, setIsModalOpen}) => (<div className={classnames({
    "d-none": !isModalOpen
  }, styles["nearlock-app-modal__background"])}>
  <div className={styles["nearlock-app-modal"]}>
    <div className={`${
      styles["nearlock-app-modal__content"]} d-flex flex-column p-5 text-center`}>
      <FontAwesomeIcon icon={faPaperPlane} size="10x" className="mb-3 mx-5" color="#368EFC"/>
      Filip’s iPhone X<br/>
      wants to connect
    </div>
    <div className={`${styles["nearlock-app-modal__footer"]} d-flex`}>
      <div className={`${styles["nearlock-app__btn-link"]} flex-fill`}>
        Setup later
      </div>
      <div>
        <button className={styles["nearlock-app__btn"]} onClick={() => setIsModalOpen(false)}>
          Continue
        </button>
      </div>
    </div>
  </div>
</div>);

const Sidebar = ({isDarkMode, isSidebarOpen, content, activeTab, toggleTab}) => (<div className={`${isDarkMode
    ? styles["dark-nearlock-app-sidebar"]
    : ""} ${
  isSidebarOpen
    ? styles["nearlock-app-sidebar-open"]
    : styles["nearlock-app-sidebar"]}`}>
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
        ? (<a key={`nearlock-app-sidebar__item-${i}`} className={`d-flex align-items-center ${
          isDarkMode
            ? styles["dark-nearlock-app-sidebar__item"]
            : ""} ${
          activeTab === title
            ? styles["nearlock-app-sidebar__item__active"]
            : styles["nearlock-app-sidebar__item"]}`} onClick={() => {
            toggleTab(title);
          }}>
          <img src={`/nearlock-menu_${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
          {title}
        </a>)
        : (<div key={`nearlock-app-sidebar__item-${i}`} className={`${
          isDarkMode
            ? styles["dark-nearlock-app-sidebar__item__disabled"]
            : ""} ${
          styles["nearlock-app-sidebar__item__disabled"]} m-0 d-flex align-items-center`}>
          <img src={`/nearlock-menu_${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
          {title}
        </div>))
    }
  </div>
</div>);

const Content = ({
  activeTab,
  isSidebarOpen,
  toggleSidebar,
  isSearchOpen,
  toggleSearch,
  searchRef,
  setActiveTab,
  isDarkMode
}) => (<div className={`${isDarkMode
    ? styles["dark-nearlock-app-content"]
    : ""} ${
  styles["nearlock-app-content"]}`}>
  <div className={`${
    isDarkMode
      ? styles["dark-nearlock-app-content-header"]
      : ""} ${
    isSidebarOpen
      ? styles["nearlock-app-content-header"]
      : styles["nearlock-app-content-header-open"]}`}>
    <div className={styles["nearlock-app-content-header__left-items"]} onClick={toggleSidebar}>
      <img src="/sidebar.svg" height="17px"/>
    </div>
    <div className={styles["nearlock-app-content-header__title"]}>
      {activeTab}
    </div>
    <div className={styles["nearlock-app-content-header__right-items"]}>
      <input className={isSearchOpen
          ? styles["nearlock-app-content-header__search-open"]
          : styles["nearlock-app-content-header__search"]} placeholder="Search" ref={searchRef}/>
      <img src="/search-close.svg" height="13px" className={isSearchOpen
          ? styles["nearlock-app-content-header__search-close-icon-open"]
          : "d-none"
} onClick={toggleSearch}/>

      <div className={isSearchOpen
          ? styles["nearlock-app-content-header__right-items_search_icon-open"]
          : styles["nearlock-app-content-header__right-items_search_icon"]} onClick={toggleSearch}>
        <img src="/search.svg" height="17px"/>
      </div>
    </div>
  </div>
  <TabContent activeTab={activeTab} className={styles["tab-content"]}>
    <TabPane tabId="Welcome">
      <Col sm="12" className={"text-center mt-5"}>
        <Col md={{
            size: 10,
            offset: 1
          }}>
          <img src="/nearlock-logo.svg" height="225px" className="pt-4 m-5"/>
          <h5 className="m-0">Welcome</h5>
          <small>
            Near Lock lets you use your iPhone to lock and unlock your Mac automatically. When you walk away from your Mac, it will be automatically locked. Once you approach your workplace, Near Lock will unlock your Mac.
          </small>
          <button className={`${styles["nearlock-app__btn"]} mt-4`} onClick={() => setActiveTab("Setup")}>
            Setup Near Lock
          </button>
        </Col>
      </Col>
    </TabPane>
    <TabPane tabId="Advanced">
      <Col sm="12">
        <h4>Advanced</h4>
      </Col>
    </TabPane>
    <TabPane tabId="Setup" style={{
        position: "relative"
      }}>
      <div className={styles["setup-bt-wrapper"]}>
        <Lottie animationData={btConnect} loop={true} autoplay={true}/>
        <Col className={styles["setup-bt-text"]} md={{
            size: 10,
            offset: 1
          }}>
          <h5 className="m-0">
            Please turn on Bluetooth and get the iOS app
          </h5>
          <small>
            To use Near Lock make sure your Mac has Bluetooth turned on and your iOS app is open on your iPhone
          </small>
          <button className={`${styles["nearlock-app__btn"]} mt-4`}>
            Turn Bluetooth On
          </button>
        </Col>
      </div>
    </TabPane>
  </TabContent>
</div>);
export default NearLockApp;
