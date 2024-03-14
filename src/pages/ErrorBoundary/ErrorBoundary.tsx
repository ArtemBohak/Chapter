import { FC } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { links } from "@/src/types";
import styles from "./ErrorBoundary.module.scss";
import { ErrorLayout } from "@/src/layouts";
import { UIbutton } from "@/src/components";

const ErrorBoundary: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (!isRouteErrorResponse(error))
    return (
      <ErrorLayout>
        <section className={styles["error"]}>
          <div className={styles["wrapper"]}>
            <h2 className={`${styles["error__title"]} ${styles["title"]}`}>
              Oh no! Something went wrong!
            </h2>
            <div className={styles["error__button"]}>
              <UIbutton
                dataAutomation="clickButton"
                fullWidth
                onClick={() => navigate(links.HOME)}
                className={`${styles["error__button"]} ${styles["button"]}`}
              >
                Go to home page
              </UIbutton>
            </div>
          </div>
        </section>
      </ErrorLayout>
    );

  return null;
};

export default ErrorBoundary;
