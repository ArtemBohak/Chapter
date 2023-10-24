import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { IRestrictedRouteProps } from "../types/Routes.type";
import { getCookies, links } from "@/src/utils";

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
  checkingKey,
  checkingById = false,
}) => {
  const { userId } = useParams();
  const [result] = getCookies(checkingKey);

  if (checkingById && result && result === userId) return Component;

  if (!checkingById && result) return Component;

  return <Navigate to={redirectUrl} replace />;
};

export default RestrictedRoute;
