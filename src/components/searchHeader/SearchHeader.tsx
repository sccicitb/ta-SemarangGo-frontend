import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecoilBridge, useRecoilState, useSetRecoilState } from "recoil";

import SearchBar from "../searchBar/SearchBar";
import styles from "./SearchHeader.module.css";
import logoImg from "@/assets/images/sego-logo.png"


const SearchHeader = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <Link to="/">
        <img src={logoImg} alt="Sego-Logo" className={styles.logo} />
      </Link>
      <SearchBar 
        placeHolder="Cari layanan dan informasi..." 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchHeader;