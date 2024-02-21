import { FC, useState } from "react";
import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);
  const [unreadMessage, setUnreadMessage] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        unreadMessage,
        setHeaderAddPostBtnIsDisabled,
        setUnreadMessage,

      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
