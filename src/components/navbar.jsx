import React from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar(props) {
  const products = useSelector((state) => state.cartReducer.cartList)
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.list}>
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart" className={styles.cartLink}>Cart 
          <p className={styles.cart}>{products.length}</p>
          </Link>
          <Link to="/wishlist">Wishlist</Link>
          
          <Link to="/">
            Deal<span>new</span>
          </Link>
          <Link to="/addProduct">Add Products</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
