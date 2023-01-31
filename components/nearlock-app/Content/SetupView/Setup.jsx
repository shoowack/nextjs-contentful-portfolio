import ListItem from '@components/nearlock-app/Content/SetupView/ListItem';
import ListHeader from '@components/nearlock-app/Content/SetupView/ListHeader';
import { Tab } from '@headlessui/react';
import classnames from 'classnames';
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
} from '@components/nearlock-app/Content/SetupView/SetupIcons';

export default function Setup({ setActiveTab, isDarkMode }) {
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

  return (
    <Tab.Panel>
      <div className="mx-5 flex h-full flex-col py-4">
        {setupData.map(({ id, title, desc, items }, i) => (
          <div key={`setup_list-${id}`}>
            <ListHeader title={title} desc={desc} key={`setup_list-header-${id}`} />{' '}
            {items.map((props) => (
              <ListItem {...props} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
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
  );
}
