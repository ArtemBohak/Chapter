import { FC, useState } from "react";
import { ModalsTogglerContext } from "./hooks";
import { IModalsProviderProps } from "./ModalsProvider.type";

const ModalProvider: FC<IModalsProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  return (
    <ModalsTogglerContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        setHeaderAddPostBtnIsDisabled,
      }}
    >
      {children}
    </ModalsTogglerContext.Provider>
  );
};

export default ModalProvider;
