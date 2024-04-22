import { FC } from "react";
import { useSwipe } from "@/src/hooks";

const Chat: FC = () => {
  useSwipe();
  return <div className="absolute top-1/2 left-1/2">Chat</div>;
};

export default Chat;
