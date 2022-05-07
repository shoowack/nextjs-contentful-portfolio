import {useState} from "react";
import classNames from "classnames";

const ListItem = ({icon, title, desc, checked, newBadge}) => {
  const [isChecked, setIsChecked] = useState(
    checked
    ? true
    : false);

  return (<div className="list-item d-flex py-2 mx-2 px-2" onClick={() => {
      setIsChecked(prev => !prev);
    }}>
    {newBadge && <div className="list-item__icon_new-badge">New</div>}
    <div className={classNames({
        ["checked"]: isChecked
      }, "list-item__icon d-flex justify-content-center align-items-center")}>
      <img src={icon
          ?.src} alt=""/>
    </div>
    <div className="d-flex flex-column justify-content-center ml-3">
      <div className="list-item__title">{title}</div>
      {
        desc && (<div className="list-item__desc">
          <small>{desc}</small>
        </div>)
      }
    </div>
  </div>);
};

export default ListItem;
