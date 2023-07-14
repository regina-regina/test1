import react, { useState } from "react";
import styles from "../styles.module.css";

export const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (dataField) => {
    const sortOrder =
      dataField === sortField && order === "asc" ? "desc" : "asc";
    setSortField(dataField);
    setOrder(sortOrder);
    handleSorting(dataField, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, dataField, isSortable }) => {
          const sortClass = isSortable
            ? sortField === dataField && order === "asc"
              ? "upSort"
              : sortField === dataField && order === "desc"
              ? "downSort"
              : "defaultSort"
            : "";
          return (
            <th
              className={styles[sortClass]}
              key={dataField}
              onClick={isSortable ? () => handleSortingChange(dataField) : null}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
