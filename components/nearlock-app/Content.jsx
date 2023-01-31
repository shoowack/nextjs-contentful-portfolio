import { useState, useEffect } from 'react';
import classnames from 'classnames';
import Lottie from 'lottie-react';
import * as dayjs from 'dayjs';
import { Tab } from '@headlessui/react';
import ContentHeader from '@components/nearlock-app/ContentHeader';
import AppButton from './AppButton';
import btConnect from './btConnect.json';
// import btOff from "./btOff.json";
// import wifiConnected from "./wifiConnected.json";
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import {
  knock,
  nearlock,
  touchId,
  yesNo,
  sleep,
  screensaver,
  openSpace,
  btDisconnect,
  smallerDistances,
  loginPhotos,
  failedLoginPhotos,
  loginHistory,
  notifications,
} from './setupIcons';

const setupData = [
  {
    id: 1,
    title: 'Near Lock',
    // desc: "Activating main Near Lock feature",
    items: [
      {
        title: 'Near Lock',
        desc: "Enable Near Lock's main functionality",
        icon: nearlock,
        checked: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Lock Options',
    desc: 'Set your lock options',
    items: [
      {
        title: 'Sleep',
        desc: 'By default, your Mac will go to sleep when locked',
        icon: sleep,
      },
      {
        title: 'Screensaver',
        desc: 'By default, your Mac will go to sleep when locked',
        icon: screensaver,
      },
    ],
  },
  {
    id: 3,
    title: 'Notifications',
    desc: 'Select preferred options for Notification Settings',
    items: [
      {
        title: 'Notification',
        desc: 'Show OSX Notification when Near Lock Unlocks your Mac',
        icon: notifications,
        checked: true,
        extraInfo: 'Notifications',
      },
    ],
  },
  {
    id: 4,
    title: 'Mac wake unlock options',
    desc: 'Select how do you want to unlock your Mac',
    items: [
      {
        title: 'Yes/No',
        desc: 'Confirm unlock on iPhone with a simple Yes or No',
        icon: yesNo,
        checked: true,
      },
      {
        title: 'Touch ID or Passcode',
        icon: touchId,
        desc: 'Confirm unlock on your iPhone with Touch ID or Passcode',
      },
      {
        title: 'Double Knock',
        icon: knock,
        desc: 'Confirm unlock on iPhone with double knock (this option is active 15 seconds after notification)',
      },
    ],
  },
  {
    id: 5,
    title: 'Advanced Settings',
    desc: 'Finer tweaks and enhancements',
    items: [
      {
        title: 'Open Space Mode',
        icon: openSpace,
        checked: true,
      },
      {
        title: 'Lock Mac on Bluetooth Disconnect',
        icon: btDisconnect,
      },
      {
        title: 'Smaller Distances',
        icon: smallerDistances,
        desc: 'Allow unlock distances smaller then 1 meter',
      },
    ],
  },
  {
    id: 6,
    title: 'Photos and History',
    desc: 'Track your Mac activity',
    items: [
      {
        title: 'Login Photos',
        desc: 'Take photo every time your Mac is unlocked',
        icon: loginPhotos,
      },
      {
        title: 'Failed Login Photos',
        desc: 'Take photo every time someone tries to log into your Mac',
        icon: failedLoginPhotos,
        newBadge: true,
      },
      {
        title: 'Login History',
        icon: loginHistory,
        desc: 'Track time spent working on your Mac',
      },
    ],
  },
];

const Content = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  toggleSidebar,
  isSearchOpen,
  toggleSearch,
  searchRef,
  isDarkMode,
  setIsModalOpen,
  isSetupDone,
  setIsSetupDone,
  menuItems,
  owner,
}) => {
  const [dateState, setDateState] = useState(dayjs().format('ddd MMM D h:mm A'));
  const [notificationShow, setNotificationShow] = useState(false);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setDateState(dayjs().format('ddd MMM D h:mm A')); // TODO animate seconds (convert h to hh)
    }, 10000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setNotificationShow(false);
    }, 5000);
    return () => clearInterval(notificationInterval);
  }, [setNotificationShow]);

  return (
    <div
      className={classnames('content relative z-[1] h-full grow [transition:background_0.5s]', {
        'bg-[#211C21]': isDarkMode,
        'bg-white': !isDarkMode,
      })}
    >
      <ContentHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        searchRef={searchRef}
        menuItems={menuItems}
        isDarkMode={isDarkMode}
        activeTab={activeTab}
      />

      <Tab.Panels
        className="tab-content h-full overflow-scroll pt-[52px]"
        selectedIndex={activeTab}
      >
        {/* Welcome - ID: 0 */}
        <Tab.Panel>
          <div className="flex flex-col items-center">
            <img
              src="/nearlock-app/nearlock-logo.svg"
              className="mt-28 mb-12 h-[200px]"
              alt="NearLock Logo"
            />
            <div className="flex w-3/5 flex-col items-center">
              <h5
                className={classnames('text-xl font-medium [transition:color_0.5s]', {
                  'text-white': isDarkMode,
                  'text-black': !isDarkMode,
                })}
              >
                Welcome
              </h5>
              <small className="text-center">
                Near Lock lets you use your iPhone to lock and unlock your Mac automatically. When
                you walk away from your Mac, it will be automatically locked. Once you approach your
                workplace, Near Lock will unlock your Mac.
              </small>
              <AppButton onClick={() => setIsModalOpen(true)} className="nearlock btn-blue mt-4">
                Setup Near Lock
              </AppButton>
            </div>
          </div>
        </Tab.Panel>
        {/* Advanced - ID: 1 */}
        <Tab.Panel />
        {/* Clipboard - ID: 2 */}
        <Tab.Panel>
          {isSetupDone ? (
            <div className="mt-0">
              <img
                src="/nearlock-app/clipboard.png"
                className="mx-auto flex"
                width="820px"
                alt=""
              />
              <div className="flex justify-between">
                <div className="flex">
                  <svg
                    width="68px"
                    height="150px"
                    viewBox="0 0 125 275"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{
                      marginLeft: '50px',
                      marginTop: '-150px',
                    }}
                  >
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-1006.000000, -872.000000)"
                        fill={isDarkMode ? '#A4A4A4' : '#444'}
                        fillRule="nonzero"
                      >
                        <g transform="translate(870.000000, 274.000000)">
                          <g transform="translate(0.000000, -233.000000)">
                            <g transform="translate(221.559103, 972.082293) scale(1, -1) rotate(58.000000) translate(-221.559103, -972.082293) translate(112.765493, 868.774656)">
                              <path d="M17.6360685,0.250941654 C18.4088691,0.733841106 18.6438805,1.75178718 18.160981,2.52458785 C-6.83332543,42.5238395 0.309250359,100.781063 35.0166194,143.99805 C53.0284072,166.426002 77.2393835,183.2856 105.735264,192.340039 C137.021353,202.281055 172.651728,202.636012 211.27765,192.339147 L202.229857,187.223715 C201.483207,186.80169 201.191606,185.885197 201.533719,185.117442 L201.605335,184.975388 C202.02736,184.228739 202.943854,183.937138 203.711608,184.279251 L203.853662,184.350867 L217.587219,192.113419 L209.982376,205.767823 C209.538975,206.563944 208.534144,206.84988 207.738023,206.406479 C206.988733,205.989161 206.691371,205.07452 207.028646,204.304628 L207.099367,204.162127 L211.869,195.595 L211.417962,195.71589 C172.470431,205.978186 136.444726,205.560417 104.735938,195.48509 C75.6124884,186.231244 50.8571681,168.992586 32.4436421,146.064397 C-3.09560587,101.81157 -10.4235893,42.042099 15.3624223,0.775854238 C15.8453217,0.00305357089 16.8632678,-0.231957798 17.6360685,0.250941654 Z" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <small
                    className="mt-n3 ml-3 text-center"
                    style={{
                      width: '250px',
                    }}
                  >
                    Use Menu bar shortcut on your Mac to copy Clipboard from your iPhone
                  </small>
                </div>
                <div className="flex">
                  <small
                    className="mt-n3 mr-3 text-center"
                    style={{
                      width: '220px',
                    }}
                  >
                    Use Near Lock widget on your iPhone to send and receive Clipboard from your Mac
                  </small>
                  <svg
                    width="68px"
                    height="150px"
                    viewBox="0 0 125 275"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{
                      marginRight: '25px',
                      marginTop: '-150px',
                      transform: 'scaleX(-1)',
                    }}
                  >
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-1006.000000, -872.000000)"
                        fill={isDarkMode ? '#A4A4A4' : '#444'}
                        fillRule="nonzero"
                      >
                        <g transform="translate(870.000000, 274.000000)">
                          <g transform="translate(0.000000, -233.000000)">
                            <g transform="translate(221.559103, 972.082293) scale(1, -1) rotate(58.000000) translate(-221.559103, -972.082293) translate(112.765493, 868.774656)">
                              <path d="M17.6360685,0.250941654 C18.4088691,0.733841106 18.6438805,1.75178718 18.160981,2.52458785 C-6.83332543,42.5238395 0.309250359,100.781063 35.0166194,143.99805 C53.0284072,166.426002 77.2393835,183.2856 105.735264,192.340039 C137.021353,202.281055 172.651728,202.636012 211.27765,192.339147 L202.229857,187.223715 C201.483207,186.80169 201.191606,185.885197 201.533719,185.117442 L201.605335,184.975388 C202.02736,184.228739 202.943854,183.937138 203.711608,184.279251 L203.853662,184.350867 L217.587219,192.113419 L209.982376,205.767823 C209.538975,206.563944 208.534144,206.84988 207.738023,206.406479 C206.988733,205.989161 206.691371,205.07452 207.028646,204.304628 L207.099367,204.162127 L211.869,195.595 L211.417962,195.71589 C172.470431,205.978186 136.444726,205.560417 104.735938,195.48509 C75.6124884,186.231244 50.8571681,168.992586 32.4436421,146.064397 C-3.09560587,101.81157 -10.4235893,42.042099 15.3624223,0.775854238 C15.8453217,0.00305357089 16.8632678,-0.231957798 17.6360685,0.250941654 Z" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div
                className="flex items-center justify-center p-5"
                style={{
                  height: '200px',
                }}
              >
                <AppButton className="nearlock btn-blue">Send Clipboard</AppButton>
                <small className="mx-4">or press</small>
                <div className="keystrokes">
                  <span className="mr-2">CTRL</span>+<span className="mx-2">CMD</span>+
                  <span className="ml-2">V</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex h-[378px] w-full items-center justify-center">
                <svg
                  width="136px"
                  height="180px"
                  viewBox="0 0 266 355"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(0.646050, 0.867135)">
                      <rect
                        fill="#E4E4E4"
                        transform="translate(132.321856, 176.431792) rotate(-3.400000) translate(-132.321856, -176.431792) "
                        x="8.32185646"
                        y="32.4317918"
                        width="248"
                        height="288"
                        rx="43"
                      />
                      <rect
                        fill="#D8D8D8"
                        transform="translate(124.552722, 45.662374) rotate(-3.400000) translate(-124.552722, -45.662374) "
                        x="61.5527215"
                        y="3.66237431"
                        width="126"
                        height="84"
                        rx="28"
                      />
                      <path
                        d="M107.464825,193.0872 C114.644526,193.0872 120.464825,198.907499 120.464825,206.0872 L120.464825,340.0872 C120.464825,347.266902 114.644526,353.0872 107.464825,353.0872 C100.285123,353.0872 94.4648246,347.266902 94.4648246,340.0872 L94.4648246,206.0872 C94.4648246,198.907499 100.285123,193.0872 107.464825,193.0872 Z"
                        id="Combined-Shape"
                        fill="#D8D8D8"
                        transform="translate(107.464825, 273.087200) rotate(-3.400000) translate(-107.464825, -273.087200) "
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="flex w-3/5 flex-col items-center">
                <h5
                  className={classnames('text-xl font-medium [transition:color_0.5s]', {
                    'text-white': isDarkMode,
                    'text-black': !isDarkMode,
                  })}
                >
                  Clipboard
                </h5>
                <small className="text-center">
                  Please connect to your iPhone in order to try this feature which sends the copied
                  text from your Mac to your iPhone and vice versa.
                </small>
                <AppButton className="nearlock btn-blue mt-4" onClick={() => setActiveTab(3)}>
                  Devices
                </AppButton>
              </div>
            </div>
          )}
        </Tab.Panel>
        {/* Devices - ID: 3 */}
        <Tab.Panel
          className={classnames({
            'h-full': isSetupDone,
            relative: !isSetupDone,
          })}
        >
          {isSetupDone ? (
            <div className="mx-4 flex h-full flex-col">
              {/* <div className="py-3">
            <h4 className="m-0">Devices</h4>
            <small>Currently connected devices</small>
          </div> */}
              <div className="mt-5 flex grow flex-col justify-center">
                <div
                  className="my-5 mx-auto flex"
                  style={{
                    width: '550px',
                  }}
                >
                  <div className="flex flex-col items-center">
                    <svg
                      width="175px"
                      height="100px"
                      viewBox="0 0 330 188"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g
                        transform="translate(-10.000000, -81.000000)"
                        fill={isDarkMode ? '#BAB5BA' : '#4C4C4C'}
                      >
                        <g transform="translate(10.000000, 81.000000)">
                          <path d="M330,179 L330,182 C330,185.313708 327.313708,188 324,188 L6,188 C2.6862915,188 0,185.313708 0,182 L0,179 L330,179 Z M281.615987,0 C291.055036,0 298.706897,7.65186064 298.706897,17.0909091 L298.706897,173.757576 L31.2931034,173.757576 L31.2931034,17.0909091 C31.2931034,7.65186064 38.9449641,0 48.3840125,0 L281.615987,0 Z M281.615987,9 L48.3840125,9 C43.9155268,9 40.2931034,12.6224234 40.2931034,17.0909091 L40.2931034,164.757576 L289.706897,164.757576 L289.706897,17.0909091 C289.706897,12.6224234 286.084473,9 281.615987,9 Z" />
                        </g>
                      </g>
                    </svg>
                    <small className="mt-3">{owner}’s MacBook Pro</small>
                  </div>
                  <div className="devices-connected-line mb-5 flex grow flex-col items-center justify-center">
                    <div className="devices-connected-line__popup">3 meters</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg
                      width="102px"
                      height="100px"
                      viewBox="0 0 102 188"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g transform="translate(-124.000000, -81.000000)" fillRule="nonzero">
                        <g transform="translate(124.000000, 81.000000)">
                          <path
                            d="M79.5,0 C91.9264069,0 102,10.0735931 102,22.5 L102,165.5 C102,177.926407 91.9264069,188 79.5,188 L22.5,188 C10.0735931,188 0,177.926407 0,165.5 L0,22.5 C0,10.0735931 10.0735931,0 22.5,0 L79.5,0 Z M28.5,8.25 L22.5,8.25 C14.6299423,8.25 8.25,14.6299423 8.25,22.5 L8.25,165.5 C8.25,173.370058 14.6299423,179.75 22.5,179.75 L79.5,179.75 C87.3700577,179.75 93.75,173.370058 93.75,165.5 L93.75,22.5 C93.75,14.6299423 87.3700577,8.25 79.5,8.25 L73.5,8.25 C72.7203039,8.25 72.0795513,8.84488808 72.0068666,9.60553999 L72,9.75 L72,11 C72,13.209139 70.209139,15 68,15 L34,15 C31.790861,15 30,13.209139 30,11 L30,9.75 C30,8.92157288 29.3284271,8.25 28.5,8.25 Z"
                            fill={isDarkMode ? '#BAB5BA' : '#4C4C4C'}
                          />
                        </g>
                      </g>
                    </svg>
                    <small className="mt-3">{owner}’s iPhone X</small>
                  </div>
                </div>
                <h5
                  className={classnames('text-center text-xl font-medium [transition:color_0.5s]', {
                    'text-white': isDarkMode,
                    'text-black': isDarkMode,
                  })}
                >
                  {owner}’s iPhone X and this Mac are connected
                </h5>
                <div className="flex justify-center pb-5">
                  <AppButton
                    onClick={() => setIsSetupDone(false)}
                    className="nearlock btn-blue mt-4"
                  >
                    Unlink
                  </AppButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Lottie
                animationData={btConnect}
                loop
                autoplay
                className="absolute top-[-200px] left-1/2 h-[800px] w-[800px] -translate-x-1/2"
              />
              <div className="absolute top-[400px] flex w-3/5 flex-col items-center">
                <h5
                  className={classnames(
                    'm-0 text-xl font-medium text-black [transition:color_0.5s]',
                    {
                      'text-white': isDarkMode,
                    },
                  )}
                >
                  Please turn on Bluetooth and get the iOS app
                </h5>
                <small className="text-center">
                  To use Near Lock make sure your Mac has Bluetooth turned on and your iOS app is
                  open on your iPhone
                </small>
                <AppButton onClick={() => setIsModalOpen(true)} className="nearlock btn-blue mt-4">
                  Turn Bluetooth On
                </AppButton>
              </div>
            </div>
          )}
        </Tab.Panel>
        {/* Music - ID: 4 */}
        <Tab.Panel />
        {/* WiFi Unlock - ID: 5 */}
        <Tab.Panel />
        {/* Help - ID: 6 */}
        <Tab.Panel />
        {/* Setup - ID: 7 */}
        <Tab.Panel>
          <div className="mx-5 flex h-full flex-col py-4">
            {setupData.map(({ id, title, desc, items }, i) => (
              <div key={`setup_list-${id}`}>
                <ListHeader title={title} desc={desc} key={`setup_list-header-${id}`} />{' '}
                {items.map((props) => (
                  <ListItem {...props} setActiveTab={setActiveTab} />
                ))}
                {i < setupData.length - 1 && (
                  <hr
                    className={classnames('my-4 w-full', {
                      'bg-white/[.05]': isDarkMode,
                      'bg-black/[.05]': !isDarkMode,
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </Tab.Panel>
        {/* Photos and History - ID: 8 */}
        <Tab.Panel />
        {/* Updates - ID: 9 */}
        <Tab.Panel />
        {/* Share - ID: 10 */}
        <Tab.Panel />
        {/* Notifications - ID: 11 */}
        <Tab.Panel>
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="w-3/5">
              <h5
                className={classnames('text-xl font-medium [transition:color_0.5s]', {
                  'text-white': isDarkMode,
                  'text-black': !isDarkMode,
                })}
              >
                MacOS Notifications
              </h5>
              <div className="text-sm">Receive notifications about Near Lock events</div>
              <AppButton
                className={classnames('mt-6', {
                  'nearlock dark': isDarkMode,
                  'nearlock btn-disabled': notificationShow,
                  'nearlock btn-blue': !notificationShow,
                })}
                onClick={() => {
                  setNotificationShow(true);
                }}
              >
                Show Notification Example
              </AppButton>
              <div className="mt-2 text-[11px] italic">
                Notifications will appear even if your Mac is locked
              </div>
            </div>
          </div>
          <div className="notifications-container">
            <div
              className={classnames('notifications-notification flex items-center', {
                show: notificationShow,
              })}
            >
              <div className="notifications-notification-icon flex items-center justify-center">
                <img src="/nearlock-app/setup/nearlock.svg" alt="" />
              </div>
              <div className="flex flex-col">
                <strong className="notifications-notification-title">Near Lock</strong>
                <small className="notifications-notification-description">Description</small>
              </div>
            </div>
          </div>
          <div className="notifications-clock">{dateState}</div>
          <img
            src="/nearlock-app/notifications-screen.png"
            className="notifications-bg absolute"
            alt=""
          />
        </Tab.Panel>
      </Tab.Panels>
    </div>
  );
};

export default Content;
