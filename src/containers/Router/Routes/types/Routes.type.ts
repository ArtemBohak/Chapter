import { ReactElement } from "react";

export interface IRoutesProps {
  component: ReactElement;
  redirectUrl?: string;
}

export interface IRestrictedRouteProps extends IRoutesProps {
  checkingKey: string;
}
