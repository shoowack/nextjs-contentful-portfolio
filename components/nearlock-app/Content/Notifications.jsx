import * as dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import classnames from 'classnames';
import AppButton from '@components/nearlock-app/AppButton';

export default function Notifications({ isDarkMode }) {
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
      <div className="absolute bottom-[130px] left-[282.5px] overflow-hidden z-[1]">
        <div
          className={classnames(
            'border border-solid backdrop-blur-[100px] gap-2.5 w-[350px] p-[10px] rounded-2xl flex items-center m-5 transition-all duration-500 ease-in-out',
            notificationShow ? 'translate-x-0' : 'translate-x-[400px]',
            isDarkMode
              ? 'bg-[#35343C] border-[#575259] shadow-[0_0_0_0.5px_rgba(0,0,0,0.5),0_0_8px_-2px_rgba(0,0,0,0.75)]'
              : 'bg-[#f5f5f5]/[0.8] border-[#E4E3EA] shadow-[0_0_0_0.5px_rgba(0,0,0,0.15),0_0_8px_-2px_rgba(0,0,0,0.5)]',
          )}
        >
          <div className="flex shadow-[0_1px_2px_-1px_rgba(0,0,0,0.50)] m-[3px] rounded-lg items-center justify-center bg-white w-[37px] h-[37px]">
            <img src="/nearlock-app/setup/nearlock.svg" alt="" className="w-4" />
          </div>
          <div className="flex flex-col">
            <strong className={classnames('leading-tight', { 'text-white': isDarkMode })}>
              Near Lock
            </strong>
            <small className={classnames('leading-tight', { 'text-white': isDarkMode })}>
              Description
            </small>
          </div>
        </div>
      </div>
      <div className="notifications-clock drop-shadow-[0_1px_3px_rgba(0,0,0,0.30)] z-[1] absolute bottom-[247px] text-white left-[510px] font-normal text-sm">
        {dateState}
      </div>
      <img
        src="/nearlock-app/notifications-screen.png"
        className="absolute bottom-0 w-[750px] left-0"
        alt="NearLock notification screen"
      />
    </Tab.Panel>
  );
}
