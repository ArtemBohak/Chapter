import { FC } from "react";
import { Formik, Form } from "formik";

import { TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components";

const CommentsForm: FC = () => {
  const onHandleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={{ comments: "" }} onSubmit={onHandleSubmit}>
      {(props) => (
        <Form>
          <TextField
            id="comments"
            placeholder="Add a comment"
            name="comments"
            component="textarea"
            dataAutomation="commentsInput"
            value={props.values.comments}
          />
          <UIbutton dataAutomation="submitButton" />
        </Form>
      )}
    </Formik>
  );
};

export default CommentsForm;
