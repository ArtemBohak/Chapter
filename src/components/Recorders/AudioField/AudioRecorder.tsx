import { FC, useRef, useState } from "react";
import { useErrorBoundary } from "@/src/hooks";
import { Icon, IconEnum } from "../../Icon";
import { AudioRecorderProps } from "./AudioRecorder.type";
import styles from "./AudioRecorder.module.scss";

const AudioRecorder: FC<AudioRecorderProps> = ({ iconSize = 20, setAudio }) => {
  const setError = useErrorBoundary();

  const mediaStream = useRef<null | MediaStream>(null);
  const mediaRecorder = useRef<null | MediaRecorder>(null);
  const chunks = useRef<Array<Blob>>([]);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setAudio(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      if (error instanceof Error) setError(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setIsRecording(false);
  };

  return (
    <div className={styles["wrapper"]}>
      <button
        className={styles["audio"]}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      >
        <Icon size={iconSize} icon={IconEnum.AUDIO} />
      </button>
      {isRecording ? <div className={styles["status"]}>Recording</div> : null}
    </div>
  );
};

export default AudioRecorder;
