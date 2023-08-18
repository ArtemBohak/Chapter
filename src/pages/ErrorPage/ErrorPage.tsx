import { FC } from "react";

import { Page404, ErrorLayout } from "./components";

const ErrorPage: FC = () => {
  return (
    <ErrorLayout>
      <Page404 />
    </ErrorLayout>
  );
};

export default ErrorPage;
