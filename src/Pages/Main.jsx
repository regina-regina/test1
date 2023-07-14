import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEvent } from "effector-react";
import { fetchSearch } from "../store";
import styles from "../styles.module.css";

export default function Main() {
  const fetchSearchEvent = useEvent(fetchSearch);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    fetchSearchEvent(
      `https://api.stackexchange.com/2.3/search/advanced?q=${searchInput}&site=stackoverflow`
    );
    setSearchInput("");
    navigate("/result");
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearchClick}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Напишите текст запроса"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button
          className={styles.searchButton}
          type="submit"
          onClick={handleSearchClick}
        >
          Искать
        </button>
      </form>
    </div>
  );
}
