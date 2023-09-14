import { FC, useEffect, useState } from "react";

import { Icon } from "@/src/components";

type ActionButtonProps = {
  iconType: string;
  value: number;
  id: string;
  clickedList: string[];
  size?: number | undefined;
};

const ActionButton: FC<ActionButtonProps> = ({
  id,
  iconType,
  value,
  clickedList,
  size = 28,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(clickedList.some((item) => item === id));
  }, [clickedList, id]);

  const onHandleClick = () => {
    setIsClicked(!isClicked);
    isClicked && clickedList.filter((item) => item !== id);
    !isClicked && clickedList.push(id);
  };
  return (
    <button onClick={onHandleClick}>
      <Icon icon={iconType} size={size} /> {value}
    </button>
  );
};

export default ActionButton;
