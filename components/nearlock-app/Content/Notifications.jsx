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
  );
}
