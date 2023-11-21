import { ChangeEvent, FC, useState } from "react";
import cn from "classnames";

import { ImageInputProps } from "./ImageInput.type";
import { FilesService } from "@/src/services";
import { apiUiMessage } from "@/src/types";
import styles from "./ImageInput.module.scss";
import { Icon, IconEnum } from "..";

const avatarParams = {
  alt: "user avatar",
  height: 640,
  width: 640,
  radius: 50,
};

const ImageInput: FC<ImageInputProps> = ({
  profileUpdateApi,
  id,
  btnVariant,
  iconSize = 20,
  imageType,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAvatar = imageType === "avatar";
  const params = isAvatar ? avatarParams : {};

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setIsLoading(true);
      if (!e.currentTarget.files?.length) return;

      const [file] = e.currentTarget.files;

      const res = await new FilesService(id, file, isAvatar).upload(params);

      if (res.code) return setError(apiUiMessage.ERROR_MESSAGE);

      profileUpdateApi &&
        (await new profileUpdateApi().userSave({
          avatarUrl: res?.eager[0].secure_url,
        }));
    } finally {
      e.target.value = "";
      setIsLoading(false);
    }
  };

  const classNames = cn({
    [styles["image__button"]]: btnVariant === "button",
    [styles["image__icon-btn"]]: btnVariant === "icon",
  });

  return (
    <label className={styles["image"]}>
      <input
        disabled={isLoading}
        type="file"
        name={imageType}
        className={styles["image__input"]}
        onChange={handleChange}
        accept="image/*"
        data-automation="uploadInput"
      />
      <span className={classNames} data-automation="clickButton">
        {btnVariant === "button" ? (
          <>
            <Icon icon={IconEnum.Camera} size={iconSize} />
            <span>Upload new photo</span>
          </>
        ) : null}
        {btnVariant === "icon" ? (
          <Icon icon={IconEnum.Image} size={iconSize} />
        ) : null}
      </span>
      {error ? <span className={styles["error"]}>{error}</span> : null}
    </label>
  );
};

export default ImageInput;
