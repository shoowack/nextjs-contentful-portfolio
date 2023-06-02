import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';

const ThirdStep = () => {
  return (
    <div className="flex grow flex-col items-center justify-center px-5">
      <div className="mb-12 mt-6">
        <img src="./third-step.png" alt="" className="h-[130px]" />
      </div>
      <h5>You got it! Cool, isn’t it?</h5>
      <small>Good time to share?</small>
      <div className="mt-3 flex flex-row">
        <FaTwitterSquare className="mr-1 inline h-8 w-8 text-[#1da1f2]" />
        <FaFacebookSquare className="ml-1 inline h-8 w-8 text-[#1877f2]" />
      </div>
    </div>
  );
};

export default ThirdStep;