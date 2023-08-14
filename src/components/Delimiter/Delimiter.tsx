import styles from "./Delimiter.module.scss";

const Delimiter = ({ text = "or" }) => {
  return (
    <div className={`${styles["delimiter"]}`}>
      <p className={`${styles["delimiter__line"]}`}>{text}</p>
    </div>
  );
};

export default Delimiter;
