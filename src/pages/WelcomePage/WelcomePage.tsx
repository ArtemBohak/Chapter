import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchUserById } from "@/src/redux/slices/user";
import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  const { id, firstName, lastname } = useAppSelector(
    (state) => state.userSlice.user
  );

  const dispatch = useAppDispatch();
  dispatch(fetchUserById(1));

  return (
    <>
      <div className={styles["welcome-page__container"]}>
        <h1>{id}</h1>
        <h1>{firstName}</h1>
        <h1>{lastname}</h1>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
