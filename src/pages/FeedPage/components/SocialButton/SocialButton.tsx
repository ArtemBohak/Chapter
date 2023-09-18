import { FC, useState } from "react";
import cn from "classnames";

import { useArrayOfId } from "@/src/hooks";
import { SocialButtonProps } from "./SocialButton.type";

import styles from "./SocialButton.module.scss";

import { Icon, Modal } from "@/src/components";

import List from "../Modal/List";

const SocialButton: FC<SocialButtonProps> = ({
  userId,
  data,
  iconType,
  modalTitle,
  size,
}) => {
  const [clicked] = useArrayOfId(userId, data);
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

  const value = data.length ? data.length + 1 : data.length;

  const renderModal =
    isShow && value ? (
      <Modal
        setIsOpen={setIsShow}
        backdropClassName={styles["modal"]}
        bodyClassName={styles["modal__body"]}
      >
        <List setIsOpen={setIsShow} title={modalTitle} data={data} />
      </Modal>
    ) : null;

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
      {renderModal}
    </>
  );
};

export default SocialButton;
