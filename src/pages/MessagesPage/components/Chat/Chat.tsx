import { FC } from "react";
import { useSwipe } from "@/src/hooks";
import { ChatProps } from "./Chat.type";

const Chat: FC<ChatProps> = ({ setCurrentChat }) => {
  useSwipe({ leftSwipeCB: () => setCurrentChat(null), enableSwipe: true });
  return <div className="absolute top-1/2 left-1/2">Chat </div>;
};

export default Chat;
