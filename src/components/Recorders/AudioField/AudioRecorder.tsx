import { FC } from "react";
import { Icon, IconEnum } from "../../Icon";
import { AudioRecorderProps } from "./AudioRecorder.type";
import styles from "./AudioRecorder.module.scss";

const AudioRecorder: FC<AudioRecorderProps> = ({ iconSize = 20 }) => {
  return (
    <div className={styles["audio"]}>
      <Icon size={iconSize} icon={IconEnum.AUDIO} />
    </div>
  );
};

export default AudioRecorder;
