import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { SelectMenuProps } from "./SelectMenu.type";
import styles from "./SelectMenu.module.scss";

const SelectMenu: FC<SelectMenuProps> = ({
  menuIsOpen,
  filteredList,
  transitionTimeOut = 200,
  handleSelect,
}) => {
  const menuRef = useRef(null);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };
  return (
    <CSSTransition
      in={menuIsOpen}
      nodeRef={menuRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <span className={styles["strop-down-menu"]}>
        <span ref={menuRef} className={styles["strop-down-menu-container"]}>
          {filteredList.map(({ id, name, emoji }) => (
            <button
              type="button"
              key={id}
              value={id}
              data-automation="clickButton"
              onClick={handleSelect}
            >
              {emoji ? <span>{emoji}</span> : null}
              <span>{name}</span>
            </button>
          ))}
        </span>
      </span>
    </CSSTransition>
  );
};

export default SelectMenu;
