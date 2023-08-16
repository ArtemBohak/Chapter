import { ElementType, FC } from "react";
import { Formik, Form, FieldArray } from "formik";
import cn from "classnames";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";

import { createObject, findKeys } from "@/src/pages/RegisterPage/helpers";
import { type FieldTypes } from "../../types";
import { FieldsName } from "../../enums";

type Props = {
  formName: string;
  className?: string;
  fieldsValues: FieldTypes[];
  reinitialize?: boolean;
  textFieldComponent?: ElementType;
  passwordFieldComponent?: ElementType;
  buttonTitle: string;
  strength?: boolean;
};

const CustomForm: FC<Props> = ({
  fieldsValues = [],
  formName,
  reinitialize = true,
  className,
  buttonTitle,
  strength = true,
  textFieldComponent: TextFieldComponent,
  passwordFieldComponent: PasswordFieldComponent,
  ...props
}) => {
  return (
    <Formik
      enableReinitialize={reinitialize}
      initialValues={{ [formName]: [...fieldsValues] }}
      {...props}
      onSubmit={(values): void => {
        const value = createObject(values[formName]);
        console.log(value);
      }}
    >
      {(props) => (
        <FieldArray name={formName}>
          {() => (
            <Form className={cn("max-w-[327px]", className)}>
              {props.values[formName].map((item, index) => {
                const fieldName = findKeys(item);
                if (PasswordFieldComponent && fieldName === FieldsName.password)
                  return (
                    <div key={index}>
                      <PasswordFieldComponent
                        id={fieldName}
                        name={`${formName}[${index}].${fieldName}`}
                        dataAutomation={`${fieldName}Input`}
                        value={item[fieldName as keyof typeof item]}
                        label={item.label}
                        className={item.className}
                        strength={strength}
                      />
                    </div>
                  );
                if (TextFieldComponent && fieldName !== FieldsName.password)
                  return (
                    <div key={index}>
                      <TextFieldComponent
                        id={fieldName}
                        type={item.type}
                        name={`${formName}[${index}].${fieldName}`}
                        value={item[fieldName as keyof typeof item]}
                        dataAutomation={`${fieldName}Input`}
                        label={item.label}
                        className={item.className}
                      />
                    </div>
                  );
              })}
              <UIbutton
                dataAutomation="submitButton"
                type="submit"
                className="bg-orange-1200 text-white w-[327px] h-11 rounded-[5px] mb-[10px]"
              >
                {buttonTitle}
              </UIbutton>
            </Form>
          )}
        </FieldArray>
      )}
    </Formik>
  );
};

export default CustomForm;
