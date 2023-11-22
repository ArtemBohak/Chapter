import { FC } from "react";

import { PreviewComponentProps } from "./PreviewComponent.type";
import {
  PostDate,
  PostFullName,
  PostImage,
  PostText,
  PostTitle,
} from "../components";
import { useAppSelector } from "@/src/redux";
import { UIbutton } from "@/src/components";
// import styles from "./PreviewComponent.module.scss";

const PreviewComponent: FC<PreviewComponentProps> = ({
  setFormIsOpen,
  ...props
}) => {
  const { firstName, lastName } = useAppSelector(
    (state) => state.userSlice.user
  );
  const date = Date.now();

  const onHandleBackClick = () => {
    setFormIsOpen(true);
  };
  return (
    <div>
      <div>
        <PostImage {...props} />
      </div>
      <div>
        <PostFullName firstName={firstName} lastName={lastName} />
        <PostDate date={date} />
      </div>
      <div>
        <PostTitle {...props} />
        <PostText {...props} />
      </div>
      <div>
        <UIbutton onClick={onHandleBackClick} dataAutomation="clickButton">
          Back
        </UIbutton>
        <UIbutton dataAutomation="clickButton">Publish</UIbutton>
      </div>
    </div>
  );
};

export default PreviewComponent;
