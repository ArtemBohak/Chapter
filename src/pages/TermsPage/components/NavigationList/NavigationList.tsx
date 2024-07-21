import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";

import { useNavigationToggler } from "@/src/context";
import { links } from "@/src/types";
import { useModal } from "@/src/hooks";
import { NavigationListProps } from "./NavigationList.type";

import "./NavigationList.scss";
import { ContactUs, Icon, IconEnum } from "@/src/components";

const NavigationList: FC<NavigationListProps> = ({
  items,
  className,
  isBottom = false,
}) => {
  const modalProps = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsActiveMenu } = useNavigationToggler();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
  }

  return (
    <>
      <ul className={cn("navigation-list", className)}>
        {isBottom && (
          <li className="navigation-list__item contact-us">
            <button
              className="navigation-list__link navigation-list__button"
              aria-label="Open modal button"
              onClick={() => modalProps.setActive(true)}
            >
              <Icon
                icon={IconEnum.EditBook}
                className="navigation-list__link-icon"
              />
              Contact us
            </button>
          </li>
        )}
        {items.map((navItem) => (
          <li key={navItem.id} className="navigation-list__item">
            <NavLink
              to={navItem.path}
              aria-label="Menu nav link"
              className={cn("navigation-list__link", {
                "current-page": navItem.path === location.pathname,
              })}
              onClick={handleClickNavLink}
            >
              {navItem.icon ? (
                <Icon
                  icon={navItem.icon}
                  className="navigation-list__link-icon"
                />
              ) : null}
              {navItem.name}
            </NavLink>
          </li>
        ))}
        {isBottom && (
          <li className="navigation-list__item">
            <button
              onClick={() => navigate(links.HOME)}
              className="navigation-list__link navigation-list__button"
              aria-label="nav button"
            >
              <Icon
                icon={IconEnum.ArrowBack}
                className="navigation-list__link-icon navigation-list__custom-icon"
                removeInlineStyle
              />
              Back
            </button>
          </li>
        )}
      </ul>
      <ContactUs {...modalProps} />
    </>
  );
};

export default NavigationList;
