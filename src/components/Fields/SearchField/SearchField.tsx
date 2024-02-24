import { FC } from "react";
import cn from "classnames";
import { Formik, Form } from "formik";

import { SearchFieldProps } from "./SearchField.type";
import "./SearchField.scss";

import { TextField } from "../TextField";

const SearchField: FC<SearchFieldProps> = ({ className, ...props }) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <TextField className={cn("search-field", className)} {...props} />
        </Form>
      )}
    </Formik>
  );
};

export default SearchField;
