import { FC } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";

import { type LogoProps } from "@/src/components/SVGComponents/logo.type";
import logo from "src/assets/SVG/logo.svg";

const Logo: FC<LogoProps> = ({ className, alt }) => {
  return (
    <div className={cn("max-w-[120px]", className)}>
      <NavLink to="/">
        <img className="w-full" src={logo} alt={alt || "logo"} />
      </NavLink>
    </div>
  );
};

export default Logo;
