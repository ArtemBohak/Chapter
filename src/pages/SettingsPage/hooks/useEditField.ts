import { ChangeEvent, RefObject, useEffect, useState } from "react";

import { ProfileUpdateApi } from "../utils/ProfileUpdateApi";
import { simpleStringRegex } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";

const useEditField = (
  fieldType: "fullName" | "status",
  textValue?: string | null,
  nodeRef?: RefObject<HTMLTextAreaElement | HTMLInputElement>,
  stringLength = 500
) => {
  const setErrorBoundary = useErrorBoundary();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(textValue || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nodeRef && isEditing) {
      nodeRef.current?.focus();
    }
  }, [isEditing, nodeRef]);

  useEffect(() => {
    if (value && value.length > stringLength) {
      return setError("Too long");
    }
    setError(null);
  }, [stringLength, value]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    if (textValue && value !== textValue) {
      const profile = new ProfileUpdateApi(undefined, setErrorBoundary);
      if (fieldType === "status") {
        if (value.length > stringLength) return setError("Too long");

        profile.userSave({
          userStatus: value || null,
        });
      }

      if (fieldType === "fullName" && value) {
        if (!simpleStringRegex.test(value)) return;
        const [firstName, lastName] = value
          .trim()
          .split(" ")
          .filter((el) => el);

        if (firstName && lastName) profile.userSave({ firstName, lastName });
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
    error,
    setIsEditing,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  };
};

export default useEditField;
