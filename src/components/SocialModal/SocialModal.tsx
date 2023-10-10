import { FC } from "react";

import { SocialModalProps } from "./SocialModal.type";
import styles from "./SocialModal.module.scss";

import { Icon, IconEnum } from "@/src/components";
import Item from "./Item/Item";

const SocialModal: FC<SocialModalProps> = ({ title, data, setIsOpen }) => {
  return (
    <>
      <div className={styles["title"]}>
        <h5>{title}</h5>
        <button data-automation="clickButton" onClick={() => setIsOpen(false)}>
          <Icon icon={IconEnum.Cross} size={24} />
        </button>
      </div>
      <ul className={styles["list"]}>
        {data.map((i) => (
          <li key={i.id} className={styles["item"]}>
            <Item
              avatar={i.avatar}
              name={i.name}
              id={i.id}
              dataList={i.dataList}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SocialModal;
