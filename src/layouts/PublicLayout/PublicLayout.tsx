import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { links } from "@/src/types";
import { PublicHeader } from "./components/PublicHeader";
import { CookiesToaster } from "@/src/components/CookiesToaster";

const PublicLayout: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
        {pathname !== links.WELCOME ? <CookiesToaster /> : null}
      </main>
    </>
  );
};

export default PublicLayout;
