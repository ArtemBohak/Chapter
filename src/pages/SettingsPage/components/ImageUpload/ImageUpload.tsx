import { UIbutton } from "@/src/components";
import { FC } from "react";

import styles from "./ImageUpload.module.scss";

const ImageUpload: FC = () => {
  const handleChange = (e) => {
    console.log(e.currentTarget);
  };
  return (
    <label>
      <input
        type="file"
        name="avatar"
        className={styles["input"]}
        onChange={handleChange}
      />
      Upload new photo
    </label>
  );
};

export default ImageUpload;
