import React from "react";
import { $answers, fetchAnswers } from "../store";
import { useStore } from "effector-react";
import AnswerCard from "../Components/AnswerCard";
import { Spinner } from "../Components/Spinner";
import styles from "../styles.module.css";

export default function Question() {
  const answersData = useStore($answers);
  const isLoading = useStore(fetchAnswers.pending);

  function parseText(text) {
    const decodedText = document.createElement("textarea");
    decodedText.innerHTML = text;
    const formattedText = decodedText.value.replace(/(\$|&\#\d+|')/g, "");
    return formattedText;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.answersWrapper}>
      <h2>{answersData && parseText(answersData[0]?.title)}</h2>
      {answersData?.map((answer) => (
        <AnswerCard
          key={answer.answer_id}
          children={parseText(answer.body_markdown)}
        />
      ))}
    </div>
  );
}
