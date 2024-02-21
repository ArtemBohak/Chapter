import { FC, useState } from "react";
import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  return (
    <ProfileContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        setHeaderAddPostBtnIsDisabled,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
