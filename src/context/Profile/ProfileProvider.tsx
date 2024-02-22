import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import toast from "react-hot-toast";

import { ProfileContext } from "./hooks";
import { NotificationType } from "@/src/types/app/notifications.type";
import { IProfileProviderProps } from "./ProfileProvider.type";
// import { Toast } from "@/src/components";

// const tempData = [
//   {
//     id: 0,
//     avatarUrl: null,
//     firstName: "Mattew",
//     lastName: "Downroy",
//     messageValue: "New post",
//   },
// ];

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);
  const [notifications, setNotifications] = useState<Array<NotificationType>>(
    []
  );

  const [unreadMessage, setUnreadMessage] = useState<boolean>(
    !!notifications.length
  );

  // useEffect(() => {
  //   setNotifications(tempData);

  //   toast.custom((t) => (
  //     <Toast
  //       avatarUrl={tempData[0].avatarUrl}
  //       id={tempData[0].id}
  //       firstName={tempData[0].firstName}
  //       lastName={tempData[0].lastName}
  //       toastId={t.id}
  //       messageValue={tempData[0].messageValue}
  //     />
  //   ));
  // }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);
    console.log(socket);
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
