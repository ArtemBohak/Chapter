import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { links } from "@/src/utils/links/links.types";

import { PublicHeader } from "./components/PublicHeader";
import { getTokenFromLC } from "@/src/utils";

const PublicLayout: FC = () => {
  if (getTokenFromLC()) {
    return <Navigate to={links.FEED} replace={true} />;
  }

  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
