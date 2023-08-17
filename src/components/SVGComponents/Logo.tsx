import { FC } from "react";
import cn from "classnames";

import logo from "src/assets/SVG/logo.svg";

type Props = {
  className?: string;
  alt?: string;
};

const Logo: FC<Props> = ({ className, alt }) => {
  return (
    <div className={cn("max-w-[120px] hidden md:block", className)}>
      <img className="w-full" src={logo} alt={alt || "logo"} />
    </div>
  );
};

export default Logo;
