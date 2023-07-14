import { useStore } from "effector-react";
import React from "react";
import { $storeModal } from "../store";
import styles from "../styles.module.css";

export const TableBody = (props) => {
  const {
    tableData,
    columns,
    handleOpenModalAuthor,
    handleFetchAnswers,
    handleOpenModalTag,
  } = props;
  const modalStatus = useStore($storeModal);

  return (
    <tbody>
      {tableData?.map((data) => {
        return (
          <tr key={data.question_id}>
            {columns.map(({ dataField }, index) => {
              if (dataField === "owner") {
                return (
                  <td key={`${data.owner.display_name}_${index}`}>
                    {modalStatus ? (
                      data.owner.display_name
                    ) : (
                      <button
                        className={styles.linkButton}
                        onClick={() =>
                          handleOpenModalAuthor(data.owner.user_id)
                        }
                      >
                        {data.owner.display_name}
                      </button>
                    )}
                  </td>
                );
              }
              if (dataField === "title") {
                return (
                  <td className={styles.tdLeft} key={`${data.title}_${index}`}>
                    {data.answer_count ? (
                      <button
                        className={styles.linkButton}
                        onClick={() => handleFetchAnswers(data.question_id)}
                      >
                        <a>{data[dataField]}</a>
                      </button>
                    ) : (
                      data[dataField]
                    )}
                  </td>
                );
              }
              if (dataField === "answer_count") {
                return (
                  <td key={`${data.question_id}_${index}`}>
                    {data[dataField] ? (
                      <button
                        className={styles.linkButton}
                        onClick={() => handleFetchAnswers(data.question_id)}
                      >
                        <a>{data[dataField]}</a>
                      </button>
                    ) : (
                      data[dataField]
                    )}
                  </td>
                );
              } else if (dataField === "tags") {
                return (
                  <td
                    className={styles.tdLeft}
                    key={`${data.question_id}_${index}`}
                  >
                    {modalStatus
                      ? data[dataField].join(", ")
                      : data[dataField].map((tag) => (
                          <button
                            key={tag}
                            className={styles.tagButton}
                            onClick={() => handleOpenModalTag(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                  </td>
                );
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
