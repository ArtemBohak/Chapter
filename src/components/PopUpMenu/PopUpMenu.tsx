import { FC } from "react";
import { IPopUpMenuProps } from "./PopUpMenu.type";

import { Modal } from "..";

const PopUpMenu: FC<IPopUpMenuProps> = ({
  children,
  nodeRef,
  contentWrapperClassNames,
  ...props
}) => {
  return (
    <Modal {...props}>
      <div className={contentWrapperClassNames} ref={nodeRef}>
        {children}
      </div>
    </Modal>
  );
};

export default PopUpMenu;
