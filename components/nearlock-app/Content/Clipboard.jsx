import { Tab } from '@headlessui/react';
import classnames from 'classnames';
import AppButton from '@components/nearlock-app/AppButton';

export default function Clipboard({ isSetupDone, isDarkMode, setActiveTab }) {
  return (
    <Tab.Panel>
      {isSetupDone ? (
        <>
          <img src="/nearlock-app/clipboard.png" className="mx-auto flex" width="820px" alt="" />
          <div className="flex justify-between">
            <div className="flex">
              <svg
                width="68px"
                height="150px"
                viewBox="0 0 125 275"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="ml-[50px] mt-[-150px]"
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
              <small className="-mt-3 ml-3 w-[250px] text-center">
                Use Menu bar shortcut on your Mac to copy Clipboard from your iPhone
              </small>
            </div>
            <div className="flex">
              <small className="-mt-3 mr-3 w-[220px] text-center">
                Use Near Lock widget on your iPhone to send and receive Clipboard from your Mac
              </small>
              <svg
                width="68px"
                height="150px"
                viewBox="0 0 125 275"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="mr-[25px] mt-[-150px] -scale-x-100"
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
        </>
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
              Please connect to your iPhone in order to try this feature which sends the copied text
              from your Mac to your iPhone and vice versa.
            </small>
            <AppButton className="nearlock btn-blue mt-4" onClick={() => setActiveTab(3)}>
              Devices
            </AppButton>
          </div>
        </div>
      )}
    </Tab.Panel>
  );
}
