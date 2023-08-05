import React from 'react'
import Navbar from './navbar'
import styles from '../styles/cart.module.css'

function Cart() {
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
  )
}

export default Cart