import { FC, useState } from "react";

import { PostCreationProps } from "./PostCreation.type";
import { Icon, IconEnum, Modal } from "..";
import styles from "./PostCreation.module.scss";
import { useAppSelector } from "@/src/redux";
import { CreatePostForm } from "./components";

const PostCreation: FC<PostCreationProps> = ({ setIsOpen, ...props }) => {
  const { nickName, avatarUrl } = useAppSelector(
    (state) => state.userSlice.user
  );
  const [isForm, setIsForm] = useState(true);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const onHandleCrossClick = () => setIsOpen(false);
  return (
    <Modal
      setIsOpen={setIsOpen}
      backdropClassName={styles["create-post__backdrop"]}
      bodyClassName={styles["create-post__modal"]}
      {...props}
    >
      <div className={styles["create-post__header"]}>
        <div className={styles["create-post__header-content"]}>
          <img src={avatarUrl} alt="user avatar" width="44" height="44" />
          <p>{nickName}</p>
        </div>
        <button onClick={onHandleCrossClick}>
          <Icon icon={IconEnum.Cross} size={32} />
        </button>
      </div>
      <div className={styles["create-post__body"]}>
        {isForm ? (
          <CreatePostForm
            setTitle={setTitle}
            setComment={setComment}
            image={image}
            setImage={setImage}
            setIsForm={setIsForm}
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default PostCreation;
