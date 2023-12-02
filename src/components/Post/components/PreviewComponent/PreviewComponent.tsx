import { FC, useState } from "react";
import { AxiosError } from "axios";

import { BodyProps, PreviewComponentProps } from "./PreviewComponent.type";

import { useAppSelector } from "@/src/redux";
import { FilesService } from "@/src/services";
import { apiUiMessage } from "@/src/types";

import { EndpointsEnum, api } from "@/src/axios";
import styles from "./PreviewComponent.module.scss";

import {
  PostDate,
  PostFullName,
  PostImage,
  PostText,
  PostTitle,
} from "../components";
import { UIbutton } from "@/src/components";

const PreviewComponent: FC<PreviewComponentProps> = ({
  setFormIsOpen,
  setIsOpen,
  clearData,
  file,
  ...props
}) => {
  const { firstName, lastName, id } = useAppSelector(
    (state) => state.userSlice.user
  );

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const date = Date.now();

  const onHandleBackClick = () => {
    setFormIsOpen(true);
  };

  const onHandlePublishClick = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const body: BodyProps = {
        title: props.title,
        text: props.text,
        date,
      };

      if (file) {
        const res = await new FilesService(id, file).upload({
          overwrite: false,
        });
        if (res.code) return setError(apiUiMessage.ERROR_MESSAGE);
        body.imageUrl = res.secure_url;
      }

      await api.post(EndpointsEnum.CREATE_POST, body);

      setIsOpen(false);
      clearData && clearData();
    } catch (error) {
      if (error instanceof AxiosError) setError(error.message);
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
        <PostDate date={date} />
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

export default PreviewComponent;
