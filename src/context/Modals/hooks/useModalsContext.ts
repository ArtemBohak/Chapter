import { createContext, useContext } from "react";
import { ModalsContextType } from "../ModalsProvider.type";

export const ModalsContext = createContext<ModalsContextType | null>(null);

export const useModalsContext = () => {
  const modalsContext = useContext(ModalsContext);

  if (!modalsContext)
    throw new Error(
      "useModalsTogglerContext has to be used within <FeedContext.Provider>"
    );
  return modalsContext;
};
