import { FC, useState } from "react";
import cn from "classnames";

import { Icon, IconEnum } from "@/src/components/Icon";
import { MenuTogglerProps } from "./MenuToggler.type";
import { UIbutton } from "../Buttons";

import styles from "./MenuToggler.module.scss";

const MenuToggler: FC<MenuTogglerProps> = ({ className, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  function handleClick() {
    const updatedValue = !isActive;
    setIsActive(updatedValue);
    onClick(updatedValue);
  }
  return (
    <UIbutton
      className={cn(styles["menu-toggler"], className)}
      dataAutomation={"admin-header-menu-toggler"}
      onClick={handleClick}
    >
      <Icon icon={isActive ? IconEnum.Cross : IconEnum.Menu} size={40} />
    </UIbutton>
  );
};

export default MenuToggler;
