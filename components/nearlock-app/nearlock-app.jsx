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
      title: "Clipboard"
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
    <Modal isDarkMode={isDarkMode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} content={content} activeTab={activeTab} toggleTab={toggleTab}/>
    <Content isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} activeTab={activeTab} toggleSidebar={toggleSidebar} toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} searchRef={searchRef} setActiveTab={setActiveTab}/>
  </div>);
}

const AppButton = ({children, onClick, isDarkMode}) => (<button className={classnames({
    [styles["dark-nearlock-app__btn"]]: isDarkMode
  }, `${styles["nearlock-app__btn"]} mt-4`)} onClick={onClick}>
  {children}
</button>);

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
      <svg width="22px" height="17px" viewBox="0 0 41 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g transform="translate(-672.000000, -35.000000)" fill={isDarkMode
            ? "#BAB5BA"
            : "#666666"} fillRule="nonzero">
          <g transform="translate(96.000000, 0.000000)">
            <g transform="translate(464.000000, 0.000000)">
              <g transform="translate(112.295166, 35.212582)">
                <path d="M13.1784515,28.7645798 L16.1088219,28.7645798 L16.1088219,2.50681305 L13.1784515,2.50681305 L13.1784515,28.7645798 Z M9.89859772,9.26395798 C10.1746572,9.26395798 10.4184138,9.15906652 10.6298676,8.9492836 C10.8413213,8.73950068 10.9470482,8.50484085 10.9470482,8.24530411 C10.9470482,7.96330388 10.8413213,7.72247124 10.6298676,7.52280617 C10.4184138,7.3231411 10.1746572,7.22330856 9.89859772,7.22330856 L6.37034607,7.22330856 C6.09447225,7.22330856 5.85076205,7.3231411 5.63921547,7.52280617 C5.42766889,7.72247124 5.3218956,7.96330388 5.3218956,8.24530411 C5.3218956,8.50484085 5.42766889,8.73950068 5.63921547,8.9492836 C5.85076205,9.15906652 6.09447225,9.26395798 6.37034607,9.26395798 L9.89859772,9.26395798 Z M9.89859772,13.7198029 C10.1746572,13.7198029 10.4184138,13.6176033 10.6298676,13.4132042 C10.8413213,13.2088051 10.9470482,12.9661624 10.9470482,12.685276 C10.9470482,12.4149717 10.8413213,12.1803118 10.6298676,11.9812965 C10.4184138,11.7822812 10.1746572,11.6827736 9.89859772,11.6827736 L6.37034607,11.6827736 C6.09447225,11.6827736 5.85076205,11.7822812 5.63921547,11.9812965 C5.42766889,12.1803118 5.3218956,12.4149717 5.3218956,12.685276 C5.3218956,12.9661624 5.42766889,13.2088051 5.63921547,13.4132042 C5.85076205,13.6176033 6.09447225,13.7198029 6.37034607,13.7198029 L9.89859772,13.7198029 Z M9.89859772,18.1614456 C10.1746572,18.1614456 10.4184138,18.0616131 10.6298676,17.861948 C10.8413213,17.6622829 10.9470482,17.4273911 10.9470482,17.1572723 C10.9470482,16.876386 10.8413213,16.6363888 10.6298676,16.4372807 C10.4184138,16.2381725 10.1746572,16.1386185 9.89859772,16.1386185 L6.37034607,16.1386185 C6.09447225,16.1386185 5.85076205,16.2381725 5.63921547,16.4372807 C5.42766889,16.6363888 5.3218956,16.876386 5.3218956,17.1572723 C5.3218956,17.4273911 5.42766889,17.6622829 5.63921547,17.861948 C5.85076205,18.0616131 6.09447225,18.1614456 6.37034607,18.1614456 L9.89859772,18.1614456 Z M5.43439865,31.2830887 L34.4303894,31.2830887 C36.2339656,31.2830887 37.5905927,30.8309879 38.5002708,29.9267864 C39.409949,29.0225849 39.8647881,27.6847547 39.8647881,25.9132957 L39.8647881,5.3681221 C39.8647881,3.59666316 39.409949,2.2591114 38.5002708,1.35546684 C37.5905927,0.451822281 36.2339656,0 34.4303894,0 L5.43439865,0 C3.64140447,0 2.28742282,0.449130376 1.37245369,1.34739113 C0.457484563,2.24565188 0,3.58589554 0,5.3681221 L0,25.9132957 C0,27.6953367 0.457484563,29.0358124 1.37245369,29.9347229 C2.28742282,30.8336334 3.64140447,31.2830887 5.43439865,31.2830887 Z M5.56277466,28.2248993 C4.76448568,28.2248993 4.14989599,28.0133063 3.71900558,27.5901203 C3.28811518,27.1669343 3.07266998,26.532341 3.07266998,25.6863403 L3.07266998,5.59507751 C3.07266998,4.74907684 3.28811518,4.11448352 3.71900558,3.69129753 C4.14989599,3.26811155 4.76448568,3.05651855 5.56277466,3.05651855 L34.3000641,3.05651855 C35.0996526,3.05651855 35.7172591,3.26811155 36.1528835,3.69129753 C36.588508,4.11448352 36.8063202,4.74907684 36.8063202,5.59507751 L36.8063202,25.6863403 C36.8063202,26.532341 36.588508,27.1669343 36.1528835,27.5901203 C35.7172591,28.0133063 35.0996526,28.2248993 34.3000641,28.2248993 L5.56277466,28.2248993 Z"/>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div className={styles["nearlock-app-content-header__title"]}>
      {activeTab}
    </div>
    <div className={styles["nearlock-app-content-header__right-items"]}>
      <input className={classnames({
          [styles["dark-nearlock-app-content-header__search"]]: isDarkMode,
          [styles["nearlock-app-content-header__search-open"]]: isSearchOpen,
          [styles["dark-nearlock-app-content-header__search-open"]]: isDarkMode && isSearchOpen
        }, styles["nearlock-app-content-header__search"])} placeholder="Search" ref={searchRef}/>
      <img src="/search-close.svg" height="13px" className={isSearchOpen
          ? styles["nearlock-app-content-header__search-close-icon-open"]
          : "d-none"
} onClick={toggleSearch}/>

      <div className={isSearchOpen
          ? styles["nearlock-app-content-header__right-items_search_icon-open"]
          : styles["nearlock-app-content-header__right-items_search_icon"]} onClick={toggleSearch}>
        <svg width="17px" height="17px" viewBox="0 0 31 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g transform="translate(-2191.000000, -35.000000)" fill={isDarkMode
              ? "#BAB5BA"
              : "#666666"} fillRule="nonzero">
            <g transform="translate(96.000000, 0.000000)">
              <g transform="translate(464.000000, 0.000000)">
                <g transform="translate(139.000000, 2.000000)">
                  <g transform="translate(1492.084573, 33.441455)">
                    <path d="M12.6513428,22.2395508 C13.9631429,22.2395508 15.1984497,21.9906901 16.3572632,21.4929687 C17.5160767,20.9952474 18.5347493,20.3045695 19.4132812,19.4209351 C20.2918132,18.5373006 20.9799398,17.5186727 21.4776611,16.3650513 C21.9753825,15.2114299 22.2242432,13.9792562 22.2242432,12.6685303 C22.2242432,11.3565511 21.9753825,10.1214233 21.4776611,8.96314697 C20.9799398,7.80487061 20.2918132,6.78651123 19.4132812,5.90806885 C18.5347493,5.02962646 17.5160767,4.33894857 16.3572632,3.83603516 C15.1984497,3.33312174 13.9631429,3.08166504 12.6513428,3.08166504 C11.3406169,3.08166504 10.1058024,3.33312174 8.94689941,3.83603516 C7.78799642,4.33894857 6.76932373,5.02962646 5.89088135,5.90806885 C5.01243896,6.78651123 4.3243571,7.80487061 3.82663574,8.96314697 C3.32891439,10.1214233 3.08005371,11.3565511 3.08005371,12.6685303 C3.08005371,13.9792562 3.32891439,15.2114299 3.82663574,16.3650513 C4.3243571,17.5186727 5.01243896,18.5373006 5.89088135,19.4209351 C6.76932373,20.3045695 7.78799642,20.9952474 8.94689941,21.4929687 C10.1058024,21.9906901 11.3406169,22.2395508 12.6513428,22.2395508 Z M12.6513428,25.3214844 C10.9127197,25.3214844 9.27775879,24.9933553 7.74645996,24.3370972 C6.21516113,23.680839 4.86912028,22.7697225 3.7083374,21.6037476 C2.54755452,20.4377726 1.63930257,19.0920003 0.983581543,17.5664307 C0.327860514,16.040861 0,14.4082275 0,12.6685303 C0,10.9184489 0.327860514,9.28057861 0.983581543,7.75491943 C1.63930257,6.22926025 2.55010579,4.88608398 3.71599121,3.72539062 C4.88187663,2.56469727 6.22791748,1.65362549 7.75411377,0.992175293 C9.28031006,0.330725098 10.9127197,0 12.6513428,0 C14.39104,0 16.0265381,0.330725098 17.5578369,0.992175293 C19.0891357,1.65362549 20.4351766,2.56469727 21.5959595,3.72539062 C22.7567424,4.88608398 23.6649943,6.23181152 24.3207153,7.76257324 C24.9764364,9.29333496 25.3042969,10.928654 25.3042969,12.6685303 C25.3042969,14.4082275 24.9764364,16.040861 24.3207153,17.5664307 C23.6649943,19.0920003 22.7567424,20.4377726 21.5959595,21.6037476 C20.4351766,22.7697225 19.0891357,23.680839 17.5578369,24.3370972 C16.0265381,24.9933553 14.39104,25.3214844 12.6513428,25.3214844 Z M28.7111816,31.1104492 C28.4317057,31.1104492 28.1591675,31.0608561 27.8935669,30.9616699 C27.6279663,30.8624837 27.3953532,30.7074382 27.1957275,30.4965332 L18.6350098,21.9513916 L21.7088867,18.9443848 L30.2215332,27.4723389 C30.4231283,27.674113 30.5735636,27.9069946 30.6728394,28.1709839 C30.7721151,28.4349731 30.8217529,28.7060791 30.8217529,28.9843018 C30.8217529,29.3812256 30.7313843,29.741626 30.550647,30.0655029 C30.3699097,30.3893799 30.1201986,30.6445068 29.8015137,30.8308838 C29.4828288,31.0172607 29.1193848,31.1104492 28.7111816,31.1104492 Z"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
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
          <small className="d-block m-auto" style={{
              width: "652px"
            }}>
            Near Lock lets you use your iPhone to lock and unlock your Mac automatically. When you walk away from your Mac, it will be automatically locked. Once you approach your workplace, Near Lock will unlock your Mac.
          </small>
          <AppButton onClick={() => setActiveTab("Setup")} isDarkMode={isDarkMode}>
            Setup Near Lock
          </AppButton>
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
