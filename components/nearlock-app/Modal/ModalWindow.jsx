import AppButton from '@components/nearlock-app/AppButton';
import FirstStep from '@components/nearlock-app/Modal/FirstStep';
import SecondStep from '@components/nearlock-app/Modal/SecondStep';
import ThirdStep from '@components/nearlock-app/Modal/ThirdStep';
import classnames from 'classnames';
import { useState } from 'react';

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  isDarkMode,
  setActiveTab,
  setIsSetupDone,
  owner,
  device,
}) => {
  const [currentStep, setStep] = useState(1);

  const goBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const finishSetup = () => {
    setIsModalOpen(false);
    setStep(1);
    setActiveTab(3);
    setIsSetupDone(true);
  };

  const setupLater = () => {
    setIsModalOpen(false);
    setStep(1);
    setActiveTab(3);
    setIsSetupDone(false);
  };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <FirstStep owner={owner} device={device} />;
      case 2:
        return <SecondStep goBack={goBack} isDarkMode={isDarkMode} />;
      case 3:
        return <ThirdStep goBack={goBack} />;
      default:
        return <FirstStep />;
    }
  };

  return (
    <div
      className={classnames('absolute inset-0 z-[3] bg-black/25', {
        hidden: !isModalOpen,
      })}
    >
      <div
        className={classnames(
          'absolute left-1/2 top-1/2 z-[1] flex h-[480px] w-[715px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[10px] shadow-[0_0_0_1px_hsla(0,0%,0%,0.15),0_25px_60px_-15px_hsla(0,0%,0%,0.35)]',
          {
            'bg-[#211c1f] text-white': isDarkMode,
            'bg-white': !isDarkMode,
          },
        )}
      >
        {renderStep(currentStep)}
        <div
          className={classnames('flex items-center rounded-b-[9px] p-4', {
            'bg-[#3b3539]': isDarkMode,
            'bg-gradient-to-b from-[#D3CECE] to-[#CBC3C5]': !isDarkMode,
          })}
        >
          <div className="flex-1">
            <AppButton
              onClick={setupLater}
              className={isDarkMode ? `nearlock btn-gray dark` : `nearlock btn-gray`}
            >
              Setup later
            </AppButton>
          </div>
          <div className="flex flex-1 justify-center">
            {currentStep !== 1 && (
              <div className="flex flex-row items-center">
                {[...Array(2)].map((_, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`dot-${i}`}
                    className={classnames('mx-2 h-2.5 w-2.5 rounded-full border', {
                      'mt-px h-[7px] w-[7px] border-0': currentStep === i + 2,
                      'border-[#4C4C4C]': !isDarkMode,
                      'border-[#808080]': isDarkMode,
                      'bg-[#4C4C4C]': currentStep === i + 2 && !isDarkMode,
                      'bg-[#808080]': currentStep === i + 2 && isDarkMode,
                    })}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-1 justify-end">
            <AppButton
              className="nearlock btn-blue"
              onClick={() =>
                currentStep === 1 ? setStep(2) : currentStep === 2 ? setStep(3) : finishSetup()
              }
            >
              {currentStep === 1 || currentStep === 2 ? 'Continue' : 'Finish'}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
