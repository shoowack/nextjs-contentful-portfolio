import {useState} from "react";
import classNames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";

const ListItem = ({title, desc, checked}) => {
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
      <svg width="20px" height="30px" viewBox="0 0 35 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient x1="28.1950872%" y1="0%" x2="71.8049128%" y2="100%" id="linearGradient">
            <stop stop-color="#33A2C6" offset="0%"></stop>
            <stop stop-color="#35C591" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="Settings-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Window/App/Cell/Setup/Icons/cell_icon_near_lock" transform="translate(-33.000000, -24.000000)" fill="url(#linearGradient)">
            <path d="M50.5,24 C57.9959756,24 68,29.6447834 68,42.9285714 C68,55.5680187 51.3474695,77 50.5,77 C49.6524593,77 33,55.5744666 33,42.9285714 C33,29.2162487 43.0040244,24 50.5,24 Z M50.5,35.2354802 C46.4469426,35.2354802 43.1612903,38.5524244 43.1612903,42.6440823 C43.1612903,45.1437536 44.3875678,47.3542847 46.2659414,48.6960259 L46.266129,54.2781808 C46.266129,55.7324071 47.4450123,56.9112903 48.8992385,56.9112903 L48.8992385,56.9112903 L52.1007615,56.9112903 C53.5549877,56.9112903 54.733871,55.7324071 54.733871,54.2781808 L54.733871,54.2781808 L54.7340586,48.6960259 C56.6124322,47.3542847 57.8387097,45.1437536 57.8387097,42.6440823 C57.8387097,38.5524244 54.5530574,35.2354802 50.5,35.2354802 Z"/>
          </g>
        </g>
      </svg>
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
