import styles from "./TestPage.module.scss";

const TestPage = () => {
  return (
    <div className="p-4-xs">
      <div className="mx-auto flex justify-center">
        <button
          className={styles.button}
          onClick={() => {
            console.log(1);
          }}
        >
          <span className={styles.content}>Безкоштовні уроки</span>
          <span className={styles.icon}>SVG</span>
        </button>
      </div>
    </div>
  );
};

export default TestPage;
