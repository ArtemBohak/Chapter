import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "@/src/redux";
import { links } from "@/src/types";
import { IRoutesProps } from "../types/Routes.type";
import { ModalsProvider } from "@/src/context/ModalsToggler";

const PrivateRoute: FC<IRoutesProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
}) => {
  const { pathname } = useLocation();

  const { isAuth } = useAppSelector((state) => state.userSlice);

  return (
    <ModalsProvider>
      {isAuth ? (
        Component
      ) : (
        <Navigate to={redirectUrl} state={pathname} replace />
      )}
    </ModalsProvider>
  );
};

export default PrivateRoute;
