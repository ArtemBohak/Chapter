import { FC, useState } from "react";
import cn from "classnames";

import { useAppSelector } from "@/src/redux";
import { PostCreationProps } from "./PostCreation.type";
import styles from "./PostCreation.module.scss";
import { CreatePostForm, PostPreview } from "./components";
import { Icon, IconEnum, Modal } from "..";

const PostCreation: FC<PostCreationProps> = ({
  setIsOpen,
  isScreenSize = false,
  disableScroll = false,
  ...props
}) => {
  const { nickName, avatarUrl } = useAppSelector(
    (state) => state.userSlice.user
  );
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onHandleCrossClick = () => setIsOpen(false);
  const backDropClassNames = cn(styles["create-post__backdrop"], {
    [styles["create-post__backdrop--page"]]: isScreenSize,
    [styles["create-post__backdrop--profile"]]: !isScreenSize,
  });
  const bodyClassNames = cn(styles["create-post__body"], {
    [styles["create-post__body--profile"]]: !isScreenSize,
    [styles["create-post__body--page"]]: isScreenSize,
  });
  return (
    <Modal
      setIsOpen={setIsOpen}
      backdropClassName={backDropClassNames}
      bodyClassName={bodyClassNames}
      disableScroll={disableScroll}
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
      <div className={styles["create-post__content"]}>
        {formIsOpen ? (
          <CreatePostForm
            image={image}
            title={title}
            text={text}
            setFormIsOpen={setFormIsOpen}
            setFile={setFile}
            setTitle={setTitle}
            setText={setText}
            setImage={setImage}
          />
        ) : (
          <PostPreview
            file={file}
            image={image}
            title={title}
            text={text}
            setFormIsOpen={setFormIsOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </Modal>
  );
};

export default PostCreation;
