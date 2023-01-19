import React, { useState } from 'react';
import { Col } from 'reactstrap';
import classnames from 'classnames';
import AppButton from './AppButton';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const Modal = ({ isModalOpen, setIsModalOpen, isDarkMode, setActiveTab, setIsSetupDone }) => {
  const [currentStep, setStep] = useState(1);

  const goBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const finishSetup = () => {
    setIsModalOpen(false);
    setStep(1);
    setActiveTab('Devices');
    setIsSetupDone(true);
  };

  const setupLater = () => {
    setIsModalOpen(false);
    setStep(1);
    setActiveTab('Devices');
    setIsSetupDone(false);
  };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <FirstStep />;
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
      className={classnames(
        {
          'd-none': !isModalOpen,
        },
        'modal__background',
      )}
    >
      <div className="modal">
        {renderStep(currentStep)}
        <div className="modal__footer d-flex justify-content-between align-items-center">
          <Col>
            <AppButton onClick={setupLater} link>
              Setup later
            </AppButton>
          </Col>
          <Col className="d-flex justify-content-center">
            {currentStep !== 1 && (
              <div className="d-flex align-items-center flex-row">
                {[...Array(2)].map((_, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`dot-${i}`}
                    className={classnames(
                      {
                        active: currentStep === i + 2,
                      },
                      'modal__footer_dot mx-2',
                    )}
                  />
                ))}
              </div>
            )}
          </Col>
          <Col className="d-flex justify-content-end">
            <AppButton
              onClick={() =>
                currentStep === 1 ? setStep(2) : currentStep === 2 ? setStep(3) : finishSetup()
              }
            >
              {currentStep === 1 || currentStep === 2 ? 'Continue' : 'Finish'}
            </AppButton>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Modal;
