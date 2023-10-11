import { FC } from "react";
import { Navigate } from "react-router-dom";

import { RoutesProps } from "../types/Routes.type";
import { useAppSelector } from "@/src/redux/hooks";
import { links } from "@/src/utils";

const PrivateRoute: FC<RoutesProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
}) => {
  const { isAuth } = useAppSelector((state) => state.userSlice);

  return isAuth ? Component : <Navigate to={redirectUrl} replace />;
};

export default PrivateRoute;