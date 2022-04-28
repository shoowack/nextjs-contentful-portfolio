import React, {useState} from "react";
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPaperPlane, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import btOff from "./btOff.json";
import btConnect from "./btConnect.json";
import wifiConnected from "./wifiConnected.json";

function NearLockApp() {
  const [activeTab, setActiveTab] = useState("Advanced");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTab = tab => {
    if (activeTab !== tab) 
      setActiveTab(tab);
    
    if (tab === "Devices") 
      setIsModalOpen(true);
    };
  
  const content = [
    {
      title: "Advanced",
      icon: faCircleNotch
    }, {
      title: "Clipboard",
      icon: faPaperPlane
    }, {
      title: "Devices",
      icon: faCheck
    }, {
      title: "Setup",
      icon: faCheck
    }
  ];

  return (<div className="nearlock-app">
    <div className="nearlock-app-modal__background" style={{
        display: isModalOpen
          ? "block"
          : "none"
      }}>
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
    <div className="nearlock-app-sidebar">
      <div className="nearlock-app-sidebar-header mb-3">
        <div className="nearlock-app-sidebar-header-controls">
          {Array.from({length: 3}).map((_, i) => (<div key={`nearlock-app-sidebar-header-controls__item-${i}`} className="nearlock-app-sidebar-header-controls__item"/>))}
        </div>
        <input className="nearlock-app-sidebar-search mt-3 w-100" placeholder="Search"/>
      </div>
      {
        content.map(({
          title,
          icon
        }, index) => (<a key={`nearlock-app-sidebar__item-${i}`} className={classnames({
            active: activeTab === title
          }, "nearlock-app-sidebar__item m-0")} onClick={() => {
            toggleTab(title);
          }}>
          <FontAwesomeIcon icon={icon} size="sm" className="mx-1" color="#368EFC"/>{" "}
          {title}
        </a>))
      }
    </div>
    <div className="nearlock-app-content">
      <div className="nearlock-app-content-header">
        <div className="nearlock-app-content-header__left-items">aa</div>
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
