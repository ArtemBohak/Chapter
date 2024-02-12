import { FC, useEffect, useState } from "react";
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
  isOpen,
  ...props
}) => {
  const { nickName, avatarUrl } = useAppSelector(
    (state) => state.userSlice.user
  );
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const clearData = () => {
    setTitle("");
    setFile(null);
    setCaption("");
    setImage("");
    setFormIsOpen(true);
  };

  const onHandleCrossClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    !isOpen && clearData();
  }, [isOpen]);

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
      isOpen={isOpen}
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
            imgUrl={image}
            title={title}
            caption={caption}
            setFormIsOpen={setFormIsOpen}
            setFile={setFile}
            setTitle={setTitle}
            setCaption={setCaption}
            setImage={setImage}
          />
        ) : (
          <PostPreview
            file={file}
            imgUrl={image}
            title={title}
            caption={caption}
            setFormIsOpen={setFormIsOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </Modal>
  );
};

export default PostCreation;
