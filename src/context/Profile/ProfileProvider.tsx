import { FC, useEffect, useState } from "react";
import { socket } from "@/src/socket";

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
  const [isConnected, setIsConnected] = useState(false);

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
    socket.connect();
    const onConnect = () => {
      console.log("connected", socket.connected);
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("disconnected", socket.disconnected);
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onHandleSubscribe = (e) => {
      console.log(e);
    };

    if (isConnected) {
      console.log("con");
      socket.on("subscribeNotification", onHandleSubscribe);
    }

    return () => {
      socket.off("subscribeNotification", onHandleSubscribe);
    };
  }, [isConnected]);

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
