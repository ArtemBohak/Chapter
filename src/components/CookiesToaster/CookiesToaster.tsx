import { FC, useEffect, useState } from "react";
import CookiesImage from "@/src/assets/WEBP/CookiesGirl.webp";
import styles from "./CookiesToaster.module.scss";
import { Icon, IconEnum } from "..";

const CookiesToaster: FC = () => {
  const [toasterHide, setToasterHide] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem("CookieAccept");
    return () => {
      if (acceptedCookies === "1") {
        setToasterHide(true);
      }
    };
  }, []);

  const CookieAccept = () => {
    localStorage.setItem("CookieAccept", "1");
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

        <div onClick={CookieAccept} className={styles["info-block__accept"]}>
          <p>Continue to website</p>
          <Icon width={20} height={20} icon={IconEnum.ArrowRight} />
        </div>
      </div>
      <div className={styles["image-block"]}>
        <img src={CookiesImage} alt="" />
      </div>
    </div>
  );
};

export default CookiesToaster;
