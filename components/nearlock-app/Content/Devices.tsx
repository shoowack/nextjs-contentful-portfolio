import AppButton from '@components/nearlock-app/AppButton';
import btConnect from '@components/nearlock-app/Content/btConnect.json';
import { Tab } from '@headlessui/react';
import classnames from 'classnames';
import Lottie from 'lottie-react';

export default function Devices({
  isSetupDone,
  isDarkMode,
  owner,
  setIsSetupDone,
  setIsModalOpen,
  device,
}) {
  return (
    <Tab.Panel
      className={classnames({
        'h-full': isSetupDone,
        relative: !isSetupDone,
      })}
    >
      {isSetupDone ? (
        <div className="flex h-full flex-col">
          {/* <div className="py-3">
            <h4 className="m-0">Devices</h4>
            <small>Currently connected devices</small>
          </div> */}
          <div className="flex grow flex-col justify-center">
            <div className="mx-auto mb-20 mt-14 flex w-[550px]">
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
                    className="[transition:fill_0.5s]"
                    fill={isDarkMode ? '#ffffff' : '#4C4C4C'}
                  >
                    <g transform="translate(10.000000, 81.000000)">
                      <path d="M330,179 L330,182 C330,185.313708 327.313708,188 324,188 L6,188 C2.6862915,188 0,185.313708 0,182 L0,179 L330,179 Z M281.615987,0 C291.055036,0 298.706897,7.65186064 298.706897,17.0909091 L298.706897,173.757576 L31.2931034,173.757576 L31.2931034,17.0909091 C31.2931034,7.65186064 38.9449641,0 48.3840125,0 L281.615987,0 Z M281.615987,9 L48.3840125,9 C43.9155268,9 40.2931034,12.6224234 40.2931034,17.0909091 L40.2931034,164.757576 L289.706897,164.757576 L289.706897,17.0909091 C289.706897,12.6224234 286.084473,9 281.615987,9 Z" />
                    </g>
                  </g>
                </svg>
                <small className="mt-3">{owner}’s MacBook Pro</small>
              </div>
              <div className="before:-z[1] mb-5 flex grow flex-col items-center justify-center before:relative before:ml-[15px] before:h-1 before:w-[calc(100%+47px)] before:bg-[#368EFC] before:shadow-[0_0_10px_-1px_#368EFC] before:content-['']">
                <div className="absolute mt-[-90px] rounded-lg bg-green-600 px-5 py-1.5 text-sm text-white transition-all duration-500 before:absolute before:-bottom-2 before:left-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:border-x-8 before:border-b-0 before:border-t-8 before:border-solid before:border-x-transparent before:border-b-transparent before:border-t-green-600 before:content-['']">
                  3 meters
                </div>
              </div>
              <div className="flex flex-col items-center">
                <svg
                  width="102px"
                  height="100px"
                  viewBox="0 0 102 187"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g
                      transform="translate(-1757.000000, -739.000000)"
                      fill="#000000"
                      fillRule="nonzero"
                    >
                      <path
                        d="M1839,739 C1850.04569,739 1859,747.954305 1859,759 L1859,906 C1859,917.045695 1850.04569,926 1839,926 L1777,926 C1765.95431,926 1757,917.045695 1757,906 L1757,759 C1757,747.954305 1765.95431,739 1777,739 L1839,739 Z M1839,746 L1777,746 C1769.8203,746 1764,751.820298 1764,759 L1764,906 C1764,913.179702 1769.8203,919 1777,919 L1839,919 C1846.1797,919 1852,913.179702 1852,906 L1852,759 C1852,751.820298 1846.1797,746 1839,746 Z M1827,909 C1828.10457,909 1829,909.895431 1829,911 C1829,912.104569 1828.10457,913 1827,913 L1789,913 C1787.89543,913 1787,912.104569 1787,911 C1787,909.895431 1787.89543,909 1789,909 L1827,909 Z M1818.5,752 C1821.53757,752 1824,754.462434 1824,757.5 C1824,760.537566 1821.53757,763 1818.5,763 L1797.5,763 C1794.46243,763 1792,760.537566 1792,757.5 C1792,754.462434 1794.46243,752 1797.5,752 L1818.5,752 Z"
                        className="[transition:fill_0.5s]"
                        fill={isDarkMode ? '#ffffff' : '#4C4C4C'}
                      />
                    </g>
                  </g>
                </svg>
                <small className="mt-3">
                  {owner}’s {device}
                </small>
              </div>
            </div>
            <h5
              className={classnames('text-center text-xl font-medium [transition:color_0.5s]', {
                'text-white': isDarkMode,
                'text-black': isDarkMode,
              })}
            >
              {owner}’s iPhone 14 Pro and this Mac are connected
            </h5>
            <div className="flex justify-center">
              <AppButton onClick={() => setIsSetupDone(false)} className="nearlock btn-blue mt-4">
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
            className="absolute left-1/2 top-[-200px] h-[800px] w-[800px] -translate-x-1/2"
          />
          <div className="absolute top-[400px] flex w-3/5 flex-col items-center">
            <h5
              className={classnames('m-0 text-xl font-medium text-black [transition:color_0.5s]', {
                'text-white': isDarkMode,
              })}
            >
              Please turn on Bluetooth and get the iOS app
            </h5>
            <small className="text-center">
              To use Near Lock make sure your Mac has Bluetooth turned on and your iOS app is open
              on your iPhone
            </small>
            <AppButton onClick={() => setIsModalOpen(true)} className="nearlock btn-blue mt-4">
              Turn Bluetooth On
            </AppButton>
          </div>
        </div>
      )}
    </Tab.Panel>
  );
}
