import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/src/redux/hooks";
import { links } from "@/src/utils";
import { IRoutesProps } from "../types/Routes.type";

import { Loader } from "@/src/components";

const RestrictedRoute: FC<IRoutesProps> = ({
  component: Component,
  redirectUrl = links.FEED,
}) => {
  const { isAuth, loading } = useAppSelector((state) => state.userSlice);

  if (loading) return <Loader />;
  return !isAuth ? Component : <Navigate to={redirectUrl} replace />;
};

export default RestrictedRoute;
