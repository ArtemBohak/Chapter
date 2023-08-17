import { FC } from "react";

import PublicHeader from "@/src/layouts/PublicHeader/PublicHeader";

type Props = {
  children: React.ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
