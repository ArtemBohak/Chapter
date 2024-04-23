import { FC, useRef, useState } from "react";
import { useErrorBoundary } from "@/src/hooks";
import { Icon, IconEnum } from "../../Icon";
import { AudioRecorderProps } from "./AudioRecorder.type";
import styles from "./AudioRecorder.module.scss";

const mimeType = "audio/webm";

const AudioRecorder: FC<AudioRecorderProps> = ({ iconSize = 20 }) => {
  const setError = useErrorBoundary();
  const mediaRecorder = useRef<null | MediaRecorder>(null);
  const [recordingStatus, setRecordingStatus] = useState<
    "recording" | "inactive" | "paused"
  >("inactive");
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);
  const [audioChunks, setAudioChunks] = useState<Array<Blob>>([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setPermission(true);
      setStream(streamData);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    if (stream) {
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;

      mediaRecorder.current.start();

      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        setAudioChunks((state) => [...state, event.data]);
      };
    }
  };

  const streamHandler = async () => {
    if (!permission) return await getMicrophonePermission();
    console.log(permission);
    console.log(stream);
  };

  return (
    <button className={styles["audio"]} onClick={streamHandler}>
      <Icon size={iconSize} icon={IconEnum.AUDIO} />
    </button>
  );
};

export default AudioRecorder;
