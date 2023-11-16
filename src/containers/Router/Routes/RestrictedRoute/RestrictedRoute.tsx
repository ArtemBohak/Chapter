import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";

import { getCookies } from "@/src/utils";
import { links } from "@/src/types";

import { IRestrictedRouteProps } from "../types/Routes.type";
import { useAppSelector } from "@/src/redux";

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectUrl = links.LOG_IN,
  checkingKey,
  checkingById = false,
}) => {
  const { userId } = useParams();
  const { id } = useAppSelector((state) => state.userSlice.user);
  const [result] = getCookies(checkingKey);

  if (checkingById && `${id}` === userId) return Component;

  if (!checkingById && result) return Component;

  return <Navigate to={redirectUrl} replace />;
};

export default RestrictedRoute;
