import React from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.list}>
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/">
            Deal<span>new</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
