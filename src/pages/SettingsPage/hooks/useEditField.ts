import { ChangeEvent, RefObject, useEffect, useState } from "react";

import { ProfileUpdateApi } from "../utils/ProfileUpdateApi";

const useEditField = (
  textValue: string | null,
  nodeRef: RefObject<HTMLTextAreaElement | HTMLInputElement>,
  userStatus: boolean
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string | null>(textValue);

  useEffect(() => {
    if (isEditing) {
      nodeRef.current?.focus();
    }
  }, [isEditing, nodeRef]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    setIsEditing(false);
    const profile = new ProfileUpdateApi();
    if (value !== textValue) {
      if (userStatus && value)
        profile.userSave({
          userStatus: value?.trim(),
        });
      if (!userStatus && value) {
        const [firstName, lastName] = value.trim().split(" ");
        if (firstName && lastName) profile.userSave({ firstName, lastName });
      }
    }
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setValue(e.currentTarget.value);

  const onHandleFocus = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    if (value) e.currentTarget.setSelectionRange(value.length, value.length);
  };

  return {
    isEditing,
    value,
    nodeRef,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  };
};

export default useEditField;
