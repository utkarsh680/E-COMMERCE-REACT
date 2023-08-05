import React from "react";
import styles from "../styles/home.module.css";
import Navbar from "./navbar";


function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;