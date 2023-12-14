import { FC, useState } from "react";
import { ModalsContext } from "./hooks";
import { IModalsProviderProps } from "./ModalsProvider.type";

const ModalsProvider: FC<IModalsProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  return (
    <ModalsContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        setHeaderAddPostBtnIsDisabled,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;
