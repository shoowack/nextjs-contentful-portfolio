import AppButton from '@components/nearlock-app/AppButton';
import { Tab } from '@headlessui/react';
import { NearLockAppType } from '@interfaces/nearlock-app';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Notifications: React.FC<{ isDarkMode: NearLockAppType['isDarkMode'] }> = ({ isDarkMode }) => {
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
      <div className="absolute bottom-[130px] left-[282.5px] z-[1] overflow-hidden">
        <div
          className={classnames(
            'm-5 flex w-[350px] items-center gap-2.5 rounded-2xl border border-solid p-[10px] backdrop-blur-[100px] transition-all duration-500 ease-in-out',
            notificationShow ? 'translate-x-0' : 'translate-x-[400px]',
            isDarkMode
              ? 'border-[#575259] bg-[#35343C] shadow-[0_0_0_0.5px_rgba(0,0,0,0.5),0_0_8px_-2px_rgba(0,0,0,0.75)]'
              : 'border-[#E4E3EA] bg-[#f5f5f5]/[0.8] shadow-[0_0_0_0.5px_rgba(0,0,0,0.15),0_0_8px_-2px_rgba(0,0,0,0.5)]',
          )}
        >
          <div className="m-[3px] flex h-[37px] w-[37px] items-center justify-center rounded-lg bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.50)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <div className="absolute bottom-[247px] left-[510px] z-[1] text-sm font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.30)]">
        {dateState}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nearlock-app/notifications-screen.png"
        className="absolute bottom-0 left-0 w-[750px]"
        alt="NearLock notification screen"
      />
    </Tab.Panel>
  );
};

export default Notifications;
