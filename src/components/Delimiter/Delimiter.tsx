import styles from "./Delimiter.module.scss";

const Delimiter = ({ text = "or" }) => {
  return (
    <div className={`${styles["delimiter"]} w-full max-w-[327px]`}>
      <p className={`${styles["delimiter__line"]} text-[20px]`}>{text}</p>
    </div>
  );
};

export default Delimiter;
