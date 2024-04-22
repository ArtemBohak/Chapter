import { useSwipe } from "@/src/hooks";
import { FC } from "react";

const Chat: FC = () => {
  useSwipe();
  return <div className="absolute top-1/2 left-1/2">Chat</div>;
};

export default Chat;
