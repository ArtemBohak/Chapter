import { createContext, useContext } from "react";
import { ProfileContextType } from "../ProfileProvider.type";

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfileContext = () => {
  const profileContext = useContext(ProfileContext);

  if (!profileContext)
    throw new Error(
      "useProfileContext has to be used within <ProfileContext.Provider>"
    );
  return profileContext;
};
