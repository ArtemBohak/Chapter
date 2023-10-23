import { UIbutton } from "@/src/components";
import { deleteCookie, keyValue, links } from "@/src/utils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const RestoreGoogle: FC = () => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    deleteCookie(
      keyValue.DELETED_ACCOUNT_TIME_STAMP,
      keyValue.RESTORE_EMAIL,
      keyValue.RESTORE_TOKEN
    );
    navigate(links.LOG_IN);
  };
  return (
    <>
      <h3>Your profile has been successfully restored!</h3>
      <UIbutton onClick={onHandleClick} dataAutomation="clickButton">
        Proceed to log in
      </UIbutton>
    </>
  );
};

export default RestoreGoogle;
