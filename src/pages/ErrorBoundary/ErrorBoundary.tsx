import { ErrorLayout } from "@/src/layouts";
import { FC } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

// import styles from "./ErrorBoundary.module.scss";

const ErrorBoundary: FC = () => {
  const error = useRouteError();

  if (!isRouteErrorResponse(error))
    return (
      <ErrorLayout>
        <section>
          <h1>Something wrong!!!</h1>
          <Link to={"/"}>HOME</Link>
        </section>
      </ErrorLayout>
    );
};

export default ErrorBoundary;
