import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ProfileContext } from "./hooks";
import { NotificationType } from "@/src/types/app/notifications.type";
import { IProfileProviderProps } from "./ProfileProvider.type";
import { Toast } from "@/src/components";

const tempData = [
  {
    id: 0,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "New post",
  },
];

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);
  const [notifications, setNotifications] = useState<Array<NotificationType>>(
    []
  );

  const [unreadMessage, setUnreadMessage] = useState<boolean>(
    !!notifications.length
  );

  useEffect(() => {
    notifications.map((el) =>
      toast.custom((t) => <Toast {...el} toastId={t.id} />)
    );
  }, [notifications]);

  useEffect(() => {
    setNotifications(tempData);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        unreadMessage,
        notifications,
        setHeaderAddPostBtnIsDisabled,
        setUnreadMessage,
        setNotifications,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
