import { FC } from "react";
import cn from "classnames";
import { Formik, Form } from "formik";

import { TextField } from "../TextField";

import { SearchFieldProps } from "./SearchField.type";

import styles from "./SearchField.module.scss";

const SearchField: FC<SearchFieldProps> = ({ ...props }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <TextField
            className={cn(styles["search-field"], props.className)}
            {...props}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchField;
