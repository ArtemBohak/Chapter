import { FC, useState } from "react";
import { AxiosError } from "axios";

import { useAppSelector } from "@/src/redux";
import { FilesService } from "@/src/services";
import { apiUiMessage } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";
import { PostPreviewProps, BodyProps } from "./EditedPostPreview.type";
import styles from "./EditedPostPreview.module.scss";

import {
  UIbutton,
  PostDate,
  PostFullName,
  PostImage,
  PostText,
  PostTitle,
} from "@/src/components";
import { useProfileContext } from "@/src/context";

const EditedPostPreview: FC<PostPreviewProps> = ({
  setFormIsOpen,
  setIsOpen,
  file,
  postId,
  ...props
}) => {
  const { firstName, lastName, id } = useAppSelector(
    (state) => state.userSlice.user
  );
  const setErrorBoundary = useErrorBoundary();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserPosts } = useProfileContext();
  const createAt = Date.now();

  const onHandleBackClick = () => {
    setFormIsOpen(true);
  };

  const onHandlePublishClick = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const body: BodyProps = {
        createAt,
      };

      const files = new FilesService(id, setErrorBoundary);
      if (props.title) body.title = props.title;

      if (props.prevImgUrl && (file || !props.imgUrl)) {
        files.delete(props.prevImgUrl);
        body.imgUrl = null;
      }
      if (file) {
        const res = await files.upload(file, {
          overwrite: true,
          transform:
            "c_auto,g_auto/f_auto,q_auto:eco/d_chapter:placeholders:post.webp",
        });
        if (res.code) return setError(apiUiMessage.ERROR_MESSAGE);

        body.imgUrl = res?.eager[0].secure_url;
      }

      if (props.caption) body.caption = props.caption;

      await api.patch(`${EndpointsEnum.EDIT_POST}${postId}`, body);

      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorBoundary(error);
        setError(apiUiMessage.ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
      fetchUserPosts(1);
    }
  };
  return (
    <div className={styles["preview"]}>
      <div className={styles["preview__image-wrapper"]}>
        <PostImage {...props} />
      </div>
      <div className={styles["preview__meta-wrapper"]}>
        <PostFullName firstName={firstName} lastName={lastName} />
        <PostDate createAt={createAt} />
      </div>
      <div className={styles["preview__title-wrapper"]}>
        <PostTitle {...props} />
      </div>
      <PostText {...props} />
      <div className={styles["preview__buttons-wrapper"]}>
        <UIbutton
          onClick={onHandleBackClick}
          dataAutomation="clickButton"
          fullWidth
          variant="outlined"
        >
          Back
        </UIbutton>
        <UIbutton
          disabled={isLoading}
          onClick={onHandlePublishClick}
          dataAutomation="clickButton"
          fullWidth
        >
          Publish
        </UIbutton>
      </div>
      {error ? <p className={styles["preview__error"]}>{error}</p> : null}
    </div>
  );
};

export default EditedPostPreview;
