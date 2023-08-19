import { FC } from "react";

import { PublicHeader } from "@/src/layouts/PublicHeader";

import { ErrorLayoutProps } from "./error-layout.type";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <PublicHeader />
    <main>{children}</main>
  </>
);

export default ErrorLayout;
