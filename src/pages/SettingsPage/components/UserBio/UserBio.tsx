import { FC } from "react";

import styles from "./UserBio.module.scss";

const text =
  "Embracing life's journey with open arms and a heart full of gratitude. Chasing dreams, one step at a time, with unwavering determination. Spreading positivity and kindness wherever I go, making the world a better place.";

const UserBio: FC = () => {
  return <p className={styles["text"]}>{text}</p>;
};

export default UserBio;
