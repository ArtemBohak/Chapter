import { ChangeEvent, FC } from "react";
import cn from "classnames";

import { ImageFieldProps } from "./ImageField.type";
import styles from "./ImageField.module.scss";

import { Icon, IconEnum } from "../..";

const ImageField: FC<ImageFieldProps> = ({
  setFile,
  setImage,
  btnVariant,
  iconSize = 20,
  classNames,
  isLoading,
  error,
}) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return;
    const [file] = e.currentTarget.files;
    setFile(file);
    setImage && setImage(URL.createObjectURL(file));

    e.target.value = "";
  };
  const imageClassNames = cn(
    styles["image"],
    {
      [styles["image__button"]]: btnVariant === "button",
    },
    classNames
  );
  const btnClassNames = cn({
    [styles["button"]]: btnVariant === "button",
    [styles["icon"]]: btnVariant === "icon",
  });

  return (
    <label className={imageClassNames}>
      <input
        disabled={isLoading}
        type="file"
        name="image"
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
        {btnVariant === "book" ? (
          <Icon icon={IconEnum.PlusInCircle} size={34} />
        ) : null}
      </span>
      {error ? <span className={styles["error"]}>{error}</span> : null}
    </label>
  );
};

export default ImageField;
