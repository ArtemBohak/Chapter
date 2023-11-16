import { FC } from "react";
import { Outlet } from "react-router-dom";

import { PublicHeader } from "./components/PublicHeader";
import { CookiesToaster } from "@/src/components/CookiesToaster";

const PublicLayout: FC = () => (
  <>
    <PublicHeader />
    <main>
      <Outlet />
      <CookiesToaster />
    </main>
  </>
);

export default PublicLayout;
