import { FC } from "react";

import { ErrorLayoutProps } from "./error-layout.type";

import { PublicHeader } from "@/src/layouts/PublicHeader";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <PublicHeader />
    <main>{children}</main>
  </>
);

export default ErrorLayout;
