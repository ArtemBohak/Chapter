import { ChangeEvent, RefObject, useEffect, useState } from "react";

import { useAppDispatch } from "@/src/redux";
import { ProfileUpdateApi } from "../utils/ProfileUpdateApi";

const useEditField = (
  textValue: string | null,
  nodeRef: RefObject<HTMLTextAreaElement | HTMLInputElement>,
  userStatus: boolean
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string | null>(textValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEditing && value) {
      nodeRef.current?.focus();
      nodeRef.current?.setSelectionRange(value.length, value.length);
    }
  }, [isEditing, nodeRef, value]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    setIsEditing(false);
    const profile = new ProfileUpdateApi(dispatch);
    if (value !== textValue) {
      userStatus &&
        profile.userSave({
          userStatus: value,
        });
      if (!userStatus && value) {
        const [firstName, lastName] = value.split(" ");
        if (firstName && lastName) profile.userSave({ firstName, lastName });
      }
    }
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setValue(e.currentTarget.value);

  return {
    isEditing,
    value,
    nodeRef,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
  };
};

export default useEditField;
