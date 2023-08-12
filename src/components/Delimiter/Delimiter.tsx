import styles from "./Delimiter.module.scss";

const Delimiter = () => {
  return (
    <div className={styles["authPage_delimiter"]}>
      <div className={styles["delimiter-line"]}></div>
      <p className="text-[20px]">or</p>
      <div className={styles["delimiter-line"]}></div>
    </div>
  );
};

export default Delimiter;
