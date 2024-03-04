import { FC, useRef, useState } from "react";

import { useGetScreenSize, useOutsideClick } from "@/src/hooks";
import { FilterButtonProps } from "./FilterButton.type";
import { tabScreen } from "@/src/utils";
import styles from "./FilterButton.module.scss";
import { Animation, Icon, IconEnum, PopUpMenu } from "@/src/components";

const filterBtnClassNames = `${styles["button"]} ${styles["filter"]}`;

const filterValue = { latest: "Latest comments", all: "All comments" };

const FilterButton: FC<FilterButtonProps> = ({
  showAllComments,
  commentsIsHide,
  transitionClassNames,
  setShowAllComments,
}) => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const nodeRef = useRef(null);
  const popupRef = useRef(null);

  useOutsideClick(popupRef, setShowFilterPopup, "filter-btn");

  const [screenSize] = useGetScreenSize();
  const isMobScreen = screenSize < tabScreen ? 16 : 26;

  const onHandleButtonClick = () => setShowFilterPopup(!showFilterPopup);

  const onHandlePopupButtonClick = async () => {
    setShowAllComments(!showAllComments);
    setShowFilterPopup(false);
  };

  const iconClassName = `${styles["filter-icon"]} ${
    showFilterPopup ? styles["icon"] : ""
  }`;

  return (
    <Animation
      in={!commentsIsHide}
      nodeRef={nodeRef}
      classNames={transitionClassNames}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles["wrapper"]}>
        <button
          data-automation="clickButton"
          className={filterBtnClassNames}
          ref={nodeRef}
          id="filter-btn"
          onClick={onHandleButtonClick}
        >
          {showAllComments ? filterValue.all : filterValue.latest}
          <Icon
            className={iconClassName}
            icon={IconEnum.Back}
            size={isMobScreen}
          />
        </button>
        <PopUpMenu
          nodeRef={popupRef}
          isOpen={showFilterPopup}
          setIsOpen={setShowFilterPopup}
          backdropClassName={styles["popup"]}
          bodyClassName={styles["popup__body"]}
          contentWrapperClassNames={styles["popup__content"]}
        >
          <button
            data-automation="clickButton"
            onClick={onHandlePopupButtonClick}
          >
            {showAllComments ? filterValue.latest : filterValue.all}
          </button>
        </PopUpMenu>
      </div>
    </Animation>
  );
};

export default FilterButton;
