import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { IRestrictedRouteProps } from "../types/Routes.type";
import { getCookie, links } from "@/src/utils";

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
  checkingKey,
  checkingById = false,
}) => {
  const { userId } = useParams();
  if (
    checkingById &&
    getCookie(checkingKey) &&
    getCookie(checkingKey) === userId
  )
    return Component;

  if (!checkingById && getCookie(checkingKey)) return Component;

  return <Navigate to={redirectUrl} replace />;
};

export default RestrictedRoute;
