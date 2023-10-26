import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

import { useNavigationToggler } from "@/src/context";
import { useAppDispatch, fetchIsLogoutUser } from "@/src/redux";

import { NavigationListProps } from "./NavigationList.type";
import "./NavigationList.scss";

import { Icon, IconEnum } from "../../../../components/Icon";

const NavigationList: FC<NavigationListProps> = ({
  items,
  className,
  isBottom = false,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { setIsActiveMenu } = useNavigationToggler();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
  }
  const handleBtnClick = async () => {
    dispatch(fetchIsLogoutUser());
  };

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
      {isBottom && (
        <li className="navigation-list__item">
          <button
            onClick={handleBtnClick}
            className="navigation-list__link navigation-list__button"
          >
            <Icon
              icon={IconEnum.SignOut}
              className="navigation-list__link-icon"
            />
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavigationList;
