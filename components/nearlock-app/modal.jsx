import React, {useState, useRef} from "react";
import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";
import AppButton from "./AppButton";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const Modal = ({isModalOpen, setIsModalOpen, isDarkMode}) => {
  const [currentStep, setStep] = useState(1);

  const goBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const finishSetup = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  const renderStep = step => {
    switch (step) {
      case 1:
        return <FirstStep/>;
      case 2:
        return <SecondStep goBack={goBack} isDarkMode={isDarkMode}/>;
      default:
        return <FirstStep/>;
    }
  };

  return (<div className={classnames({
      "d-none": !isModalOpen
    }, styles["nearlock-app-modal__background"])}>
    <div className={classnames({
        [styles["dark-nearlock-app-modal"]]: isDarkMode
      }, styles["nearlock-app-modal"])}>
      {renderStep(currentStep)}
      <div className={classnames({
          [styles["dark-nearlock-app-modal__footer"]]: isDarkMode
        }, `${styles["nearlock-app-modal__footer"]} d-flex justify-content-between`)}>
        <div className={`${styles["nearlock-app__btn-link"]}`} onClick={(
            ) => currentStep === 1
            ? setIsModalOpen(false)
            : goBack()}>
          {
            currentStep === 1
              ? "Setup later"
              : "Go back"
          }
        </div>
        <div>
          <AppButton isDarkMode={isDarkMode} onClick={() => (
              currentStep === 1
              ? setStep(2)
              : finishSetup())}>
            {
              currentStep === 1
                ? "Continue"
                : "Finish"
            }
          </AppButton>
        </div>
      </div>
    </div>
  </div>);
};

export default Modal;
