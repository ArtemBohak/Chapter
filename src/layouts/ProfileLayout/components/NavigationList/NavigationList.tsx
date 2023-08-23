import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

import { useNavigationToggler } from "@/src/context/NavigationToggler";

import { Icon } from "../../../../components/Icon";
import { NavigationListProps } from "./NavigationList.type";

import "./NavigationList.scss";

const NavigationList: FC<NavigationListProps> = ({ items, className }) => {
  const location = useLocation();
  const { setIsActiveMenu } = useNavigationToggler();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
  }

  return (
    <ul className={cn("navigation-list", className)}>
      {items.map((navItem) => (
        <li key={navItem.id} className="navigation-list__item">
          <NavLink
            to={navItem.path}
            className={cn("navigation-list__link", {
              "current-page": navItem.path === location.pathname,
            })}
            onClick={handleClickNavLink}
          >
            <Icon icon={navItem.icon} className="navigation-list__link-icon" />
            {navItem.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationList;
