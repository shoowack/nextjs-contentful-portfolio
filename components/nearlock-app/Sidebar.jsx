import classnames from "classnames";
import styles from "./../../styles/nearlock-app.module.scss";

const Sidebar = ({
  isDarkMode,
  isSidebarOpen,
  menuItems,
  activeTab,
  toggleTab,
  isSetupDone
}) => (<div className={classnames({
    [styles["nearlock-app-sidebar-open"]]: isSidebarOpen
  }, styles["nearlock-app-sidebar"])}>
  <div className={styles["nearlock-app-sidebar-header-controls"]}>
    {Array.from({length: 3}).map((_, i) => (<div key={`nearlock-app-sidebar-header-controls__item-${i}`} className={styles["nearlock-app-sidebar-header-controls__item"]}/>))}
  </div>
  <div className={`${
    styles["nearlock-app-sidebar-content"]} pt-5 pb-2 d-flex flex-column h-100 justify-content-between`}>
    <div>
      {/* <div className={`${styles["nearlock-app-sidebar-header"]} mb-3`}>
        <input className={`${styles["nearlock-app-sidebar-search"]} mt-3 w-100`} placeholder="Search"/>
      </div> */
      }
      {
        menuItems.map(
          ({
          title,
          enabled
        }, i) => enabled
          ? (<a key={`nearlock-app-sidebar__item-${i}`} className={classnames({
              [styles["dark-nearlock-app-sidebar__item"]]: isDarkMode,
              [styles["nearlock-app-sidebar__item__active"]]: activeTab === title
            }, `d-flex align-items-center ${styles["nearlock-app-sidebar__item"]}`)} onClick={() => {
              toggleTab(title);
            }}>
            <img src={`/nearlock-app/menu/${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
            {title}
          </a>)
          : (<div key={`nearlock-app-sidebar__item-${i}`} className={classnames({
              [styles["dark-nearlock-app-sidebar__item__disabled"]]: isDarkMode
            }, `${styles["nearlock-app-sidebar__item__disabled"]} m-0 d-flex align-items-center`)}>
            <img src={`/nearlock-app/menu/${title.toLowerCase().split(" ").join("-")}.svg`} height="17px" className="mr-2 ml-1"/>{" "}
            {title}
          </div>))
      }
    </div>
    <div>
      {
        isSetupDone && (<span style={{
            cursor: "default !important"
          }} className={classnames({
            [styles["dark-nearlock-app-sidebar__item"]]: isDarkMode
          }, `d-flex align-items-center ${styles["nearlock-app-sidebar__item"]}`)}>
          <img src={`/nearlock-app/menu/iphone.svg`} height="17px" className="mr-2 ml-1"/>{" "}
          Ivan&apos;s iPhone{" "}
          <div className={`${
            styles["nearlock-app-sidebar__connected-dot"]} ml-auto`}/>
        </span>)
      }
    </div>
  </div>
</div>);

export default Sidebar;
