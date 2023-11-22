import { FC, useState } from "react";

import { PostCreationProps } from "./PostCreation.type";
import { Icon, IconEnum, Modal } from "..";
import styles from "./PostCreation.module.scss";
import { useAppSelector } from "@/src/redux";
import { CreatePostForm, PostPreview } from "./components";

const PostCreation: FC<PostCreationProps> = ({ setIsOpen, ...props }) => {
  const { nickName, avatarUrl } = useAppSelector(
    (state) => state.userSlice.user
  );
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const onHandleCrossClick = () => setIsOpen(false);

  return (
    <Modal
      setIsOpen={setIsOpen}
      backdropClassName={styles["create-post__backdrop"]}
      bodyClassName={styles["create-post__modal"]}
      disableScroll
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
        {formIsOpen ? (
          <CreatePostForm
            image={image}
            title={title}
            text={text}
            setFormIsOpen={setFormIsOpen}
            setTitle={setTitle}
            setText={setText}
            setImage={setImage}
          />
        ) : (
          <PostPreview
            image={image}
            title={title}
            text={text}
            setFormIsOpen={setFormIsOpen}
          />
        )}
      </div>
    </Modal>
  );
};

export default PostCreation;
