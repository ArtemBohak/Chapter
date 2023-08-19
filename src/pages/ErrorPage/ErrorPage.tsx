import { FC } from "react";

import { ErrorLayout, ErrorPanel, ErrorImage } from "./components";

const ErrorPage: FC = () => (
  <ErrorLayout>
    <>
      <ErrorImage />
      <ErrorPanel />
    </>
  </ErrorLayout>
);

export default ErrorPage;
