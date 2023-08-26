import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar(props) {
  const products = useSelector((state) => state.cartReducer.cartList);
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    if (showMenu) {
      setShowMenu(!showMenu);
    } else {
      setShowMenu(!showMenu);
    }
  };
  return (
    <div className={styles.navbar}>
     
      <ul>
        <li className={styles.list}>
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart" className={styles.cartLink}>
            Cart
            <p className={styles.cart}>{products.length}</p>
          </Link>
          <Link to="/wishlist">Wishlist</Link>

          <Link to="/" className={styles.dealLink}>
            deal
            <p className={styles.deal}>new</p>
          </Link>
          <Link to="/addProduct">Add Products</Link>
        </li>
      </ul>
      <div className={styles.navbarIcon}> 
      <FontAwesomeIcon
        icon={faBars}
        className={styles.barIcon}
        onClick={() => handleClick()}
      />
      {showMenu && <ul>
        <li className={styles.list1}>
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart" className={styles.cartLink}>
            Cart
            <p className={styles.cart}>{products.length}</p>
          </Link>
          <Link to="/wishlist">Wishlist</Link>

          <Link to="/" className={styles.dealLink}>
            deal
            <p className={styles.deal}>new</p>
          </Link>
          <Link to="/addProduct">Add Products</Link>
        </li>
      </ul>}
      </div>
    </div>
  );
}

export default Navbar;
