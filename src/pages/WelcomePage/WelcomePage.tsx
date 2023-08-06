import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  return (
    <>
      <Logo />
      <div className="flex flex-col md:flex-row-reverse md:justify-between">
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
