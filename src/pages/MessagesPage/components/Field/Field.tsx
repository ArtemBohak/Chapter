import { ChangeEvent, FC, useState } from "react";

import styles from "./Field.module.scss";
import { FieldType } from "./Field.type";

const Field: FC<FieldType> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };
  return (
    <label className={styles["field"]}>
      <input
        type="text"
        name="chat"
        value={value}
        onChange={onHandleChange}
        placeholder="Write a message"
        className={styles["field__input"]}
      />
    </label>
  );
};

export default Field;
