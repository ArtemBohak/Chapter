import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { IRoutesProps } from "../types/Routes.type";
import { useAppSelector } from "@/src/redux/hooks";
import { links } from "@/src/utils";

const PrivateRoute: FC<IRoutesProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
}) => {
  const { pathname } = useLocation();

  const { isAuth } = useAppSelector((state) => state.userSlice);

  return isAuth ? (
    Component
  ) : (
    <Navigate to={redirectUrl} state={pathname} replace />
  );
};

export default PrivateRoute;
