import React, { useState } from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";

const columns = [
  {
    label: "Автор вопроса",
    dataField: "owner",
    isSortable: false,
  },
  {
    label: "Тема",
    dataField: "title",
    isSortable: true,
  },
  {
    label: "Кол-во ответов",
    dataField: "answer_count",
    isSortable: true,
  },
  {
    label: "Теги",
    dataField: "tags",
    isSortable: false,
  },
];

export default function Table({
  data,
  handleOpenModalAuthor,
  handleFetchAnswers,
  handleOpenModalTag,
}) {
  const [tableData, setTableData] = useState(data);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody
          columns={columns}
          tableData={tableData}
          handleOpenModalAuthor={handleOpenModalAuthor}
          handleFetchAnswers={handleFetchAnswers}
          handleOpenModalTag={handleOpenModalTag}
        />
      </table>
    </>
  );
}
