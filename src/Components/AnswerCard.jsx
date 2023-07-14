import React from "react";
import styles from "../styles.module.css";

export default function AnswerCard({ children }) {
  return <div className={styles.answerCard}>{children}</div>;
}
