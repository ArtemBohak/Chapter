import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UIbutton } from "@/src/components";

const Page404: FC = () => {
  const navigate = useNavigate();

  const onHandleClick = () => navigate("/");
  return (
    <>
      <UIbutton
        onClick={onHandleClick}
        dataAutomation="clickButton"
        className="sm:max-w-[326px] md:max-w-[329px] sm:h-[41px] md:h-[65px]"
      >
        Go to home page
      </UIbutton>
    </>
  );
};

export default Page404;
