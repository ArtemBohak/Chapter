import { FC, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

import { useNavigationToggler, useProfileContext } from "@/src/context";
import { UiMessage } from "@/src/types";
import { useAppDispatch, fetchIsLogoutUser } from "@/src/redux";
import { useModal } from "@/src/hooks";

import { NavigationListProps } from "./NavigationList.type";
import "./NavigationList.scss";

import { ConfirmationWindow, ContactUs } from "@/src/components";
import { Icon, IconEnum } from "../../../../components/Icon";

const NavigationList: FC<NavigationListProps> = ({
  items,
  className,
  isBottom = false,
  setModalIsOpen,
}) => {
  const modalProps = useModal();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { setIsActiveMenu } = useNavigationToggler();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalIsShown, setConfirmModalIsShown] = useState(false);

  const { unreadMessage } = useProfileContext();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
    setModalIsOpen(false);
  }
  const logOut = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchIsLogoutUser());
    } finally {
      setIsLoading(false);
    }
  };

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
        {isBottom && (
          <li className="navigation-list__item">
            <button
              onClick={() => {
                setConfirmModalIsShown(true);
              }}
              className="navigation-list__link navigation-list__button"
              aria-label="Open modal button"
            >
              <Icon
                icon={IconEnum.SignOut}
                className="navigation-list__link-icon"
              />
              Log out
            </button>
          </li>
        )}
      </ul>
      <ConfirmationWindow
        isOpen={confirmModalIsShown}
        setIsOpen={setConfirmModalIsShown}
        text={UiMessage.LOG_OUT}
        isLoading={isLoading}
        fetch={logOut}
      />
      <ContactUs {...modalProps} />
    </>
  );
};

export default NavigationList;
