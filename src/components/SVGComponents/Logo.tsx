import { FC } from "react";
import cn from "classnames";

import { type LogoProps } from "@/src/components/SVGComponents/logo.type";
import logo from "src/assets/SVG/logo.svg";

const Logo: FC<LogoProps> = ({ className, alt, isHidden = true }) => {
  return (
    <div
      className={cn("max-w-[120px] md:block", isHidden && "hidden", className)}
    >
      <img className="w-full" src={logo} alt={alt || "logo"} />
    </div>
  );
};

export default Logo;
