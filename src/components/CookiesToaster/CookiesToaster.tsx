import { FC, useState } from "react";

import styles from "./CookiesToaster.module.scss";

import { Icon, IconEnum } from "..";
import CookiesImage from "@/src/assets/WEBP/CookiesGirl.webp";

const CookiesToaster: FC = () => {
  const [toasterHide, setToasterHide] = useState(
    JSON.parse(localStorage.getItem("cookieAccept") || "false")
  );

  const cookieAccept = () => {
    localStorage.setItem("cookieAccept", JSON.stringify(true));
    setToasterHide(true);
  };
  return (
    <div hidden={toasterHide} className={styles["cookie-toaster__wrapper"]}>
      <div className={styles["info-block"]}>
        <h5 className={styles["info-block__title"]}>
          This website uses cookies
        </h5>
        <p className={styles["info-block__text"]}>
          We use cookies to make sure this website can function. By continuing
          to browse on this website, you agree to our use of cookies.
        </p>

        <button onClick={cookieAccept} className={styles["info-block__accept"]}>
          <p>Continue to website</p>
          <Icon width={20} height={20} icon={IconEnum.ArrowRight} />
        </button>
      </div>
      <div className={styles["image-block"]}>
        <img src={CookiesImage} alt="" />
      </div>
    </div>
  );
};

export default CookiesToaster;
