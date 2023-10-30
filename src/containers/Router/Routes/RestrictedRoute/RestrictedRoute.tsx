import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { getCookies } from "@/src/utils";
import { links } from "@/src/types";

import { IRestrictedRouteProps } from "../types/Routes.type";

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
