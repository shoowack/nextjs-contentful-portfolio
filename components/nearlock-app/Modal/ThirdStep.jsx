import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const ThirdStep = () => {
  return (
    <div className="flex grow flex-col items-center justify-center px-5">
      <div className="mt-6 mb-12">
        <img src="./third-step.png" alt="" className="h-[130px]" />
      </div>
      <h5>You got it! Cool, isn’t it?</h5>
      <small>Good time to share?</small>
      <div className="mt-3 flex flex-row">
        <FontAwesomeIcon icon={faTwitterSquare} size="2x" className="mr-2" color="#1da1f2" />
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="ml-2" color="#1877f2" />
      </div>
    </div>
  );
};

export default ThirdStep;
