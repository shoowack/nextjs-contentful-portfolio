import { Tab } from '@headlessui/react';
import classnames from 'classnames';
import AppButton from '@components/nearlock-app/AppButton';
import Lottie from 'lottie-react';
import btConnect from '@components/nearlock-app/Content/btConnect.json';

export default function Devices({
  isSetupDone,
  isDarkMode,
  owner,
  setIsSetupDone,
  setIsModalOpen,
}) {
  return (
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
            <div className="my-5 mx-auto flex w-[550px]">
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
                    fill={isDarkMode ? '#ffffff' : '#4C4C4C'}
                  >
                    <g transform="translate(10.000000, 81.000000)">
                      <path d="M330,179 L330,182 C330,185.313708 327.313708,188 324,188 L6,188 C2.6862915,188 0,185.313708 0,182 L0,179 L330,179 Z M281.615987,0 C291.055036,0 298.706897,7.65186064 298.706897,17.0909091 L298.706897,173.757576 L31.2931034,173.757576 L31.2931034,17.0909091 C31.2931034,7.65186064 38.9449641,0 48.3840125,0 L281.615987,0 Z M281.615987,9 L48.3840125,9 C43.9155268,9 40.2931034,12.6224234 40.2931034,17.0909091 L40.2931034,164.757576 L289.706897,164.757576 L289.706897,17.0909091 C289.706897,12.6224234 286.084473,9 281.615987,9 Z" />
                    </g>
                  </g>
                </svg>
                <small className="mt-3">{owner}’s MacBook Pro</small>
              </div>
              <div className="before:-z[1] mb-5 flex grow flex-col items-center justify-center before:relative before:ml-[7px] before:h-1 before:w-[calc(100%+41px)] before:bg-[#368EFC] before:shadow-[0_0_10px_-1px_#368EFC] before:content-['']">
                <div className="absolute mt-[-90px] rounded-lg bg-green-600 px-5 py-1.5 text-sm text-white transition-all duration-500 before:absolute before:left-1/2 before:-bottom-2 before:h-0 before:w-0 before:-translate-x-1/2 before:border-x-8 before:border-t-8 before:border-b-0 before:border-solid before:border-x-transparent before:border-b-transparent before:border-t-green-600 before:content-['']">
                  3 meters
                </div>
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
                        fill={isDarkMode ? '#ffffff' : '#4C4C4C'}
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
            className="absolute top-[-200px] left-1/2 h-[800px] w-[800px] -translate-x-1/2"
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
