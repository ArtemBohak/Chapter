import { FC } from "react";

import logo from "src/assets/SVG/logo.svg";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => {
  return (
    <span
      className={
        className ||
        "hidden absolute left-[70px] top-[70px] md:hidden w-1/6 max-w-[107px]"
      }
    >
      <img className="w-full" src={logo} alt="chapter-logo" />
    </span>
  );
};

export default Logo;
