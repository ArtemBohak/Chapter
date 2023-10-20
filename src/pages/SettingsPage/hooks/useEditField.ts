import { ChangeEvent, RefObject, useEffect, useState } from "react";

const useEditField = (
  textValue: string,
  nodeRef: RefObject<HTMLTextAreaElement | HTMLInputElement>
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(textValue);

  useEffect(() => {
    if (isEditing) {
      nodeRef.current?.focus();
      nodeRef.current?.setSelectionRange(value.length, value.length);
    }
  }, [isEditing, nodeRef, value.length]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    setIsEditing(false);
    if (value !== textValue) console.log(value);
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
