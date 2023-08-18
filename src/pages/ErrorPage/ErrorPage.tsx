import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorLayout, ErrorPanel, ErrorImage } from "./components";
import { UIbutton } from "@/src/components";

import styles from "./ErrorPage.module.scss";

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <>
        <ErrorImage />
        <div className={styles["error-content"]}>
          <ErrorPanel />
          <UIbutton
            onClick={() => navigate("/")}
            dataAutomation="clickButton"
            className={styles["error-content__button"]}
          >
            Go to home page
          </UIbutton>
        </div>
      </>
    </ErrorLayout>
  );
};

export default ErrorPage;
