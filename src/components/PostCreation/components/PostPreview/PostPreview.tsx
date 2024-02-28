import { FC, useState } from "react";
import { AxiosError } from "axios";

import { useAppSelector } from "@/src/redux";
import { FilesService } from "@/src/services";
import { apiUiMessage } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";
import { PostPreviewProps, BodyProps } from "./PostPreview.type";
import styles from "./PostPreview.module.scss";

import {
  UIbutton,
  PostDate,
  PostFullName,
  PostImage,
  PostText,
  PostTitle,
} from "@/src/components";

const PostPreview: FC<PostPreviewProps> = ({
  setFormIsOpen,
  setIsOpen,
  file,
  ...props
}) => {
  const { firstName, lastName, id } = useAppSelector(
    (state) => state.userSlice.user
  );
  const setErrorBoundary = useErrorBoundary();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      if (props.title) body.title = props.title;

      if (file) {
        const files = new FilesService(id, file, undefined, setErrorBoundary);
        const res = await files.upload({
          overwrite: true,
          transform: "c_auto,g_auto/d_chapter:placeholders:post.webp",
        });

        if (res.code) {
          return setError(apiUiMessage.ERROR_MESSAGE);
        }

        body.imgUrl = res?.eager[0].secure_url;

        props.prevImgUrl && files.delete(props.prevImgUrl);
      }

      if (props.caption) body.caption = props.caption;

      await api.post(EndpointsEnum.CREATE_POST, body);

      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorBoundary(error);
        setError(apiUiMessage.ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
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

export default PostPreview;
