import { FC, useState } from "react";
import { AxiosError } from "axios";

import { ISwitchButton } from "./SwitchButton.type";
import { updateUser, useAppDispatch } from "@/src/redux";
import { useErrorBoundary } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";
import styles from "./SwitchButton.module.scss";

const SwitchButton: FC<ISwitchButton> = ({
  label,
  isChecked = true,
  name,
  classNames,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const dispatch = useAppDispatch();
  const setErrorBoundary = useErrorBoundary();

  const onHandleInputChange = async () => {
    try {
      setChecked(!checked);

      const { data } = await api.patch(EndpointsEnum.PROFILE, {
        [name]: !checked,
      });

      dispatch(updateUser(data));
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };

  return (
    <label className={`${styles["switch"]} ${classNames}`}>
      <input
        onChange={onHandleInputChange}
        type="checkbox"
        checked={checked}
        name={name}
      />
      <i></i>
      <span>{label}</span>
    </label>
  );
};

export default SwitchButton;
