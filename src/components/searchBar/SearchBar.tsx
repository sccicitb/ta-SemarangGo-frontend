import React, { useState, useRef } from "react";

import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { GrFormClose as CloseIcon } from "react-icons/gr";

import styles from "./SearchBar.module.css";

const SearchBar = ({
  placeHolder,
  onChange,

}: {
  placeHolder: string;
  onChange: React.ChangeEventHandler;
}) => {
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setInputValue("");
  };

  const handleClick = () => {
    ref.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setInputValue(e.target.value);
  }

  return (
    <div className={styles.search} onClick={handleClick}>
      <div className={styles.searchIcon}>
          <SearchIcon />
      </div>
      <div className={styles.searchInputs}>
        <input
          type="text"
          ref={ref}
          placeholder={placeHolder}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <div className={styles.searchIcon}>
      { //Check if input exist
        inputValue.length === 0 
          ? <div/>
          : <CloseIcon id={styles.clearBtn} onClick={clearInput} />
      }
      </div>
    </div>
  );
};

export default SearchBar;