import classnames from 'classnames';
import PropTypes from 'prop-types';

const AppButton = ({ children, onClick, className, disabled }) => (
  <button
    type="button"
    className={classnames(
      'button rounded-md py-0.5 px-5 text-[13px] [transition:background_0.5s,color_0.5s]',
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

AppButton.propTypes = {
  onClick: PropTypes.func,
};

AppButton.defaultProps = {
  onClick: null,
};

export default AppButton;
