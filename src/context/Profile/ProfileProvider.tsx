import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ProfileContext } from "./hooks";
import {
  IProfileProviderProps,
  NotificationType,
} from "./ProfileProvider.type";
import { Toast } from "@/src/components";

const tempData = [
  {
    id: 0,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "New post",
  },
  {
    id: 1,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "Subscribed to you",
  },
  {
    id: 2,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "Your post was liked",
  },
  {
    id: 3,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "There is a new comment on your post",
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
      toast.custom((t) => <Toast {...el} toastId={t.id} />, {
        duration: Infinity,
      })
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
