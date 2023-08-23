import { FC, useState, useEffect } from "react";
import cn from "classnames";

import { Icon, IconEnum } from "@/src/components";
import { MenuTogglerProps } from "./MenuToggler.type";
import { UIbutton } from "../Buttons";

import "./MenuToggler.scss";

const MenuToggler: FC<MenuTogglerProps> = ({
  isActive = false,
  className,
  onClick,
}) => {
  const [activeState, setActiveState] = useState<boolean>(false);

  useEffect(() => {
    setActiveState(isActive);
  }, [isActive]);

  function handleClick() {
    const updatedValue = !activeState;
    setActiveState(updatedValue);
    onClick(updatedValue);
  }

  return (
    <UIbutton
      className={cn("menu-toggler", className)}
      dataAutomation={"profiile-header-menu-toggler"}
      onClick={handleClick}
      variant="text"
    >
      <Icon
        icon={activeState ? IconEnum.Cross : IconEnum.Menu}
        className="menu-toggler__icon"
        color="#000000"
      />
    </UIbutton>
  );
};

export default MenuToggler;
