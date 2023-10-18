import { FC, FormEvent, useState } from "react";

import FilesService from "@/src/services/image/Files";
import { useAppSelector } from "@/src/redux/hooks";
import styles from "./ImageUpload.module.scss";
import { ImageUploadProps } from "./ImageUpload.type";

import { Icon, IconEnum } from "@/src/components";

const ImageUpload: FC<ImageUploadProps> = ({ setAvatarUrl }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      if (!e.currentTarget.files?.length) return;
      const [file] = e.currentTarget.files;

      const res = await FilesService.upload({
        file,
        id: user.id + 1 + "",
        avatar: true,
        alt: "user avatar",
        height: 640,
        width: 640,
        radius: 50,
      });

      setAvatarUrl(res?.eager[0].secure_url);
    } finally {
      setIsLoading(false);
    }
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
      <button
        className={styles["image-upload__button"]}
        data-automation="clickButton"
      >
        <Icon icon={IconEnum.Camera} size={20} /> <span>Upload new photo</span>
      </button>
    </label>
  );
};

export default ImageUpload;
