import styles from "../styles.module.css";

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
