import { FC } from "react";

import { ListProps } from "./List.type";
import styles from "./List.module.scss";

import { Icon, IconEnum } from "@/src/components";
import Likes from "./Likes/Likes";

const List: FC<ListProps> = ({ title, data, setIsOpen }) => {
  return (
    <>
      <div className={styles["title"]}>
        <h5>{title}</h5>
        <button data-automation="clickButton" onClick={() => setIsOpen(false)}>
          <Icon icon={IconEnum.Cross} size={24} />
        </button>
      </div>
      <ul className={styles["list"]}>
        {data.map((i) => (
          <li key={i.id} className={styles["item"]}>
            {title.toLowerCase() === "likes" && (
              <Likes
                avatar={i.avatar}
                name={i.name}
                id={i.id}
                followList={i.followList}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
