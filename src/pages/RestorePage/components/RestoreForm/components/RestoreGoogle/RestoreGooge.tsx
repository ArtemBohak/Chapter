import { UIbutton } from "@/src/components";
import { deleteCookie, keyValue, links } from "@/src/utils";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestoreGoogle: FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     deleteCookie(
  //       keyValue.DELETED_ACCOUNT_TIME_STAMP,
  //       keyValue.RESTORE_EMAIL,
  //       keyValue.RESTORE_TOKEN
  //     );
  //     navigate(links.LOG_IN);
  //   }, 1000 * 60);

  //   return () => clearTimeout(t);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
