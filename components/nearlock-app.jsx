import React, {useState} from "react";
import {TabContent, TabPane, Row, Col} from "reactstrap";
import classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCog,
  faMusic,
  faQuestionCircle,
  faWifi,
  faCheck,
  faPaperPlane,
  faCircleNotch,
  faCamera,
  faSync,
  faExternalLinkAlt,
  faClipboard,
  faImage,
  faLaptop
} from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import btConnect from "./btConnect.json";
// import btOff from "./btOff.json";
// import wifiConnected from "./wifiConnected.json";

function NearLockApp() {
  const [activeTab, setActiveTab] = useState("Advanced");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleTab = tab => {
    if (activeTab !== tab) 
      setActiveTab(tab);
    
    if (tab === "Devices") 
      setIsModalOpen(true);
    };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const content = [
    {
      title: "Advanced",
      icon: faLaptop,
      disabled: true
    }, {
      title: "Clipboard",
      icon: faClipboard
    }, {
      title: "Devices",
      icon: faCheck
    }, {
      title: "Music",
      icon: faMusic,
      disabled: true
    }, {
      title: "WiFi Unlock",
      icon: faWifi,
      disabled: true
    }, {
      title: "Help",
      icon: faQuestionCircle,
      disabled: true
    }, {
      title: "Setup",
      icon: faCog
    }, {
      title: "Photos and History",
      icon: faImage,
      disabled: true
    }, {
      title: "Updates",
      icon: faSync,
      disabled: true
    }, {
      title: "Share",
      icon: faExternalLinkAlt,
      disabled: true
    }
  ];

  return (<div className="nearlock-app">
    <div className={classnames({
        "d-none": !isModalOpen
      }, "nearlock-app-modal__background")}>
      <div className="nearlock-app-modal">
        <div className="nearlock-app-modal__content d-flex flex-column p-5  text-center">
          <FontAwesomeIcon icon={faPaperPlane} size="10x" className="mb-3 mx-5" color="#368EFC"/>
          Filip’s iPhone X<br/>
          wants to connect
        </div>
        <div className="nearlock-app-modal__footer d-flex ">
          <div className="flex-fill nearlock-app__btn-link">Setup later</div>
          <div>
            <button className="nearlock-app__btn" onClick={() => setIsModalOpen(false)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={classnames({
        open: isSidebarOpen
      }, "nearlock-app-sidebar")}>
      <div className="nearlock-app-sidebar-header-controls">
        {Array.from({length: 3}).map((_, i) => (<div key={`nearlock-app-sidebar-header-controls__item-${i}`} className="nearlock-app-sidebar-header-controls__item"/>))}
      </div>
      <div className="nearlock-app-sidebar-content">
        <div className="nearlock-app-sidebar-header mb-3">
          <input className="nearlock-app-sidebar-search mt-3 w-100" placeholder="Search"/>
        </div>
        {
          content.map(
            ({
            title,
            icon,
            disabled
          }, i) => disabled
            ? (<div key={`nearlock-app-sidebar__item-${i}`} className={"nearlock-app-sidebar__item m-0 disabled"}>
              <FontAwesomeIcon icon={icon} size="sm" className="mr-2 ml-1 fa-fw" color="#368EFC"/>{" "}
              {title}
            </div>)
            : (<a key={`nearlock-app-sidebar__item-${i}`} className={classnames({
                active: activeTab === title
              }, "nearlock-app-sidebar__item m-0")} onClick={() => {
                toggleTab(title);
              }}>
              <FontAwesomeIcon icon={icon} size="sm" className="mr-2 ml-1 fa-fw" color="#368EFC"/>{" "}
              {title}
            </a>))
        }
      </div>
    </div>
    <div className="nearlock-app-content">
      <div className={classnames({
          open: !isSidebarOpen
        }, "nearlock-app-content-header")}>
        <div className="nearlock-app-content-header__left-items">
          <a onClick={toggleSidebar}>Toggle sidebar</a>
        </div>
        <div className="nearlock-app-content-header__title">{activeTab}</div>
        <div className="nearlock-app-content-header__right-items">aa</div>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="Advanced">
          <Row>
            <Col sm="12">
              <h4>Advanced</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="Setup">
          <Row style={{
              position: "relative"
            }}>
            <div className="setup-bt-wrapper">
              <Lottie animationData={btConnect} loop={true} autoplay={true}/>
              <Col className="setup-bt-text" md={{
                  size: 10,
                  offset: 1
                }}>
                <h5>Please turn on Bluetooth and get the iOS app</h5>
                <small>
                  To use Near Lock make sure your Mac has Bluetooth turned on and your iOS app is open on your iPhone
                </small>
                <button className="nearlock-app__btn mt-4">
                  Turn Bluetooth On
                </button>
              </Col>
            </div>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  </div>);
}

export default NearLockApp;
