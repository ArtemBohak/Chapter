import { FC } from "react";
import cn from "classnames";
import { Formik, Form } from "formik";

import { TextField } from "../TextField";

import { SearchFieldProps } from "./SearchField.type";

import "./SearchField.scss";

const SearchField: FC<SearchFieldProps> = ({ className, ...props }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <TextField className={cn("search-field", className)} {...props} />
        </Form>
      )}
    </Formik>
  );
};

export default SearchField;
