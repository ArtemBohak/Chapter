import { FC } from "react";
import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";
// import api from "@/src/axios/api";
// import { EndpointsEnum } from "@/src/axios/endpoints.types";
// import { UIbutton } from "@/src/components";
// import { Link } from "react-router-dom";

const WelcomePage: FC = () => {
  // async function onHandleLogin() {
  //   const data = await api.post(`${EndpointsEnum.LOGIN}`, {
  //     email: "",
  //     password: "",
  //   });
  //   localStorage.setItem("token", data.data.token);
  //   localStorage.setItem("refreshToken", data.data.refreshToken);
  // }

  return (
    <>
      {/* <div className="mb-10">
        <UIbutton onClick={onHandleLogin} dataAutomation={"button-login"}>
          login
        </UIbutton>
        <div className="relative z-1">
          <Link to="/feed">feed</Link>
        </div>
      </div> */}
      <div className={styles["welcome-page__container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
