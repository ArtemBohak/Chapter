import { createContext, useContext } from "react";
import { GuestContextType } from "../GuestProvider.type";


export const GuestContext = createContext<GuestContextType | null>(null);

export const useGuestContext = () => {
  const guestContext = useContext(GuestContext);

  if (!guestContext)
    throw new Error(
      "useFeedContext has to be used within <FeedContext.Provider>"
    );
  return guestContext;
};