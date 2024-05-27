import { PostCreationProps } from "./PostCreation.type";
import { FC } from "react";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux";
import cn from "classnames";
import styles from "./PostCreation.module.scss";

import { CreatePostForm, PostPreview } from "./components";
import { Icon, IconEnum, Modal } from "..";
import { changeFile, changeImage, changeTitle, changeCaption, resetPostValues } from "@/src/redux/slices/post";

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
  const {title, image, file, caption} = useAppSelector(
    state => state.postsSlice
  )
  const dispatch = useAppDispatch()

  const [formIsOpen, setFormIsOpen] = useState(true);

  const clearData = () => {
    setTimeout(() => {
      setFormIsOpen(true);
    }, 100);
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
      portal
      isOpen={isOpen}
      {...props}
    >
      <div className={styles["create-post__header"]}>
        <div className={styles["create-post__header-content"]}>
          <img src={avatarUrl} alt="user avatar" width="44" height="44" />
          <p>{nickName}</p>
        </div>
        <button onClick={onHandleCrossClick} className={styles["cross-btn"]}>
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
            setFile={(value) => dispatch(changeFile(value))}
            setTitle={(value) => dispatch(changeTitle(value))}
            setCaption={(value) => dispatch(changeCaption(value))}
            setImage={(value) => dispatch(changeImage(value))}
          />
        ) : (
          <PostPreview
            file={file}
            imgUrl={image}
            title={title}
            caption={caption}
            setFormIsOpen={setFormIsOpen}
            resetPostValues={() => dispatch(resetPostValues())}
            setIsOpen={setIsOpen}
            {...props}
          />
        )}
      </div>
    </Modal>
  );
};

export default PostCreation;
