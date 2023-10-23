import { EndpointsEnum, api } from "@/src/axios";
import { UIbutton } from "@/src/components";
import { getCookie, keyValue } from "@/src/utils";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { RestoreButtonProps } from "./RestoreButton.type";

const RestoreButton: FC<RestoreButtonProps> = ({
  setRestoringProvider,
  setRestoringFormIsOpen,
}) => {
  const email = getCookie(keyValue.RESTORE_EMAIL);
  const token = getCookie(keyValue.RESTORE_TOKEN);

  const [loading, setLoading] = useState(false);

  const onHandleClick = async () => {
    setLoading(true);
    try {
      if (email) {
        await api.post(EndpointsEnum.EMAIL_RESTORE, { email });

        setRestoringProvider(keyValue.EMAIL);
      }

      if (token) {
        await api.post(
          EndpointsEnum.GOOGLE_RESTORE,
          {},
          { headers: { Authorization: "Bearer" + " " + token } }
        );
        setRestoringProvider(keyValue.GOOGLE);
      }
      setRestoringFormIsOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <UIbutton
      isLoading={loading}
      disabled={loading}
      dataAutomation="clickButton"
      onClick={onHandleClick}
    >
      Recover account
    </UIbutton>
  );
};

export default RestoreButton;
