import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { IRestrictedRouteProps } from "../types/Routes.type";
import { getCookie, getDataFromLS, links } from "@/src/utils";

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
  checkingKey,
}) => {
  const { userId } = useParams();

  if (
    getDataFromLS(checkingKey) ||
    (getCookie(checkingKey) && getCookie(checkingKey) === userId)
  )
    return Component;

  return <Navigate to={redirectUrl && redirectUrl} replace />;
};

export default RestrictedRoute;
