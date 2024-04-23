import { FC } from "react";
import { Icon, IconEnum } from "../../Icon";
import { AudioFieldProps } from "./AudioField.type";
import styles from "./AudioFiedl.module.scss";

const AudioField: FC<AudioFieldProps> = ({ iconSize = 20 }) => {
  return (
    <div className={styles["audio"]}>
      <Icon size={iconSize} icon={IconEnum.AUDIO} />
    </div>
  );
};

export default AudioField;
