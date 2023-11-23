import { ChangeEvent, FC, useState } from "react";
import cn from "classnames";

import { ProfileUpdateApi } from "@/src/pages/SettingsPage/utils/ProfileUpdateApi";
import { ImageFieldProps } from "./ImageField.type";
import styles from "./ImageField.module.scss";

import { Icon, IconEnum } from "../..";

const ImageField: FC<ImageFieldProps> = ({
  setImage,
  setFile,
  id = 0,
  btnVariant,
  imageType,
  iconSize = 20,
  classNames,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAvatar = imageType === "avatar";

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.files?.length) return;
      const [file] = e.currentTarget.files;
      setFile && setFile(file);
      setImage && setImage(URL.createObjectURL(file));

      if (isAvatar)
        await new ProfileUpdateApi(setIsLoading, setError).imageSave(id, file);
    } finally {
      e.target.value = "";
    }
  };
  const imageClassNames = cn(
    styles["image"],
    {
      [styles["image-icon-btn"]]: btnVariant === "button",
    },
    classNames
  );
  const btnClassNames = cn({
    [styles["image__button"]]: btnVariant === "button",
    [styles["image__icon-btn"]]: btnVariant === "icon",
  });

  return (
    <label className={imageClassNames}>
      <input
        disabled={isLoading}
        type="file"
        name={imageType}
        className={styles["image__input"]}
        onChange={handleChange}
        accept="image/*"
        data-automation="uploadInput"
      />
      <span className={btnClassNames} data-automation="clickButton">
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

export default ImageField;
