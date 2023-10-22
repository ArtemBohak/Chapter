import { BlockAuth } from "@/src/components";
import { FC } from "react";
import RestoreMessage from "./components/RestoreMessage/RestoreMessage";

const RestorePage: FC = () => {
  return (
    <BlockAuth>
      <RestoreMessage />
    </BlockAuth>
  );
};

export default RestorePage;
