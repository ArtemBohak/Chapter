import { createContext, useContext } from "react";
import { ModalsTogglerContextType } from "../ModalsProvider.type";

export const ModalsTogglerContext =
  createContext<ModalsTogglerContextType | null>(null);

export const useModalTogglerContext = () => {
  const modalsTogglerContext = useContext(ModalsTogglerContext);

  if (!modalsTogglerContext)
    throw new Error(
      "useModalTogglerContext has to be used within <FeedContext.Provider>"
    );
  return modalsTogglerContext;
};
