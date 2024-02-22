import { FC, useState } from "react";
import { AxiosError } from "axios";

import { ISwitch } from "./Switch.type";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./Switch.module.scss";
import { EndpointsEnum, api } from "@/src/axios";
import { updateUser, useAppDispatch } from "@/src/redux";

const Switch: FC<ISwitch> = ({ label, isChecked = true, name, classNames }) => {
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

export default Switch;
