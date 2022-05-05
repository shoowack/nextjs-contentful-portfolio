import React, {useState} from "react";
import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";
import AppButton from "./AppButton";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const Modal = ({isModalOpen, setIsModalOpen, isDarkMode, setActiveTab, setIsSetupDone}) => {
  const [currentStep, setStep] = useState(1);

  const goBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const finishSetup = () => {
    setIsModalOpen(false);
    setStep(1);
    setActiveTab("Devices");
    setIsSetupDone(true);
  };

  const renderStep = step => {
    switch (step) {
      case 1:
        return <FirstStep/>;
      case 2:
        return <SecondStep goBack={goBack} isDarkMode={isDarkMode}/>;
      case 3:
        return <ThirdStep goBack={goBack} isDarkMode={isDarkMode}/>;
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
        <AppButton onClick={finishSetup} link={true} isDarkMode={isDarkMode}>
          Setup later
        </AppButton>
        {
          currentStep !== 1 && (<div className="d-flex flex-row align-items-center">
            {
              [...Array(2)].map((_, i) => (<div key={`dot-${i}`} className={"mx-2"} style={{
                  height: currentStep === i + 2
                    ? "10px"
                    : "7px",
                  width: currentStep === i + 2
                    ? "10px"
                    : "7px",
                  background: currentStep === i + 2
                    ? "transparent"
                    : "#4C4C4C",
                  borderRadius: "999em",
                  border: currentStep === i + 2
                    ? "1px solid #4C4C4C"
                    : "none"
                }}></div>))
            }
          </div>)
        }
        <div className="d-flex">
          {
            currentStep === 3 && (<AppButton onClick={goBack} link={true}>
              Go back
            </AppButton>)
          }
          <AppButton isDarkMode={isDarkMode} onClick={(
              ) => currentStep === 1
              ? setStep(2)
              : currentStep === 2
                ? setStep(3)
                : finishSetup()}>
            {
              currentStep === 1 || currentStep === 2
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
