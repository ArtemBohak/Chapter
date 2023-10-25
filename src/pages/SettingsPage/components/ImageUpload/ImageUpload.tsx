import { FC, FormEvent, useState } from "react";

import { useAppDispatch } from "@/src/redux";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { ImageUploadProps } from "./ImageUpload.type";
import styles from "./ImageUpload.module.scss";

import { Icon, IconEnum } from "@/src/components";

const ImageUpload: FC<ImageUploadProps> = ({ setAvatarUrl, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return;
    const [file] = e.currentTarget.files;

    const profile = new ProfileUpdateApi(dispatch, setIsLoading);

    const res = await profile.imageSave({ file, id });

    setAvatarUrl(res?.eager[0].secure_url);

    await profile.userSave({ avatarUrl: res?.eager[0].secure_url });
  };

  return (
    <label className={styles["image-upload"]}>
      <input
        disabled={isLoading}
        type="file"
        name="avatar"
        className={styles["image-upload__input"]}
        onChange={handleChange}
        accept="image/*"
        data-automation="uploadInput"
      />
      <span
        className={styles["image-upload__button"]}
        data-automation="clickButton"
      >
        <Icon icon={IconEnum.Camera} size={20} /> <span>Upload new photo</span>
      </span>
    </label>
  );
};

export default ImageUpload;
