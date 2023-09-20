import { FC, useState } from "react";
import cn from "classnames";

import { useFindById } from "@/src/hooks";
import { SocialButtonProps, Title } from "./SocialButton.type";
import { Data } from "./SocialButton.type";
import styles from "./SocialButton.module.scss";

import { Icon, Modal } from "@/src/components";
import List from "./Modal/List";

//
import userImage from "../FeedsList/assets/user.png";
const likesList = [
  { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
  {
    id: "3",
    name: "Alex Space",
    avatar: userImage,
    followList: ["1", "2"],
  },
  { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
  { id: "5", name: "Alex Space", avatar: userImage, followList: ["2"] },
  { id: "6", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "7", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "8", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "9", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "10", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "11", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "12", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "13", name: "Alex Space", avatar: userImage, followList: ["1"] },
  { id: "14", name: "Alex Space", avatar: userImage, followList: ["1"] },
];

const sharesList: Data = [];

const commentsList: Data = [];

//

const SocialButton: FC<SocialButtonProps> = ({
  userId,
  postId,
  total,
  clickedData,
  iconType,
  title,
  size,
}) => {
  const [clicked] = useFindById(userId, clickedData);
  const [isClicked, setIsClicked] = useState(clicked);
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState<Data>([]);

  const onHandleIconClick = () => {
    console.log(postId);
    setIsClicked(!isClicked);
  };

  const onHandleTextClick = () => {
    console.log(postId);
    if (title === Title.LIKES) setData(likesList);
    if (title === Title.COMMENTS) setData(commentsList);
    if (title === Title.SHARED) setData(sharesList);
    setIsShow(true);
  };

  const mainBtnClass = cn(styles["button__icon"], {
    [`${styles["button__icon--normal"]}`]: !isClicked,
    [`${styles["button__icon--clicked"]}`]: isClicked,
  });

  const transition = {
    enter: styles["modal-enter"],
    enterActive: styles["modal-enter-active"],
    exit: styles["modal-exit"],
    exitActive: styles["modal-exit-active"],
  };

  return (
    <>
      <div className={styles["social"]}>
        <button
          onClick={onHandleIconClick}
          className={styles["social__button"]}
          data-automation="clickButton"
        >
          <Icon
            className={mainBtnClass}
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
          {total}
        </button>
      </div>
      <Modal
        isOpen={isShow && !!data.length}
        setIsOpen={setIsShow}
        backdropClassName={styles["modal"]}
        bodyClassName={styles["modal__body"]}
        transitionTimeOut={300}
        transitionClassName={transition}
      >
        <List setIsOpen={setIsShow} title={title} data={data} />
      </Modal>
    </>
  );
};

export default SocialButton;
