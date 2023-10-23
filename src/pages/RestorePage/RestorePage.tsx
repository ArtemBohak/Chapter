import { BlockAuth } from "@/src/components";
import { FC, useState } from "react";
import { keyValue } from "@/src/utils";

import RestoreMessage from "./components/RestoreMessage/RestoreMessage";
import RestoreButton from "./components/RestoreButton/RestoreButton";
import RestoringForm from "./components/RestoringForm/RestoringForm";

const RestorePage: FC = () => {
  const [restoringFormIsOpen, setRestoringFormIsOpen] = useState(false);
  const [restoringProvider, setRestoringProvider] = useState<
    keyValue.GOOGLE | keyValue.EMAIL | ""
  >("");
  return (
    <BlockAuth>
      {restoringFormIsOpen ? (
        <RestoringForm restoringProvider={restoringProvider} />
      ) : (
        <>
          <RestoreMessage />
          <RestoreButton
            setRestoringProvider={setRestoringProvider}
            setRestoringFormIsOpen={setRestoringFormIsOpen}
          />
        </>
      )}
    </BlockAuth>
  );
};

export default RestorePage;
