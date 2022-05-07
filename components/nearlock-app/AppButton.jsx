import classnames from "classnames";
import PropTypes from "prop-types";

const AppButton = ({children, onClick, className, link}) => (<button className={classnames({
    ["button-link"]: link
  }, className, "button")} onClick={onClick}>
  {children}
</button>);

AppButton.propTypes = {
  link: PropTypes.bool,
  onClick: PropTypes.func
};

export default AppButton;