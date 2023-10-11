import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/src/redux/hooks";
import { links } from "@/src/utils";
import { RoutesProps } from "../types/Routes.type";

const RestrictedRoute: FC<RoutesProps> = ({
  component: Component,
  redirectUrl = links.FEED,
}) => {
  const { isAuth, loading } = useAppSelector((state) => state.userSlice);
  if (loading) return <>Loading...</>;
  return !isAuth ? Component : <Navigate to={redirectUrl} replace />;
};

export default RestrictedRoute;
