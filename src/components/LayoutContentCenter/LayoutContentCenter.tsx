import { FC } from "react";
import cn from "classnames";

import Logo from "@/src/components/SVGComponents/Logo";

type Props = {
  className?: string;
  children: React.ReactNode;
  heading?: string;
};

const LayoutContentCenter: FC<Props> = ({ className, heading, children }) => {
  return (
    <div
      className={cn(
        "bg-gray-1070 text-black-1000 min-h-screen flex flex-col",
        className
      )}
    >
      <Logo />
      <section className="flex-1 flex py-20 md:py-6">
        <div className="max-w-xl w-full mx-auto flex flex-col justify-center px-6">
          {heading && (
            <h1 className="text-center font-semibold mb-5 leading-none text-2xl md:text-4xl">
              {heading}
            </h1>
          )}
          <div className="max-w-xs w-full mx-auto">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default LayoutContentCenter;
