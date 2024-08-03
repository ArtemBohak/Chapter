import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

import { useNavigationToggler, useProfileContext } from "@/src/context";

import { NavigationListProps } from "./NavigationList.type";
import "./NavigationList.scss";

import { Icon } from "../../../../components/Icon";

const NavigationList: FC<NavigationListProps> = ({
  items,
  className,
  setModalIsOpen,
}) => {
  const location = useLocation();
  const { setIsActiveMenu } = useNavigationToggler();

  const { unreadMessage } = useProfileContext();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
    setModalIsOpen(false);
  }

  return (
    <>
      <ul className={cn("navigation-list", className)}>
        {items.map((navItem) => (
          <li key={navItem.id} className="navigation-list__item">
            <NavLink
              to={navItem.path}
              aria-label="Menu nav link"
              className={cn("navigation-list__link", {
                "current-page": navItem.path === location.pathname,
                "unread-message":
                  navItem.name === "Notification" && unreadMessage > 0,
              })}
              onClick={handleClickNavLink}
            >
              <Icon
                icon={navItem.icon}
                className="navigation-list__link-icon"
              />
              {navItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavigationList;
