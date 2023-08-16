import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/wishlist.module.css";
import { useSelector} from "react-redux";
import { WishlistCard } from "../components";

function Wishlist() {
  const myData = useSelector((state) => state.wishlistReducer.wishList); //Data from state

  const [wishlistItems, setWishlistItems] = useState(myData); //set data as wishlistItems

  // Add item from localStorage
  useEffect(() => {
    // Get items from localstorage
    if (localStorage.getItem("wishlist")) {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      setWishlistItems([...items]);
    }
  }, [localStorage.getItem("wishlist")]);

  useEffect(() => {
    if (!localStorage.getItem("wishlist")) setWishlistItems(myData);
  }, [myData]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            <div className={styles.cardBox}>
              {wishlistItems.map((product) => {
                
                return (
                  <WishlistCard product = {product} key = {product.id} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;