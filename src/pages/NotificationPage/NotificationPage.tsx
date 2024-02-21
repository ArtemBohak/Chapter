import { useProfileContext } from "@/src/context";
import { FC } from "react";

const NotificationPage: FC = () => {
  const { setUnreadMessage } = useProfileContext();
  console.log(setUnreadMessage);

  return (
    <div>
      <p>NOTIFICATION</p>
    </div>
  );
};

export default NotificationPage;
