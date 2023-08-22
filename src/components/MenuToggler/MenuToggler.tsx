import { FC, useState } from "react";
import cn from "classnames";

import { Icon, IconEnum } from "@/src/components";
import { MenuTogglerProps } from "./MenuToggler.type";
import { UIbutton } from "../Buttons";

import "./MenuToggler.scss";

const MenuToggler: FC<MenuTogglerProps> = ({ className, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  function handleClick() {
    const updatedValue = !isActive;
    setIsActive(updatedValue);
    onClick(updatedValue);
  }
  return (
    <UIbutton
      className={cn("menu-toggler", className)}
      dataAutomation={"profiile-header-menu-toggler"}
      onClick={handleClick}
    >
      <Icon
        icon={isActive ? IconEnum.Cross : IconEnum.Menu}
        className="menu-toggler__icon"
      />
    </UIbutton>
  );
};

export default MenuToggler;
