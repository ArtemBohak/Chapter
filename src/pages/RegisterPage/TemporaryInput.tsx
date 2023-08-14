import { Field } from "formik";
import { ChangeEvent } from "react";
import cn from "classnames";

const TextInput = ({
  id,
  labelText,
  labelClassName,
  name,
  setFieldValue,
  dataAutomation,
  fieldClassName,
  ...otherProps
}: {
  id: string;
  labelText: string;
  labelClassName?: string;
  name: string;
  setFieldValue: (arg1: string, arg2: string) => string;
  dataAutomation: string;
  fieldClassName?: string;
}) => (
  <>
    <label htmlFor={id} className={cn("text-gray-400 text-xs", labelClassName)}>
      {labelText}
    </label>
    <Field
      id={id}
      name={name}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, event.target.value)
      }
      data-automation={dataAutomation}
      className={cn(
        "w-[327px] h-[35px] mb-[15px] px-2 py-1 rounded-[5px] border border-gray-1030",
        fieldClassName
      )}
      {...otherProps}
    />
  </>
);

export default TextInput;
// ("w-[327px] h-[35px] mb-[15px] px-2 py-1 rounded-[5px] border border-gray-1030");
