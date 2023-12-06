import { FC } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorBoundary: FC = () => {
  const error = useRouteError();
  console.log(error);

  if (!isRouteErrorResponse(error))
    return (
      <>
        <h1>Something wrong!!!</h1>
        <Link to={"/"}>HOME</Link>
      </>
    );
};

export default ErrorBoundary;
