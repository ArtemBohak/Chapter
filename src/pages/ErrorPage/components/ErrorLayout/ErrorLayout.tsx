import { FC } from "react";

import { ErrorLayoutProps } from "./ErrorLayout.type";

import { PublicHeader } from "@/src/layouts/PublicLayout/components/PublicHeader";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <PublicHeader />
    <main>{children}</main>
  </>
);

export default ErrorLayout;
