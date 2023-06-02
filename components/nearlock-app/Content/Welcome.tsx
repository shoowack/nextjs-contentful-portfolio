import AppButton from '@components/nearlock-app/AppButton';
import { Tab } from '@headlessui/react';
import classnames from 'classnames';

export default function Welcome({ setIsModalOpen, isDarkMode }) {
  return (
    <Tab.Panel>
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nearlock-app/nearlock-logo.svg"
          className="mb-12 mt-28 h-[200px]"
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
            Near Lock lets you use your iPhone to lock and unlock your Mac automatically. When you
            walk away from your Mac, it will be automatically locked. Once you approach your
            workplace, Near Lock will unlock your Mac.
          </small>
          <AppButton onClick={() => setIsModalOpen(true)} className="nearlock btn-blue mt-4">
            Setup Near Lock
          </AppButton>
        </div>
      </div>
    </Tab.Panel>
  );
}
