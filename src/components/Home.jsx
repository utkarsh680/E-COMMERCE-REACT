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
            <div className={styles.logo}>
             <span><h3>electro</h3></span>
          
            </div>
            <div className={styles.itemsPos}>
            <div className={styles.items}>
              <div className={styles.zoom}>
              <div className={styles.img1}></div>
              </div>
              <div className={styles.zoom}>
              <div className={styles.img2}></div>
              </div>
              <div className={styles.zoom}>
              <div className={styles.img3}></div>
              </div> 
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
