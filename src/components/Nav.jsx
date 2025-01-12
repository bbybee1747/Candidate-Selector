// components/Nav.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
const Nav = ({ brandName, imageSrcPath }) => {
    return (<nav className={styles["nav-bar"]}>
      <div className={styles["brand"]}>
        <img src={imageSrcPath} alt="GitHub Logo" className={styles["logo"]}/>
        <h1 className={styles["brand-name"]}>{brandName}</h1>
      </div>
      <ul className={styles["nav-links"]}>
        <li>
          <Link to="/" className={styles["nav-link"]}>
            Search
          </Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className={styles["nav-link"]}>
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>);
};
export default Nav;
