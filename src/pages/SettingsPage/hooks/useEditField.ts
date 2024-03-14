import { ChangeEvent, RefObject, useEffect, useState } from "react";

import { ProfileUpdateApi } from "../utils/ProfileUpdateApi";
import { simpleStringRegex } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";

const useEditField = (
  fieldType: "fullName" | "status",
  textValue?: string | null,
  nodeRef?: RefObject<HTMLTextAreaElement | HTMLInputElement>
) => {
  const setError = useErrorBoundary();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string | null>(textValue || null);

  useEffect(() => {
    if (nodeRef && isEditing) {
      nodeRef.current?.focus();
    }
  }, [isEditing, nodeRef]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    if (value) {
      const profile = new ProfileUpdateApi(undefined, setError);
      if (value !== textValue) {
        if (fieldType === "status" && value)
          profile.userSave({
            userStatus: value?.trim(),
          });

        if (fieldType === "fullName" && value) {
          if (!simpleStringRegex.test(value)) return;
          const [firstName, lastName] = value
            .trim()
            .split(" ")
            .filter((el) => el);

          if (firstName && lastName) profile.userSave({ firstName, lastName });
        }
      }
    }
    setIsEditing(false);
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
    setIsEditing,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  };
};

export default useEditField;
