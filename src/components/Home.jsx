import React from "react";
import styles from "../styles/home.module.css";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}>electro</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar/>
            <div className={styles.heading1}>
              Welcome to the electro
              <div>
                <h2>
                  Let's Bring the  <br />Gadget to <br />
                  Your Home
                </h2>
              </div>
            </div>
            <div className={styles.logo}>
              <div>
                <h3>electro</h3>
              </div>
              <div className={styles.point}></div>
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
