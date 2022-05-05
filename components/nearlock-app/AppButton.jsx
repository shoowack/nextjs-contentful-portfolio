import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";

const AppButton = ({children, onClick, isDarkMode, className}) => (<button className={classnames({
    [styles["dark-nearlock-app__btn"]]: isDarkMode
  }, `${styles["nearlock-app__btn"]} ${className}`)} onClick={onClick}>
  {children}
</button>);

export default AppButton;