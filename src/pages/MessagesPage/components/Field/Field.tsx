import { ChangeEvent, FC, useState } from "react";

import styles from "./Field.module.scss";
import { FieldType } from "./Field.type";
import { Icon, IconEnum } from "@/src/components";

const Field: FC<FieldType> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };
  return (
    <div className={styles["field"]}>
      <input
        type="text"
        name="chat"
        value={value}
        onChange={onHandleChange}
        placeholder="Write a message"
        className={styles["field__input"]}
      />
      {value.length ? (
        <button className={styles["submit-btn"]}>
          <Icon icon={IconEnum.NextSlide} size={20} />
        </button>
      ) : null}
    </div>
  );
};

export default Field;
