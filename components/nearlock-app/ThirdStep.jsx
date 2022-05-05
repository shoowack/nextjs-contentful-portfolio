import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitterSquare, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";

const ThirdStep = () => {
  return (<div className="d-flex flex-row px-5 justify-content-center">
    <div className={`d-flex flex-column py-5 text-center align-items-center`}>
      <div className="mt-4 mb-5">
        <img src="./third-step.png" alt="" height="130px" style={{}}/>
      </div>
      <h5>You got it! Cool, isn’t it?</h5>
      <small>Good time to share?</small>
      <div className="d-flex flex-row mt-3">
        <FontAwesomeIcon icon={faTwitterSquare} size="2x" className="mr-2" color="#1da1f2"/>
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="ml-2" color="#1877f2"/>
      </div>
    </div>
  </div>);
};

export default ThirdStep;