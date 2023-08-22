import { FC } from "react";
import { Outlet } from "react-router-dom";

import { PublicHeader } from "./components/PublicHeader";

const PublicLayout: FC = () => {
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
