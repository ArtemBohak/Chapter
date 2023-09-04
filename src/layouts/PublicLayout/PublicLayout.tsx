import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { PublicHeader } from "./components/PublicHeader";
import { getTokenFromLC } from "@/src/utils/localstorage";

const PublicLayout: FC = () => {
  if (getTokenFromLC()) {
    return <Navigate to="/feed" replace={true} />;
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
