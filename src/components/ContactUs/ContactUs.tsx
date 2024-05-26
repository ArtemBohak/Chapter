import { FC } from "react";
import cn from "classnames";
import { ContactUsProps } from "./ContactUs.type";
import styles from "./ContactUs.module.scss";
import { CustomModal } from "../Modals";
import { Icon, IconEnum } from "../Icon";
import { outerLinks } from "@/src/types";

const ContactUs: FC<ContactUsProps> = ({
  title = "Select a social network to contact us",
  ...props
}) => {
  const menuClassNames = cn(styles["menu"], {
    [styles["active"]]: props.visible,
  });
  return (
    <CustomModal classNames={styles["backdrop"]} {...props}>
      <div className={menuClassNames}>
        <button className={styles["close-btn"]} onClick={() => props.close()}>
          <Icon size={32} icon={IconEnum.Cross} />
        </button>
        <h2 className={styles["title"]}>{title}</h2>
        <ul className={styles["links"]}>
          <li className={styles["links__item"]}>
            <a
              href={outerLinks.TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.TelegramLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href={outerLinks.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.LinkedinLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href={outerLinks.GMAIL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.GoogleLink}
              />
            </a>
          </li>
          {/* <li className={styles["links__item"]}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.FacebookLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.WhatsappLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.DiscordLink}
              />
            </a>
          </li> */}

        </ul>
      </div>
    </CustomModal>
  );
};

export default ContactUs;
