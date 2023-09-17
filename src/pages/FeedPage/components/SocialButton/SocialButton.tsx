import { FC, useState } from "react";
import cn from "classnames";

import { useArrayOfId } from "@/src/hooks";
import { SocialButtonProps } from "./SocialButton.type";

import styles from "./SocialButton.module.scss";

import { Icon, Modal } from "@/src/components";
import ModalWindow from "../ModalWindow/ModalWindow";

const SocialButton: FC<SocialButtonProps> = ({
  userId,
  dataList,
  iconType,
  modalTitle,
  size,
}) => {
  const [clicked] = useArrayOfId(userId, dataList);
  const [isClicked, setIsClicked] = useState(clicked);
  const [isShow, setIsShow] = useState(false);

  const onHandleIconClick = () => {
    setIsClicked(!isClicked);
  };
  const onHandleTextClick = () => {
    setIsShow(!isShow);
  };
  const mainClass = cn(styles["button__icon"], {
    [`${styles["button__icon--normal"]}`]: !isClicked,
    [`${styles["button__icon--clicked"]}`]: isClicked,
  });

  const value = dataList.length;
  return (
    <>
      <div className={styles["social"]}>
        <button
          onClick={onHandleIconClick}
          className={styles["social__button"]}
          data-automation="clickButton"
        >
          <Icon
            className={mainClass}
            icon={iconType}
            size={size}
            removeInlineStyle={true}
            disableFill
          />
        </button>
        <button
          onClick={onHandleTextClick}
          className={styles["social__button"]}
          data-automation="clickButton"
        >
          {value}
        </button>
      </div>
      <Modal isOpen={isShow} setIsOpen={setIsShow}>
        <h5>{modalTitle}</h5>
        <ul>
          {dataList.map((i) => (
            <li key={i.id}>
              <ModalWindow
                avatar={i.avatar}
                id={i.id}
                name={i.name}
                followList={i.followList}
              />
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default SocialButton;
