import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";
import PropTypes from "prop-types";

const AppButton = ({children, onClick, isDarkMode, className, link}) => (<button className={classnames(
    {
    [styles["dark-nearlock-app__btn"]]: isDarkMode,
    [styles["nearlock-app__btn-link"]]: link,
    [styles["dark-nearlock-app__btn-link"]]: link && isDarkMode
  }, `${className
    ? className
    : ""} ${styles["nearlock-app__btn"]}`)} onClick={onClick}>
  {children}
</button>);

AppButton.propTypes = {
  link: PropTypes.bool,
  onClick: PropTypes.func,
  isDarkMode: PropTypes.bool.isRequired
};

export default AppButton;