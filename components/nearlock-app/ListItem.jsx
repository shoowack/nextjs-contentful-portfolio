import {useState} from "react";
import classNames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";

const ListItem = ({icon, title, desc, checked}) => {
  const [isChecked, setIsChecked] = useState(
    checked
    ? true
    : false);

  return (<div className={`${styles["list-item"]} d-flex py-2 mx-2 px-2`} onClick={() => {
      setIsChecked(prev => !prev);
    }}>
    <div className={classNames({
        [styles["list-item__icon_checked"]]: isChecked
      }, `${styles["list-item__icon"]} d-flex justify-content-center align-items-center`)}>
      <img src={icon
          ?.src} alt=""/>
    </div>
    <div className="d-flex flex-column justify-content-center ml-3">
      <div className={styles["list-item__title"]}>{title}</div>
      {
        desc && (<div className={styles["list-item__desc"]}>
          <small>{desc}</small>
        </div>)
      }
    </div>
  </div>);
};

export default ListItem;
