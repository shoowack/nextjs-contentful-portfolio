import classnames from 'classnames';
import PropTypes from 'prop-types';

const AppButton = ({ children, onClick, className, link, disabled }) => (
  <button
    type="button"
    className={classnames(
      {
        'button-link': link,
      },
      className,
      'button',
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

AppButton.propTypes = {
  link: PropTypes.bool,
  onClick: PropTypes.func,
};

AppButton.defaultProps = {
  link: null,
  onClick: null,
};

export default AppButton;
