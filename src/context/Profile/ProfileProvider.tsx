import { FC, useEffect, useState } from "react";
// import toast from "react-hot-toast";

import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { NotificationType } from "@/src/types/app/notifications.type";
import { ProfileContext } from "./hooks";
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

const socket = new SocketApi(getTokenFromLC() + "");

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
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    if (getTokenFromLC()) socket.connect();

    socket.addListener("connect", onConnect);
    socket.addListener("disconnect", onDisconnect);

    return () => {
      socket.removeListener("connect", onConnect);
      socket.removeListener("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onHandleSubscribe = (e: string) => {
      console.log(e);
    };

    if (isConnected) {
      socket.addListener<string>("subscribeNotification", onHandleSubscribe);
    }

    return () => {
      socket.removeListener<string>("subscribeNotification", onHandleSubscribe);
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
