import { useState, useEffect } from 'react';
import classnames from 'classnames';
import Lottie from 'lottie-react';
import * as dayjs from 'dayjs';
import { Tab } from '@headlessui/react';
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
      <div
        className={classnames(
          'content-header absolute z-[1] flex w-full flex-row items-center justify-between border-b px-[10px] py-[9px] backdrop-blur-[10px] [transition:all_0.5s]',
          {
            'pl-[100px]': !isSidebarOpen,
            'border-black/[.09] bg-[#f4f3f7]/[0.7]': !isDarkMode,
            'border-white/[0.09] bg-[#211c21]/[0.7]': isDarkMode,
          },
        )}
      >
        <div
          className="content-header__left-items flex rounded-md p-[8px] hover:bg-black/10"
          onClick={toggleSidebar}
          onKeyDown={toggleSidebar}
          aria-hidden
        >
          <svg
            width="22px"
            height="17px"
            viewBox="0 0 41 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              transform="translate(-672.000000, -35.000000)"
              fill={isDarkMode ? '#BAB5BA' : '#666666'}
              fillRule="nonzero"
            >
              <g transform="translate(96.000000, 0.000000)">
                <g transform="translate(464.000000, 0.000000)">
                  <g transform="translate(112.295166, 35.212582)">
                    <path d="M13.1784515,28.7645798 L16.1088219,28.7645798 L16.1088219,2.50681305 L13.1784515,2.50681305 L13.1784515,28.7645798 Z M9.89859772,9.26395798 C10.1746572,9.26395798 10.4184138,9.15906652 10.6298676,8.9492836 C10.8413213,8.73950068 10.9470482,8.50484085 10.9470482,8.24530411 C10.9470482,7.96330388 10.8413213,7.72247124 10.6298676,7.52280617 C10.4184138,7.3231411 10.1746572,7.22330856 9.89859772,7.22330856 L6.37034607,7.22330856 C6.09447225,7.22330856 5.85076205,7.3231411 5.63921547,7.52280617 C5.42766889,7.72247124 5.3218956,7.96330388 5.3218956,8.24530411 C5.3218956,8.50484085 5.42766889,8.73950068 5.63921547,8.9492836 C5.85076205,9.15906652 6.09447225,9.26395798 6.37034607,9.26395798 L9.89859772,9.26395798 Z M9.89859772,13.7198029 C10.1746572,13.7198029 10.4184138,13.6176033 10.6298676,13.4132042 C10.8413213,13.2088051 10.9470482,12.9661624 10.9470482,12.685276 C10.9470482,12.4149717 10.8413213,12.1803118 10.6298676,11.9812965 C10.4184138,11.7822812 10.1746572,11.6827736 9.89859772,11.6827736 L6.37034607,11.6827736 C6.09447225,11.6827736 5.85076205,11.7822812 5.63921547,11.9812965 C5.42766889,12.1803118 5.3218956,12.4149717 5.3218956,12.685276 C5.3218956,12.9661624 5.42766889,13.2088051 5.63921547,13.4132042 C5.85076205,13.6176033 6.09447225,13.7198029 6.37034607,13.7198029 L9.89859772,13.7198029 Z M9.89859772,18.1614456 C10.1746572,18.1614456 10.4184138,18.0616131 10.6298676,17.861948 C10.8413213,17.6622829 10.9470482,17.4273911 10.9470482,17.1572723 C10.9470482,16.876386 10.8413213,16.6363888 10.6298676,16.4372807 C10.4184138,16.2381725 10.1746572,16.1386185 9.89859772,16.1386185 L6.37034607,16.1386185 C6.09447225,16.1386185 5.85076205,16.2381725 5.63921547,16.4372807 C5.42766889,16.6363888 5.3218956,16.876386 5.3218956,17.1572723 C5.3218956,17.4273911 5.42766889,17.6622829 5.63921547,17.861948 C5.85076205,18.0616131 6.09447225,18.1614456 6.37034607,18.1614456 L9.89859772,18.1614456 Z M5.43439865,31.2830887 L34.4303894,31.2830887 C36.2339656,31.2830887 37.5905927,30.8309879 38.5002708,29.9267864 C39.409949,29.0225849 39.8647881,27.6847547 39.8647881,25.9132957 L39.8647881,5.3681221 C39.8647881,3.59666316 39.409949,2.2591114 38.5002708,1.35546684 C37.5905927,0.451822281 36.2339656,0 34.4303894,0 L5.43439865,0 C3.64140447,0 2.28742282,0.449130376 1.37245369,1.34739113 C0.457484563,2.24565188 0,3.58589554 0,5.3681221 L0,25.9132957 C0,27.6953367 0.457484563,29.0358124 1.37245369,29.9347229 C2.28742282,30.8336334 3.64140447,31.2830887 5.43439865,31.2830887 Z M5.56277466,28.2248993 C4.76448568,28.2248993 4.14989599,28.0133063 3.71900558,27.5901203 C3.28811518,27.1669343 3.07266998,26.532341 3.07266998,25.6863403 L3.07266998,5.59507751 C3.07266998,4.74907684 3.28811518,4.11448352 3.71900558,3.69129753 C4.14989599,3.26811155 4.76448568,3.05651855 5.56277466,3.05651855 L34.3000641,3.05651855 C35.0996526,3.05651855 35.7172591,3.26811155 36.1528835,3.69129753 C36.588508,4.11448352 36.8063202,4.74907684 36.8063202,5.59507751 L36.8063202,25.6863403 C36.8063202,26.532341 36.588508,27.1669343 36.1528835,27.5901203 C35.7172591,28.0133063 35.0996526,28.2248993 34.3000641,28.2248993 L5.56277466,28.2248993 Z" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div
          className={classnames('content-header__title [transition:margin_0.5s]', {
            // negative paddings to center the title if sidebar or search are active
            '-ml-[80px]': !isSidebarOpen,
            '-mr-[180px]': isSearchOpen,
          })}
        >
          {menuItems[activeTab].title}
        </div>
        <div className="content-header__right-items flex items-center">
          <input
            className={classnames(
              'content-header__search pointer-events-none m-0 h-[30px] w-0 rounded-[7px] border-0 bg-[length:12px_12px] bg-[left_0.5rem_center] bg-no-repeat py-0 pr-[30px] pl-[28px] text-xs opacity-0 outline outline-1 [transition:background_0.5s,width_0.5s,opacity_0.5s,color_0.5s]',
              {
                'pointer-events-auto w-[240px] opacity-100 ring-[#368ffc] focus:outline-none focus:ring':
                  isSearchOpen,
                'bg-[#F4F3F7] text-black': !isDarkMode,
                'bg-[#211C21] text-white': isDarkMode,
                'outline-white/[0.06]': isSearchOpen && isDarkMode,
                'outline-black/[0.06]': isSearchOpen && !isDarkMode,
              },
            )}
            placeholder="Search"
            ref={searchRef}
            style={{ backgroundImage: 'url(./../../nearlock-app/search.svg)' }}
          />
          <img
            src="/nearlock-app/search-close.svg"
            className={classnames(
              {
                hidden: !isSearchOpen,
              },
              'content-header__search-close-icon absolute right-5 h-3.5 w-3.5',
            )}
            onClick={toggleSearch}
            onKeyDown={toggleSearch}
            aria-hidden
            alt=""
          />
          <div
            className={classnames(
              'content-header__right-items_search_icon absolute top-2.5 right-2.5 flex rounded-md p-[8px] opacity-100 [transition:transform_0.5s,opacity_0.5s] hover:bg-black/10',
              {
                'pointer-events-none scale-0 opacity-0': isSearchOpen,
              },
            )}
            onClick={toggleSearch}
            onKeyDown={toggleSearch}
            aria-hidden
          >
            <svg
              width="17px"
              height="17px"
              viewBox="0 0 31 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                transform="translate(-2191.000000, -35.000000)"
                fill={isDarkMode ? '#BAB5BA' : '#666666'}
                fillRule="nonzero"
              >
                <g transform="translate(96.000000, 0.000000)">
                  <g transform="translate(464.000000, 0.000000)">
                    <g transform="translate(139.000000, 2.000000)">
                      <g transform="translate(1492.084573, 33.441455)">
                        <path d="M12.6513428,22.2395508 C13.9631429,22.2395508 15.1984497,21.9906901 16.3572632,21.4929687 C17.5160767,20.9952474 18.5347493,20.3045695 19.4132812,19.4209351 C20.2918132,18.5373006 20.9799398,17.5186727 21.4776611,16.3650513 C21.9753825,15.2114299 22.2242432,13.9792562 22.2242432,12.6685303 C22.2242432,11.3565511 21.9753825,10.1214233 21.4776611,8.96314697 C20.9799398,7.80487061 20.2918132,6.78651123 19.4132812,5.90806885 C18.5347493,5.02962646 17.5160767,4.33894857 16.3572632,3.83603516 C15.1984497,3.33312174 13.9631429,3.08166504 12.6513428,3.08166504 C11.3406169,3.08166504 10.1058024,3.33312174 8.94689941,3.83603516 C7.78799642,4.33894857 6.76932373,5.02962646 5.89088135,5.90806885 C5.01243896,6.78651123 4.3243571,7.80487061 3.82663574,8.96314697 C3.32891439,10.1214233 3.08005371,11.3565511 3.08005371,12.6685303 C3.08005371,13.9792562 3.32891439,15.2114299 3.82663574,16.3650513 C4.3243571,17.5186727 5.01243896,18.5373006 5.89088135,19.4209351 C6.76932373,20.3045695 7.78799642,20.9952474 8.94689941,21.4929687 C10.1058024,21.9906901 11.3406169,22.2395508 12.6513428,22.2395508 Z M12.6513428,25.3214844 C10.9127197,25.3214844 9.27775879,24.9933553 7.74645996,24.3370972 C6.21516113,23.680839 4.86912028,22.7697225 3.7083374,21.6037476 C2.54755452,20.4377726 1.63930257,19.0920003 0.983581543,17.5664307 C0.327860514,16.040861 0,14.4082275 0,12.6685303 C0,10.9184489 0.327860514,9.28057861 0.983581543,7.75491943 C1.63930257,6.22926025 2.55010579,4.88608398 3.71599121,3.72539062 C4.88187663,2.56469727 6.22791748,1.65362549 7.75411377,0.992175293 C9.28031006,0.330725098 10.9127197,0 12.6513428,0 C14.39104,0 16.0265381,0.330725098 17.5578369,0.992175293 C19.0891357,1.65362549 20.4351766,2.56469727 21.5959595,3.72539062 C22.7567424,4.88608398 23.6649943,6.23181152 24.3207153,7.76257324 C24.9764364,9.29333496 25.3042969,10.928654 25.3042969,12.6685303 C25.3042969,14.4082275 24.9764364,16.040861 24.3207153,17.5664307 C23.6649943,19.0920003 22.7567424,20.4377726 21.5959595,21.6037476 C20.4351766,22.7697225 19.0891357,23.680839 17.5578369,24.3370972 C16.0265381,24.9933553 14.39104,25.3214844 12.6513428,25.3214844 Z M28.7111816,31.1104492 C28.4317057,31.1104492 28.1591675,31.0608561 27.8935669,30.9616699 C27.6279663,30.8624837 27.3953532,30.7074382 27.1957275,30.4965332 L18.6350098,21.9513916 L21.7088867,18.9443848 L30.2215332,27.4723389 C30.4231283,27.674113 30.5735636,27.9069946 30.6728394,28.1709839 C30.7721151,28.4349731 30.8217529,28.7060791 30.8217529,28.9843018 C30.8217529,29.3812256 30.7313843,29.741626 30.550647,30.0655029 C30.3699097,30.3893799 30.1201986,30.6445068 29.8015137,30.8308838 C29.4828288,31.0172607 29.1193848,31.1104492 28.7111816,31.1104492 Z" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

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
