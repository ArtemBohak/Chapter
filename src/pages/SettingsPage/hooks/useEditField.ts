import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ProfileUpdateApi } from "../utils/ProfileUpdateApi";
import { simpleStringRegex } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";
import { AxiosError } from "axios";

const useEditField = (
  fieldType: "fullName" | "status",
  textValue?: string | null,
  setIsLoading?: Dispatch<SetStateAction<boolean>>,
  nodeRef?: RefObject<HTMLTextAreaElement | HTMLInputElement>,
  stringLength = 500
) => {
  const setErrorBoundary = useErrorBoundary();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(textValue?.trim() || "");
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
      const profile = new ProfileUpdateApi(setIsLoading, setErrorBoundary);
      if (fieldType === "status") {
        if (value.length > stringLength) return setError("Too long");

        const res = await profile.userSave({
          userStatus: value || " ",
        });
        if (res instanceof AxiosError) {
          if (res.response && res.response.status > 400)
            return setError("Incorrect text");
        }
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
