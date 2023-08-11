import styles from "./Delimiter.module.scss";

const Delimiter = () => {
  return (
    <div className={styles["loginPage_delimiter"]}>
      <div className={styles["delimiter-line"]}></div>
      <div className="text-[20px]">or</div>
      <div className={styles["delimiter-line"]}></div>
    </div>
  );
};

export default Delimiter;
