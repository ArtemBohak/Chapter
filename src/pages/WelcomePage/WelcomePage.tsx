import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  return (
    <>
      <Logo className="hidden absolute left-[70px] top-[70px] md:hidden w-1/6 max-w-[107px]" />
      <div
        className="flex flex-col items-center md:flex-row-reverse 
      md:justify-between md:h-[100vh] md:w-100vw base:overflow-x-hidden"
      >
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
