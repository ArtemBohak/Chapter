import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "@/src/redux/hooks";
import { links } from "@/src/utils";
import { IRoutesProps } from "../types/Routes.type";

import { Loader } from "@/src/components";

const PublicRoute: FC<IRoutesProps> = ({
  component: Component,
  redirectUrl = links.FEED,
}) => {
  const { isAuth, loading } = useAppSelector((state) => state.userSlice);
  const location = useLocation();
  const url = location.state ? location.state : redirectUrl;

  if (loading) return <Loader />;

  return !isAuth ? Component : <Navigate to={url} replace />;
};

export default PublicRoute;
